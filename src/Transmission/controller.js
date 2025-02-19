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
    
    // Generate slug from title and type
    const slug = slugify(`${title}-${type}`, { lower: true });

    // Check if transmission already exists for the same type
    const existingTransmission = await Transmission.findOne({ 
      title: { $regex: new RegExp(`^${title}$`, 'i') },
      type 
    });
    
    if (existingTransmission) {
      return response.badRequest(res, `This transmission already exists for ${type}`);
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

// Get all transmissions with pagination and search
export const getAllTransmissions = asyncHandler(async (req, res) => {
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

    const totalItems = await Transmission.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalItems / limitNumber);

    const transmissions = await Transmission.find(searchQuery)
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);

    response.ok(res, 'Transmissions retrieved successfully', {
      transmissions,
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

    const { title, type } = req.body;

    // If title or type is being updated, check for duplicates
    if (title || type) {
      const searchType = type || transmission.type;
      const searchTitle = title || transmission.title;

      const existingTransmission = await Transmission.findOne({
        title: { $regex: new RegExp(`^${searchTitle}$`, 'i') },
        type: searchType,
        _id: { $ne: req.params.id }
      });
      
      if (existingTransmission) {
        return response.badRequest(res, `This transmission already exists for ${searchType}`);
      }

      // Update slug if title or type changes
      req.body.slug = slugify(`${searchTitle}-${searchType}`, { lower: true });
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

// Add new endpoint to get transmissions by type
export const getTransmissionsByType = asyncHandler(async (req, res) => {
  try {
    const { type } = req.query;
    
    const transmissions = await Transmission.find({ type })
      .sort({ order: 1, createdAt: -1 });
    
    if (!transmissions.length) {
      return response.ok(res, `No transmissions found for type: ${type}`, []);
    }
    
    response.ok(res, 'Transmissions retrieved successfully', transmissions);
  } catch (error) {
    console.error('Error fetching transmissions by type:', error);
    response.serverError(res, 'Error fetching transmissions');
  }
});
