import response from '../Utils/response.js';
import Transmission from './model.js';
import asyncHandler from 'express-async-handler';
import slugify from 'slugify';

// Get next order number helper
const getNextOrder = async () => {
  const lastTransmission = await Transmission.findOne().sort({ order: -1 });
  return lastTransmission ? lastTransmission.order + 1 : 1;
};

// Create a new transmission
export const createTransmission = asyncHandler(async (req, res) => {
  try {
    const { title, type } = req.body;
    
    // Generate slug from title
    const slug = slugify(title, { lower: true });

    // Check if slug already exists
    const existingTransmission = await Transmission.findOne({ slug });
    if (existingTransmission) {
      return response.badRequest(res, 'A transmission with this title already exists');
    }

    const transmission = await Transmission.create({
      ...req.body,
      slug,
      order: req.body.order || await getNextOrder()
    });
    
    response.created(res, 'Transmission created successfully', transmission);
  } catch (error) {
    console.error('Error creating transmission:', error);
    response.serverError(res, 'Error creating transmission');
  }
});

// Get all transmissions
export const getAllTransmissions = asyncHandler(async (req, res) => {
  try {
    const transmissions = await Transmission.find().sort({ order: 1, createdAt: -1 });
    response.ok(res, 'Transmissions retrieved successfully', transmissions);
  } catch (error) {
    console.error('Error retrieving transmissions:', error);
    response.serverError(res, 'Error retrieving transmissions');
  }
});

// Get transmission by ID
export const getTransmissionById = asyncHandler(async (req, res) => {
  try {
    const transmission = await Transmission.findById(req.params.id);
    if (!transmission) {
      return response.notFound(res, 'Transmission not found');
    }
    response.ok(res, 'Transmission retrieved successfully', transmission);
  } catch (error) {
    console.error('Error retrieving transmission:', error);
    response.serverError(res, 'Error retrieving transmission');
  }
});

// Update transmission
export const updateTransmission = asyncHandler(async (req, res) => {
  try {
    const transmission = await Transmission.findById(req.params.id);
    if (!transmission) {
      return response.notFound(res, 'Transmission not found');
    }

    // If title is being updated, update slug as well
    if (req.body.title) {
      req.body.slug = slugify(req.body.title, { lower: true });
      
      // Check if new slug already exists (excluding current transmission)
      const existingTransmission = await Transmission.findOne({
        slug: req.body.slug,
        _id: { $ne: req.params.id }
      });
      
      if (existingTransmission) {
        return response.badRequest(res, 'A transmission with this title already exists');
      }
    }

    // Check for duplicate order
    if (req.body.order && req.body.order !== transmission.order) {
      const existingTransmission = await Transmission.findOne({ 
        order: req.body.order,
        _id: { $ne: transmission._id }
      });
      if (existingTransmission) {
        return response.badRequest(res, 'A transmission with this order number already exists');
      }
    }

    const updatedTransmission = await Transmission.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );

    response.ok(res, 'Transmission updated successfully', updatedTransmission);
  } catch (error) {
    console.error('Error updating transmission:', error);
    response.serverError(res, 'Error updating transmission');
  }
});

// Delete transmission
export const deleteTransmission = asyncHandler(async (req, res) => {
  try {
    const transmission = await Transmission.findById(req.params.id);
    if (!transmission) {
      return response.notFound(res, 'Transmission not found');
    }

    await Transmission.findByIdAndDelete(req.params.id);
    response.ok(res, 'Transmission deleted successfully');
  } catch (error) {
    console.error('Error deleting transmission:', error);
    response.serverError(res, 'Error deleting transmission');
  }
});

// Update transmission order
export const updateTransmissionOrder = asyncHandler(async (req, res) => {
  try {
    const { newOrder } = req.body;
    const transmission = await Transmission.findById(req.params.id);

    if (!transmission) {
      return response.notFound(res, 'Transmission not found');
    }

    const existingTransmission = await Transmission.findOne({ 
      order: newOrder,
      _id: { $ne: transmission._id }
    });

    if (existingTransmission) {
      return response.badRequest(res, 'A transmission with this order number already exists');
    }

    transmission.order = newOrder;
    await transmission.save();

    response.ok(res, 'Transmission order updated successfully', transmission);
  } catch (error) {
    console.error('Error updating transmission order:', error);
    response.serverError(res, 'Error updating transmission order');
  }
});
