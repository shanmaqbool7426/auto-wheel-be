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
    
    // Generate slug from title and type
    const slug = slugify(`${title}-${type}`, { lower: true });

    // Check if fuel type already exists for the same type
    const existingFuelType = await FuelType.findOne({ 
      title: { $regex: new RegExp(`^${title}$`, 'i') },
      type 
    });
    
    if (existingFuelType) {
      return response.badRequest(res, `This fuel type already exists for ${type}`);
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

// Get all fuel types with pagination and search
export const getAllFuelTypes = asyncHandler(async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = ''
    } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    // Build search query
    const searchQuery = search
      ? { title: { $regex: search, $options: 'i' } }
      : {};

    const totalItems = await FuelType.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalItems / limitNumber);

    const fuelTypes = await FuelType.find(searchQuery)
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);

    response.ok(res, 'Fuel types retrieved successfully', {
      fuelTypes,
      pagination: {
        totalItems,
        totalPages,
        currentPage: pageNumber,
        itemsPerPage: limitNumber,
        hasNextPage: pageNumber < totalPages,
        hasPrevPage: pageNumber > 1
      }
    });
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

    const { title, type } = req.body;

    // If title or type is being updated, check for duplicates
    if (title || type) {
      const searchType = type || fuelType.type;
      const searchTitle = title || fuelType.title;

      const existingFuelType = await FuelType.findOne({
        title: { $regex: new RegExp(`^${searchTitle}$`, 'i') },
        type: searchType,
        _id: { $ne: req.params.id }
      });
      
      if (existingFuelType) {
        return response.badRequest(res, `This fuel type already exists for ${searchType}`);
      }

      // Update slug if title or type changes
      req.body.slug = slugify(`${searchTitle}-${searchType}`, { lower: true });
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

// Get fuel types by type
export const getFuelTypesByType = asyncHandler(async (req, res) => {
  try {
    const { type } = req.params;
    
    const fuelTypes = await FuelType.find({ type })
      .sort({ order: 1, createdAt: -1 });
    
    if (!fuelTypes.length) {
      return response.success(res, `No fuel types found for type: ${type}`, []);
    }
    
    response.success(res, 'Fuel types retrieved successfully', fuelTypes);
  } catch (error) {
    console.error('Error fetching fuel types by type:', error);
    response.serverError(res, 'Error fetching fuel types');
  }
});