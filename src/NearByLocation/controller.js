import asyncHandler from 'express-async-handler';
import NearByLocation from './model.js'; 
import response from '../Utils/response.js';

// Create a new nearby location
export const createNearByLocation = asyncHandler(async (req, res) => {
  try {
    const { title, description, image, order, slug } = req.body;

    // Check if a location with the same order already exists
    const existingLocation = await NearByLocation.findOne({ order });
    if (existingLocation) {
      return response.badRequest(res, 'A location with this order number already exists');
    }

    // If no duplicate order, create the location
    const location = await NearByLocation.create({
      title,
      description,
      image,
      slug,
      order: order || await getNextOrder() // Use helper function to get next available order
    });

    response.created(res, 'Location created successfully', location);
  } catch (error) {
    console.error('Error creating location:', error);
    response.serverError(res, 'Error creating location');
  }
});

// Helper function to get the next available order number
const getNextOrder = async () => {
  const lastLocation = await NearByLocation.findOne({})
    .sort({ order: -1 })
    .limit(1);

  return lastLocation ? lastLocation.order + 1 : 0;
};

// Get all locations
export const getAllNearByLocations = asyncHandler(async (req, res) => {
  try {
    const locations = await NearByLocation.find({})
      .sort({ order: 1, createdAt: -1 });

    response.ok(res, 'Locations retrieved successfully', locations);
  } catch (error) {
    console.error('Error retrieving locations:', error);
    response.serverError(res, 'Error retrieving locations');
  }
});

// Get all active locations
export const getAllActiveNearByLocations = asyncHandler(async (req, res) => {
  try {
    const locations = await NearByLocation.find({ status: true })
      .sort({ order: 1, createdAt: -1 });

    response.ok(res, 'Locations retrieved successfully', locations);
  } catch (error) {
    console.error('Error retrieving locations:', error);
    response.serverError(res, 'Error retrieving locations');
  }
});

// Get location by ID
export const getNearByLocationById = asyncHandler(async (req, res) => {
  try {
    const location = await NearByLocation.findById(req.params.id);
    
    if (!location) {
      return response.notFound(res, 'Location not found');
    }

    response.ok(res, 'Location retrieved successfully', location);
  } catch (error) {
    console.error('Error retrieving location:', error);
    response.serverError(res, 'Error retrieving location');
  }
});

// Update location
export const updateNearByLocation = asyncHandler(async (req, res) => {
  try {
    const { title, description, image, status, slug, order } = req.body;
    
    const location = await NearByLocation.findById(req.params.id);
    
    if (!location) {
      return response.notFound(res, 'Location not found');
    }

    // Check for duplicate order number only if order is being updated
    if (order && order !== location.order) {
      const existingLocation = await NearByLocation.findOne({ 
        order, 
        _id: { $ne: location._id } // Exclude current location from check
      });
      
      if (existingLocation) {
        return response.badRequest(res, 'A location with this order number already exists');
      }
    }

    // Update location fields
    location.title = title || location.title;
    location.description = description || location.description;
    location.image = image || location.image;
    location.slug = slug || location.slug;
    location.order = order || location.order;
    location.status = status !== undefined ? status : location.status;

    const updatedLocation = await location.save();
    
    response.ok(res, 'Location updated successfully', updatedLocation);
  } catch (error) {
    console.error('Error updating location:', error);
    response.serverError(res, 'Error updating location');
  }
});

// Delete location
export const deleteNearByLocation = asyncHandler(async (req, res) => {
  try {
    const location = await NearByLocation.findById(req.params.id);
    
    if (!location) {
      return response.notFound(res, 'Location not found');
    }

    await location.deleteOne();
    
    response.ok(res, 'Location deleted successfully');
  } catch (error) {
    console.error('Error deleting location:', error);
    response.serverError(res, 'Error deleting location');
  }
});

// Update location order
export const updateNearByLocationOrder = asyncHandler(async (req, res) => {
  try {
    const { order } = req.body;
    
    const location = await NearByLocation.findById(req.params.id);
    
    if (!location) {
      return response.notFound(res, 'Location not found');
    }

    location.order = order;
    await location.save();
    
    response.ok(res, 'Location order updated successfully', location);
  } catch (error) {
    console.error('Error updating location order:', error);
    response.serverError(res, 'Error updating location order');
  }
});
