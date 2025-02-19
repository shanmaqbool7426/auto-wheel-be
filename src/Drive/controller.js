import asyncHandler from 'express-async-handler';
import Drive from './model.js';
import response from '../Utils/response.js';
import slugify from 'slugify';

// Create
export const createDrive = asyncHandler(async (req, res) => {
  try {
    const { title, type } = req.body;
    
    // Generate slug from title and type
    const slug = slugify(`${title}-${type}`, { lower: true });

    // Check if drive already exists for the same type
    const existingDrive = await Drive.findOne({ 
      title: { $regex: new RegExp(`^${title}$`, 'i') },
      type 
    });
    
    if (existingDrive) {
      return response.badRequest(res, `This drive already exists for ${type}`);
    }

    const drive = await Drive.create({
      ...req.body,
      slug,
      order: req.body.order || await getNextOrder()
    });

    response.created(res, 'Drive created successfully', drive);
  } catch (error) {
    console.error('Error creating drive:', error);
    response.serverError(res, 'Error creating drive');
  }
});

// Helper function to get the next available order number
const getNextOrder = async () => {
  const lastDrive = await Drive.findOne().sort({ order: -1 });
  return lastDrive ? lastDrive.order + 1 : 1;
};

// Get all drives with pagination and search
export const getAllDrives = asyncHandler(async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      type = 'all'
    } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    // Build search query
    let searchQuery = search
      ? { title: { $regex: search, $options: 'i' } }
      : {};

    // Add type filter if not 'all'
    if (type !== 'all') {
      searchQuery = { ...searchQuery, type };
    }

    const totalItems = await Drive.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalItems / limitNumber);

    const drives = await Drive.find(searchQuery)
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);

    response.ok(res, 'Drives retrieved successfully', {
      drives,
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
    console.error('Error retrieving drives:', error);
    response.serverError(res, 'Error retrieving drives');
  }
});

// Get by ID
export const getDriveById = asyncHandler(async (req, res) => {
  try {
    const drive = await Drive.findById(req.params.id);
    
    if (!drive) {
      return response.notFound(res, 'Drive not found');
    }

    response.ok(res, 'Drive retrieved successfully', drive);
  } catch (error) {
    console.error('Error retrieving drive:', error);
    response.serverError(res, 'Error retrieving drive');
  }
});

// Update
export const updateDrive = asyncHandler(async (req, res) => {
  try {
    const drive = await Drive.findById(req.params.id);
    
    if (!drive) {
      return response.notFound(res, 'Drive not found');
    }

    const { title, type } = req.body;

    // If title or type is being updated, check for duplicates
    if (title || type) {
      const searchType = type || drive.type;
      const searchTitle = title || drive.title;

      const existingDrive = await Drive.findOne({
        title: { $regex: new RegExp(`^${searchTitle}$`, 'i') },
        type: searchType,
        _id: { $ne: req.params.id }
      });
      
      if (existingDrive) {
        return response.badRequest(res, `This drive already exists for ${searchType}`);
      }

      // Update slug if title or type changes
      req.body.slug = slugify(`${searchTitle}-${searchType}`, { lower: true });
    }

    const updatedDrive = await Drive.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    
    response.ok(res, 'Drive updated successfully', updatedDrive);
  } catch (error) {
    console.error('Error updating drive:', error);
    response.serverError(res, 'Error updating drive');
  }
});

// Delete
export const deleteDrive = asyncHandler(async (req, res) => {
  try {
    const drive = await Drive.findById(req.params.id);
    
    if (!drive) {
      return response.notFound(res, 'Drive not found');
    }

    await drive.deleteOne();
    
    response.ok(res, 'Drive deleted successfully');
  } catch (error) {
    console.error('Error deleting drive:', error);
    response.serverError(res, 'Error deleting drive');
  }
});

// Update drive order
export const updateDriveOrder = asyncHandler(async (req, res) => {
  try {
    const { newOrder } = req.body;
    const drive = await Drive.findById(req.params.id);

    if (!drive) {
      return response.notFound(res, 'Drive not found');
    }

    const existingDrive = await Drive.findOne({ 
      order: newOrder,
      _id: { $ne: drive._id }
    });

    if (existingDrive) {
      return response.badRequest(res, 'A drive with this order number already exists');
    }

    drive.order = newOrder;
    await drive.save();

    response.ok(res, 'Drive order updated successfully', drive);
  } catch (error) {
    console.error('Error updating drive order:', error);
    response.serverError(res, 'Error updating drive order');
  }
});

// Get drives by type
export const getDrivesByType = asyncHandler(async (req, res) => {
  try {
    const { type } = req.query;
    
    const drives = await Drive.find({ type })
      .sort({ order: 1, createdAt: -1 });
    
    if (!drives.length) {
      return response.ok(res, `No drives found for type: ${type}`, []);
    } 
    
    response.ok(res, 'Drives retrieved successfully', drives);
  } catch (error) {
    console.error('Error fetching drives by type:', error);
    response.serverError(res, 'Error fetching drives');
  }
});