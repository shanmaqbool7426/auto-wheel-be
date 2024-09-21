import asyncHandler from 'express-async-handler';
import {NewVehicle,Car,Bike,Truck} from './model.js';
import response from '../Utils/response.js';
import Review from '../Review/model.js';

// Create a new vehicle
const createNewVehicle = asyncHandler(async (req, res) => {
    try {
      const { type } = req.body;
      let newVehicle;
  
      if (type === 'car') {
        newVehicle = new Car(req.body);  // Create a new Car instance
      } else if (type === 'bike') {
        newVehicle = new Bike(req.body);  // Create a new Bike instance
      } else if (type === 'truck') {
        newVehicle = new Truck(req.body);  // Create a new Truck instance
      } else {
        return response.badRequest(res, 'Invalid vehicle type provided');  // Return error for invalid type
      }
  
      await newVehicle.save();
      
      response.ok(res, 'New Vehicle Created Successfully', newVehicle);
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
    // Aggregate vehicle details and reviews by slug for the main vehicle
    const vehicle = await NewVehicle.aggregate([
      {
        $match: { slug },  // Match vehicle by slug
      },
      {
        $lookup: {
          from: 'reviews',  // Join with the reviews collection
          localField: '_id',  // Vehicle ID in NewVehicle
          foreignField: 'vehicle',  // Vehicle reference in Review
          as: 'reviews',  // Store the joined reviews data
          pipeline: [
            {
              $group: {
                _id: '$vehicle',
                averageRating: { $avg: { $toDouble: '$overAllRating' } },  // Convert string to double and calculate average
                reviewCount: { $sum: 1 }  // Count the number of reviews
              }
            }
          ]
        }
      },
      {
        $addFields: {
          averageRating: { $arrayElemAt: ['$reviews.averageRating', 0] },  // Get the first (and only) element
          reviewCount: { $arrayElemAt: ['$reviews.reviewCount', 0] }  // Get the first (and only) element
        }
      },
      {
        $project: {
          vehicleDetails: '$$ROOT',  // Include all vehicle fields
          averageRating: { $ifNull: ['$averageRating', 0] },  // Default to 0 if no reviews
          reviewCount: { $ifNull: ['$reviewCount', 0] }  // Default to 0 if no reviews
        }
      }
    ]);

    // Check if the vehicle exists
    if (!vehicle.length) {
      return response.notFound(res, 'Vehicle not found');
    }

    // Extract the make and model from the found vehicle
    const { make, model } = vehicle[0].vehicleDetails;

    // Find all variants of the same model and make, except the current one, but exclude rating details
    const variants = await NewVehicle.aggregate([
      {
        $match: { make, model, slug: { $ne: slug } }  // Match variants but exclude the current vehicle
      },
      {
        $project: {
          _id: 1,
          make: 1,
          model: 1,
          variant: 1,
          type: 1,
          slug: 1,
          releaseDate: 1,
          year: 1,
          minPrice: 1,
          maxPrice: 1,
          description: 1,
          defaultImage: 1,
          images: 1,
          dimensions: 1,
          engine: 1,
          transmission: 1,
          fuelCapacity: 1,
          fuelAverage: 1,
          starting: 1,
          topSpeed: 1,
          dryWeight: 1,
          frame: 1,
          groundClearance: 1,
          wheelSize: 1,
          tyres: 1,
          colorsAvailable: 1,  // Include the fields without rating details
        }
      }
    ]);

    // Increment the views for the main vehicle
    await NewVehicle.findOneAndUpdate({ slug }, { $inc: { views: 1 } });

    // Return the vehicle details along with the variants
    response.ok(res, 'Vehicle details retrieved successfully', {
      vehicleDetails: vehicle[0].vehicleDetails,
      variants: variants.length ? variants : []  // Include variants or empty array if none
    });
  } catch (error) {
    console.error('Error retrieving vehicle:', error);
    return response.serverError(res, 'Error retrieving vehicle details', error);
  }
});


  

// // Update a vehicle by ID
// const updateNewVehicle = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   try {
//     // Find vehicle by ID and update with request body
//     const updatedVehicle = await NewVehicle.findByIdAndUpdate(id, req.body, { new: true });

//     if (!updatedVehicle) {
//       return response.notFound(res, 'Vehicle not found');
//     }

