import FuelType from './model.js';
import response from '../Utils/response.js';
import asyncHandler from 'express-async-handler';
import slugify from 'slugify';

// Get next order number helper
const getNextOrder = async () => {
  const lastFuelType = await FuelType.findOne().sort({ order: -1 });
  return lastFuelType ? lastFuelType.order + 1 : 1;
};

// Create a new fuel type
export const createFuelType = asyncHandler(async (req, res) => {
  try {
    const { title, type } = req.body;
    
    // Generate slug from title
    const slug = slugify(title, { lower: true });

    // Check if slug already exists
    const existingFuelType = await FuelType.findOne({ slug });
    if (existingFuelType) {
      return response.badRequest(res, 'A fuel type with this title already exists');
    }

    const fuelType = await FuelType.create({
      ...req.body,
      slug,
      order: req.body.order || await getNextOrder()
    });
    
    response.created(res, 'Fuel type created successfully', fuelType);
  } catch (error) {
    console.error('Error creating fuel type:', error);
    response.serverError(res, 'Error creating fuel type');
  }
});

// Get all fuel types
export const getAllFuelTypes = asyncHandler(async (req, res) => {
  try {
    const fuelTypes = await FuelType.find().sort({ order: 1, createdAt: -1 });
    response.ok(res, 'Fuel types retrieved successfully', fuelTypes);
  } catch (error) {
    console.error('Error retrieving fuel types:', error);
    response.serverError(res, 'Error retrieving fuel types');
  }
});

// Get fuel type by ID
export const getFuelTypeById = asyncHandler(async (req, res) => {
  try {
    const fuelType = await FuelType.findById(req.params.id);
    if (!fuelType) {
      return response.notFound(res, 'Fuel type not found');
    }
    response.ok(res, 'Fuel type retrieved successfully', fuelType);
  } catch (error) {
    console.error('Error retrieving fuel type:', error);
    response.serverError(res, 'Error retrieving fuel type');
  }
});

// Update fuel type
export const updateFuelType = asyncHandler(async (req, res) => {
  try {
    const fuelType = await FuelType.findById(req.params.id);
    if (!fuelType) {
      return response.notFound(res, 'Fuel type not found');
    }

    // If title is being updated, update slug as well
    if (req.body.title) {
      req.body.slug = slugify(req.body.title, { lower: true });
      
      // Check if new slug already exists (excluding current fuel type)
      const existingFuelType = await FuelType.findOne({
        slug: req.body.slug,
        _id: { $ne: req.params.id }
      });
      
      if (existingFuelType) {
        return response.badRequest(res, 'A fuel type with this title already exists');
      }
    }

    // Check for duplicate order
    if (req.body.order && req.body.order !== fuelType.order) {
      const existingFuelType = await FuelType.findOne({ 
        order: req.body.order,
        _id: { $ne: fuelType._id }
      });
      if (existingFuelType) {
        return response.badRequest(res, 'A fuel type with this order number already exists');
      }
    }

    const updatedFuelType = await FuelType.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );

    response.ok(res, 'Fuel type updated successfully', updatedFuelType);
  } catch (error) {
    console.error('Error updating fuel type:', error);
    response.serverError(res, 'Error updating fuel type');
  }
});

// Delete fuel type
export const deleteFuelType = asyncHandler(async (req, res) => {
  try {
    const fuelType = await FuelType.findById(req.params.id);
    if (!fuelType) {
      return response.notFound(res, 'Fuel type not found');
    }

    await FuelType.findByIdAndDelete(req.params.id);
    response.ok(res, 'Fuel type deleted successfully');
  } catch (error) {
    console.error('Error deleting fuel type:', error);
    response.serverError(res, 'Error deleting fuel type');
  }
});

// Update fuel type order
export const updateFuelTypeOrder = asyncHandler(async (req, res) => {
  try {
    const { newOrder } = req.body;
    const fuelType = await FuelType.findById(req.params.id);

    if (!fuelType) {
      return response.notFound(res, 'Fuel type not found');
    }

    const existingFuelType = await FuelType.findOne({ 
      order: newOrder,
      _id: { $ne: fuelType._id }
    });

    if (existingFuelType) {
      return response.badRequest(res, 'A fuel type with this order number already exists');
    }

    fuelType.order = newOrder;
    await fuelType.save();

    response.ok(res, 'Fuel type order updated successfully', fuelType);
  } catch (error) {
    console.error('Error updating fuel type order:', error);
    response.serverError(res, 'Error updating fuel type order');
  }
});