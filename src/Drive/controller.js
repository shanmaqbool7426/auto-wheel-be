import asyncHandler from 'express-async-handler';
import Drive from './model.js';
import response from '../Utils/response.js';
import slugify from 'slugify';

// Create
export const createDrive = asyncHandler(async (req, res) => {
  try {
    const { title, type, order } = req.body;
    const slug = slugify(title, { lower: true });

    // Check if drive with same order exists
    const existingOrder = await Drive.findOne({ order });
    if (existingOrder) {
      return response.badRequest(res, 'A drive with this order number already exists');
    }

    // Check if drive with same slug exists
    const existingSlug = await Drive.findOne({ slug });
    if (existingSlug) {
      return response.badRequest(res, 'A drive with this title already exists');
    }

    const drive = await Drive.create({
      title,
      type,
      slug,
      order: order || await getNextOrder()
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

// Get all
export const getAllDrives = asyncHandler(async (req, res) => {
  try {
    const drives = await Drive.find().sort({ order: 1, createdAt: -1 });
    response.ok(res, 'Drives retrieved successfully', drives);
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
    const { title, type, order } = req.body;
    const drive = await Drive.findById(req.params.id);
    
    if (!drive) {
      return response.notFound(res, 'Drive not found');
    }

    if (title) {
      const slug = slugify(title, { lower: true });
      const existingSlug = await Drive.findOne({ 
        slug, 
        _id: { $ne: drive._id } 
      });
      
      if (existingSlug) {
        return response.badRequest(res, 'A drive with this title already exists');
      }
      drive.slug = slug;
    }

    if (order && order !== drive.order) {
      const existingOrder = await Drive.findOne({ 
        order, 
        _id: { $ne: drive._id }
      });
      
      if (existingOrder) {
        return response.badRequest(res, 'A drive with this order number already exists');
      }
    }

    drive.title = title || drive.title;
    drive.type = type || drive.type;
    drive.order = order || drive.order;

    const updatedDrive = await drive.save();
    
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