//     response.ok(res, 'Vehicle updated successfully', updatedVehicle);
//   } catch (error) {
//     console.error('Error updating vehicle:', error);
//     return response.serverError(res, 'Error updating vehicle', error);
//   }
// });

// Update a vehicle by ID
const updateNewVehicle = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { type } = req.body; // Extract the type from request body
  
    try {
      let updatedVehicle;
  
      // Choose the appropriate model based on the type
      if (type === 'car') {
        updatedVehicle = await Car.findByIdAndUpdate(id, req.body, { new: true });
      } else if (type === 'bike') {
        updatedVehicle = await Bike.findByIdAndUpdate(id, req.body, { new: true });
      } else if (type === 'truck') {
        updatedVehicle = await Truck.findByIdAndUpdate(id, req.body, { new: true });
      } else {
        return response.badRequest(res, 'Invalid vehicle type provided');
      }
  
      // If vehicle is not found, return 404 error
      if (!updatedVehicle) {
        return response.notFound(res, 'Vehicle not found');
      }
  
      // Return success response with updated vehicle data
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
      const { type, make } = req.query;
      
      // Build the filter based on query parameters
      const filter = {
        ...(type && { type }), // Add type to filter if provided
        ...(make && { make })  // Add make to filter if provided
      };
  
      const popularVehicles = await NewVehicle.aggregate([
        { $match: filter },  // Match the filter for type and make if provided
        { $sort: { views: -1 } },  // Sort by views in descending order
        { $limit: 8 },  // Limit the results to 8 vehicles
        {
          $lookup: {
            from: 'reviews',  // Join with the reviews collection
            localField: '_id',  // Vehicle ID in NewVehicle
            foreignField: 'vehicle',  // Vehicle reference in Review
            as: 'reviews'  // Store the reviews data
          }
        },
        {
          $addFields: {
            averageRating: {
              $avg: '$reviews.overAllRating'  // Calculate the average rating from reviews
            },
            reviewCount: { $size: '$reviews' }  // Count the number of reviews
          }
        },
        {
          $project: {
            _id: 1,
            make: 1,
            model: 1,
            variant: 1,
            type: 1,
            slug:1,
            views: 1,
            defaultImage: 1,
            averageRating: 1,  // Include average rating
            reviewCount: 1,    // Include review count
          }
        }
      ]);
  
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
      const { type } = req.query;
  
      if (!make) {
        return response.badRequest(res, 'Make is required');
      }
  
      // Build the filter object dynamically
      const filter = {
        make: { $regex: new RegExp(make, 'i') }  // Case-insensitive regex search for make
      };
  
      if (type) {
        filter.type = type;  // Add type filter if provided
      }
  
      // Use aggregation to fetch vehicles with average rating and review count
      const vehicles = await NewVehicle.aggregate([
        { $match: filter },  // Match vehicles based on make and type
        {
          $lookup: {
            from: 'reviews',  // Join with the reviews collection
            localField: '_id',  // Vehicle ID in NewVehicle
            foreignField: 'vehicle',  // Vehicle reference in Review
            as: 'reviews',  // Store the joined reviews data
            pipeline: [
              {
                $group: {
                  _id: '$vehicle',
                  averageRating: { $avg: { $toDouble: '$overAllRating' } },  // Convert string to double and calculate average
                  reviewCount: { $sum: 1 }  // Count the number of reviews
                }
              }
            ]
          }
        },
        {
          $addFields: {
            averageRating: { $arrayElemAt: ['$reviews.averageRating', 0] },  // Get the first (and only) element
            reviewCount: { $arrayElemAt: ['$reviews.reviewCount', 0] }  // Get the first (and only) element
          }
        },
        {
          $project: {
            _id: 1,
            make: 1,
            model: 1,
            variant: 1,
            slug:1,
            type: 1,
            views: 1,
            defaultImage: 1,
            createdAt: 1,
            averageRating: { $ifNull: ['$averageRating', 0] },  // Default to 0 if no reviews
            reviewCount: { $ifNull: ['$reviewCount', 0] }  // Default to 0 if no reviews
          }
        },
        { $sort: { createdAt: -1 } }  // Sort by the most recently added vehicles
      ]);
  
      if (vehicles.length === 0) {
        return response.notFound(res, `No vehicles found for make: ${make}`);
      }
  
      // Respond with the list of vehicles for the given make and type
      response.ok(res, `Vehicles for make: ${make} retrieved successfully`, vehicles);
    } catch (error) {
      console.error('Error retrieving vehicles by make:', error);
      return response.serverError(res, 'Error retrieving vehicles by make');
    }
  });
  

  const getPopularVehiclesByReviews = asyncHandler(async (req, res) => {
    const { type, make } = req.query; // Extract type and make from query parameters
  
    try {
      // Build the match stage for type and make filters if they are provided
      const matchStage = {};
      if (type) {
        matchStage['vehicleDetails.type'] = type;
      }
      if (make) {
        matchStage['vehicleDetails.make'] = make;
      }
  
      const popularVehicles = await Review.aggregate([
        {
          $group: {
            _id: '$vehicle',              // Group by vehicle ID
            reviewCount: { $sum: 1 }      // Count the number of reviews per vehicle
          }
        },
        {
          $sort: { reviewCount: -1 }      // Sort by review count in descending order
        },
        {
          $limit: 8                       // Limit the results to 8 vehicles
        },
        {
          $lookup: {                       // Join with Vehicle collection to get vehicle details
            from: 'newvehicles',           // Name of the vehicles collection
            localField: '_id',             // The field from the reviews collection (vehicle ID)
            foreignField: '_id',           // The field from the vehicles collection (vehicle ID)
            as: 'vehicleDetails'           // The alias for the joined data
          }
        },
        {
          $unwind: '$vehicleDetails'       // Unwind the vehicle details array
        },
        {
          $match: matchStage               // Apply type and make filters if provided
        },
        {
          $project: {
            _id: 0,                        // Exclude the grouped _id (vehicle ID)
            vehicle: '$vehicleDetails',    // Include full vehicle details
            reviewCount: 1                 // Include review count
          }
        }
      ]);
  
      if (!popularVehicles.length) {
        return response.notFound(res, 'No popular vehicles found');
      }
  
      return response.ok(res, 'Popular vehicles retrieved successfully', popularVehicles);
    } catch (error) {
      console.error('Error retrieving popular vehicles by reviews:', error);
      return response.serverError(res, 'An error occurred while retrieving popular vehicles by reviews');
    }
  });  

  const getNewlyLaunchedVehicles = asyncHandler(async (req, res) => {
    try {
      const { type, make } = req.query;
  
      // Get today's date and the date from one month ago
      const today = new Date();
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(today.getMonth() - 1);
  
      // Build the filter based on query parameters
      const filter = {
        releaseDate: { $gte: oneMonthAgo, $lte: today },  // Release date should be within the last month
        ...(type && { type }),  // Add type to filter if provided
        ...(make && { make })  // Add make to filter if provided
      };
  
      const newlyLaunchedVehicles = await NewVehicle.aggregate([
        { $match: filter },  // Match the filter for releaseDate, type, and make
        { $sort: { releaseDate: -1 } },  // Sort by releaseDate in descending order
        {
          $lookup: {
            from: 'reviews',  // Join with the reviews collection
            localField: '_id',  // Vehicle ID in NewVehicle
            foreignField: 'vehicle',  // Vehicle reference in Review
            as: 'reviews'  // Store the reviews data
          }
        },
        {
          $addFields: {
            averageRating: {
              $avg: '$reviews.overAllRating'  // Calculate the average rating from reviews
            },
            reviewCount: { $size: '$reviews' }  // Count the number of reviews
          }
        },
        {
          $project: {
            _id: 1,
            make: 1,
            model: 1,
            variant: 1,
            type: 1,
            slug: 1,
            releaseDate: 1,
            views: 1,
            defaultImage: 1,
            averageRating: 1,  // Include average rating
            reviewCount: 1,    // Include review count
          }
        }
      ]);
  
      if (!newlyLaunchedVehicles.length) {
        return response.notFound(res, 'No newly launched vehicles found');
      }
  
      response.ok(res, 'Newly launched vehicles retrieved successfully', newlyLaunchedVehicles);
    } catch (error) {
      console.error('Error retrieving newly launched vehicles:', error);
      return response.serverError(res, 'Error retrieving newly launched vehicles', error);
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
  getVehiclesByMake,
  getPopularVehiclesByReviews,
  getNewlyLaunchedVehicles
};
