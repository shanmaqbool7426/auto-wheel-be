import asyncHandler from 'express-async-handler';
import NewVehicle from './model.js';
import response from '../Utils/response.js';

// Create a new vehicle
const createNewVehicle = asyncHandler(async (req, res) => {
  try {
    const newVehicle = new NewVehicle(req.body);  // Create a new vehicle instance from request body
    await newVehicle.save();  // Save the vehicle to the database
    response.ok(res, 'New Vehicle Created Successfully', newVehicle);  // Send success response
  } catch (error) {
    console.error('Error creating vehicle:', error);
    return response.serverError(res, 'Error creating vehicle', error);  // Send error response
  }
});

// Get a list of vehicles with optional filters
const getListNewVehicles = asyncHandler(async (req, res) => {
  try {
    const { type, make, model, year, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

    // Define filters
    const filters = {};
    if (type) filters.type = type;
    if (make) filters.make = { $regex: new RegExp(make, 'i') };  // Case-insensitive search
    if (model) filters.model = { $regex: new RegExp(model, 'i') };
    if (year) filters.year = year;
    if (minPrice && maxPrice) {
      filters.minPrice = { $gte: minPrice };
      filters.maxPrice = { $lte: maxPrice };
    }

    // Pagination options
    const options = {
      skip: (page - 1) * limit,
      limit: parseInt(limit, 10),
      sort: { createdAt: -1 },  // Sort by most recent
    };

    // Retrieve vehicles and total count for pagination
    const [total, vehicles] = await Promise.all([
      NewVehicle.countDocuments(filters),  // Total count of filtered vehicles
      NewVehicle.find(filters, null, options).lean(),  // Retrieve vehicles
    ]);

    // Send success response
    response.ok(res, 'Vehicles retrieved successfully', { total, vehicles });
  } catch (error) {
    console.error('Error retrieving vehicles:', error);
    return response.serverError(res, 'Error retrieving vehicles', error);
  }
});

// Get vehicle details by slug
const getNewVehicleBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  try {
    // Find vehicle by slug and increment views
    const vehicle = await NewVehicle.findOneAndUpdate(
      { slug },
      { $inc: { views: 1 } },  // Increment views
      { new: true }
    );

    if (!vehicle) {
      return response.notFound(res, 'Vehicle not found');
    }

    response.ok(res, 'Vehicle details retrieved successfully', vehicle);
  } catch (error) {
    console.error('Error retrieving vehicle:', error);
    return response.serverError(res, 'Error retrieving vehicle details', error);
  }
});

// Update a vehicle by ID
const updateNewVehicle = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    // Find vehicle by ID and update with request body
    const updatedVehicle = await NewVehicle.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedVehicle) {
      return response.notFound(res, 'Vehicle not found');
    }

    response.ok(res, 'Vehicle updated successfully', updatedVehicle);
  } catch (error) {
    console.error('Error updating vehicle:', error);
    return response.serverError(res, 'Error updating vehicle', error);
  }
});

// Delete a vehicle by ID
const deleteNewVehicle = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const vehicle = await NewVehicle.findByIdAndDelete(id);

    if (!vehicle) {
      return response.notFound(res, 'Vehicle not found');
    }

    response.ok(res, 'Vehicle deleted successfully');
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    return response.serverError(res, 'Error deleting vehicle', error);
  }
});

// Get similar vehicles by make and model
const getSimilarNewVehicles = asyncHandler(async (req, res) => {
  const { vehicleId } = req.params;

  try {
    // Find the current vehicle by ID
    const currentVehicle = await NewVehicle.findById(vehicleId);
    if (!currentVehicle) {
      return response.notFound(res, 'Vehicle not found');
    }

    // Find similar vehicles by matching make or model
    const similarVehicles = await NewVehicle.find({
      $or: [
        { make: currentVehicle.make, model: currentVehicle.model },
        { make: currentVehicle.make },
      ],
      _id: { $ne: vehicleId }  // Exclude the current vehicle from results
    }).limit(10).lean();

    response.ok(res, 'Similar vehicles retrieved successfully', similarVehicles);
  } catch (error) {
    console.error('Error fetching similar vehicles:', error);
    return response.serverError(res, 'Error fetching similar vehicles', error);
  }
});

// Get popular vehicles based on views
const getPopularNewVehicles = asyncHandler(async (req, res) => {
  try {
    const popularVehicles = await NewVehicle.find()
      .sort({ views: -1 })  // Sort by views in descending order
      .limit(8);  // Limit to 8 vehicles

    if (!popularVehicles.length) {
      return response.notFound(res, 'No popular vehicles found');
    }

    response.ok(res, 'Popular vehicles retrieved successfully', popularVehicles);
  } catch (error) {
    console.error('Error retrieving popular vehicles:', error);
    return response.serverError(res, 'Error retrieving popular vehicles', error);
  }
});

// API to Get Upcoming Vehicles (releaseDate in the future)
const getUpcomingNewVehicles = asyncHandler(async (req, res) => {
    try {
      // Find all vehicles where the release date is in the future
      const upcomingVehicles = await NewVehicle.find({
        releaseDate: { $gte: new Date() }
      }).sort({ releaseDate: 1 });  // Sort by release date in ascending order
  
      if (upcomingVehicles.length === 0) {
        return response.notFound(res, 'No upcoming vehicles found');
      }
  
      // Respond with the list of upcoming vehicles
      response.ok(res, 'Upcoming vehicles retrieved successfully', upcomingVehicles);
    } catch (error) {
      console.error('Error retrieving upcoming vehicles:', error);
      return response.serverError(res, 'Error retrieving upcoming vehicles');
    }
  });

  // API to Get Vehicles by Make
const getVehiclesByMake = asyncHandler(async (req, res) => {
    try {
      const { make } = req.params;
  
      if (!make) {
        return response.badRequest(res, 'Make is required');
      }
  
      // Find vehicles that match the make (case-insensitive)
      const vehicles = await NewVehicle.find({
        make: { $regex: new RegExp(make, 'i') }  // Case-insensitive regex search
      }).sort({ createdAt: -1 });  // Sort by the most recently added vehicles
  
      if (vehicles.length === 0) {
        return response.notFound(res, `No vehicles found for make: ${make}`);
      }
  
      // Respond with the list of vehicles for the given make
      response.ok(res, `Vehicles for make: ${make} retrieved successfully`, vehicles);
    } catch (error) {
      console.error('Error retrieving vehicles by make:', error);
      return response.serverError(res, 'Error retrieving vehicles by make');
    }
  });

export {
  createNewVehicle,
  getListNewVehicles,
  getNewVehicleBySlug,
  updateNewVehicle,
  deleteNewVehicle,
  getSimilarNewVehicles,
  getPopularNewVehicles,
  getUpcomingNewVehicles,
  getVehiclesByMake
};
