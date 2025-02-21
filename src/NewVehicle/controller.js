import asyncHandler from 'express-async-handler';
import { NewVehicle, Car, Bike, Truck } from './model.js';
import response from '../Utils/response.js';
import Review from '../Review/model.js';
import BrowesByBody from '../BrowseByBody/model.js';

// Create a new vehicle
const createNewVehicle = asyncHandler(async (req, res) => {
  try {
    const { type } = req.body;
    let newVehicle;

    // Base vehicle data that's common to all types
    const baseVehicleData = {
      type: req.body.type,
      make: req.body.make,
      model: req.body.model,
      variant: req.body.variant,
      year: req.body.year,
      bodyType: req.body.bodyType,
      minPrice: req.body.minPrice,
      maxPrice: req.body.maxPrice,
      colorsAvailable: req.body.colorsAvailable || [],
      releaseDate: req.body.releaseDate,
      description: req.body.description,
      defaultImage: req.body.defaultImage,
      images: req.body.images || [],
      views: req.body.views || 0,
      pros: req.body.pros,
      cons: req.body.cons,
      faqs: req.body.faqs,
      Info: {
        make: req.body.make,
        model: req.body.model,
        variant: req.body.variant
      }
    };

    if (type === 'car') {
      // Extract car-specific data
      const carData = {
        ...baseVehicleData,
        ...req.body.carSpecs,
        brochureLink: req.body.brochureLink
      };

      // Create new Car instance
      newVehicle = new Car(carData);
    } 
    else if (type === 'bike') {
      // Extract bike-specific data
      const bikeData = {
        ...baseVehicleData,
        ...req.body.bikeSpecs,
        brochureLink: req.body.brochureLink
      };

      // Create new Bike instance
      newVehicle = new Bike(bikeData);
    } 
    else if (type === 'truck') {
      // Extract truck-specific data
      const truckData = {
        ...baseVehicleData,
        ...req.body.truckSpecs,
        brochureLink: req.body.brochureLink
      };

      // Create new Truck instance
      newVehicle = new Truck(truckData);
    } 
    else {
      return response.badRequest(res, 'Invalid vehicle type provided');
    }

    // Validate the document before saving
    const validationError = newVehicle.validateSync();
    if (validationError) {
      console.error('Validation error:', validationError);
      return response.badRequest(res, 'Validation failed', validationError);
    }

    // Save the vehicle
    await newVehicle.save();
    
    // Send success response
    response.ok(res, 'New Vehicle Created Successfully', newVehicle);

  } catch (error) {
    console.error('Error creating vehicle:', error);
    
    // Check for duplicate key error (code 11000)
    if (error.code === 11000) {
      // Check if the duplicate key is for the slug field
      if (error.keyPattern && error.keyPattern.slug) {
        return response.badRequest(
          res, 
          'A vehicle with this make, model, and variant combination already exists. Please modify the details.',
          {
            field: 'slug',
            value: error.keyValue.slug
          }
        );
      }
      return response.badRequest(res, 'Duplicate entry found', error.keyValue);
    }

    return response.serverError(res, 'Error creating vehicle', error);
  }
});


// Update a vehicle by ID
const updateNewVehicle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { type } = req.body; // Extract the type from request body

  try {
    let updatedVehicle;
    const baseVehicleData = {
      type: req.body.type,
      make: req.body.make,
      model: req.body.model,
      variant: req.body.variant,
      year: req.body.year,
      bodyType: req.body.bodyType,
      minPrice: req.body.minPrice,
      maxPrice: req.body.maxPrice,
      colorsAvailable: req.body.colorsAvailable || [],
      releaseDate: req.body.releaseDate,
      description: req.body.description,
      defaultImage: req.body.defaultImage,
      images: req.body.images || [],
      views: req.body.views || 0,
      pros: req.body.pros,
      cons: req.body.cons,
      faqs: req.body.faqs,
      Info: {
        make: req.body.make,
        model: req.body.model,
        variant: req.body.variant
      }
    };

    // Choose the appropriate model based on the type
    if (type === 'car') {
      const carData = {
        ...baseVehicleData,
        ...req.body.carSpecs,
        brochureLink: req.body.brochureLink
      };
      updatedVehicle = await Car.findByIdAndUpdate(id, carData, { new: true });
    } else if (type === 'bike') {
      const bikeData = {
        ...baseVehicleData,
        ...req.body.bikeSpecs,
        brochureLink: req.body.brochureLink
      };
      updatedVehicle = await Bike.findByIdAndUpdate(id, bikeData, { new: true });
    } else if (type === 'truck') {
      const truckData = {
        ...baseVehicleData,
        ...req.body.truckSpecs,
        brochureLink: req.body.brochureLink
      };
      updatedVehicle = await Truck.findByIdAndUpdate(id, truckData, { new: true });
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
 
// Get a list of vehicles with optional filters
const getListNewVehicles = asyncHandler(async (req, res) => {
  try {
    const { type, make, model, year, minPrice, maxPrice, page = 1, limit = 10, search } = req.query;

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

    if (search) {
      filters.$or = [
        { make: { $regex: new RegExp(search, 'i') } },
        { model: { $regex: new RegExp(search, 'i') } },
        { variant: { $regex: new RegExp(search, 'i') } }
      ];
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

const getPopularVehiclesByReviews = asyncHandler(async (req, res) => {
  try {
    const { type, make, model, year, minPrice, maxPrice } = req.query;

    // Build filter object
    const filter = {};
    if (type) filter.type = type;
    if (make) filter.make = { $regex: new RegExp(make, 'i') };
    if (model) filter.model = { $regex: new RegExp(model, 'i') };
    if (year) filter.year = year;
    if (minPrice && maxPrice) {
      filter.minPrice = { $gte: Number(minPrice) };
      filter.maxPrice = { $lte: Number(maxPrice) };
    }

    // Get vehicles
    const vehicles = await NewVehicle.find(filter)
      .limit(8)
      .lean();

    // Get reviews for these vehicles
    const vehicleIds = vehicles.map(v => v._id);
    const reviews = await Review.find({ vehicleId: { $in: vehicleIds } })
      .select('vehicleId overAllRating')
      .lean();


    // Calculate average ratings and add review counts
    const vehiclesWithRatings = vehicles.map(vehicle => {
      const vehicleReviews = reviews.filter(review => 
        review.vehicleId.toString() === vehicle._id.toString()
      );
      
      const reviewCount = vehicleReviews.length;
      let averageRating = 0;

      if (reviewCount > 0) {
        const totalRating = vehicleReviews.reduce((sum, review) => {
          return sum + Number(review.overAllRating);
        }, 0);
        averageRating = Number((totalRating / reviewCount).toFixed(1));
      }

      return {
        _id: vehicle._id,
        make: vehicle.make,
        model: vehicle.model,
        variant: vehicle.variant,
        type: vehicle.type,
        year: vehicle.year,
        minPrice: vehicle.minPrice,
        maxPrice: vehicle.maxPrice,
        defaultImage: vehicle.defaultImage,
        views: vehicle.views,
        slug: vehicle.slug,
        reviewCount,
        averageRating
      };
    });

    // Sort by review count and then by average rating
    vehiclesWithRatings.sort((a, b) => {
      if (b.reviewCount !== a.reviewCount) {
        return b.reviewCount - a.reviewCount;
      }
      return b.averageRating - a.averageRating;
    });

    // Send success response
    response.ok(res, 'Vehicles retrieved successfully', vehicles);
  } catch (error) {
    console.error('Error retrieving vehicles:', error);
    response.serverError(res, 'Error retrieving vehicles', error.message);
  }
});


// Get vehicle details by slug
const getNewVehicleBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  try {
    // Aggregate vehicle details and reviews by slug
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

    // Increment the views
    await NewVehicle.findOneAndUpdate({ slug }, { $inc: { views: 1 } });

    // Return the vehicle details along with the ratings
    response.ok(res, 'Vehicle details retrieved successfully', vehicle[0]);
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



// Delete a vehicle by ID
const deleteNewVehicle = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const vehicle = await NewVehicle.findByIdAndDelete(id);

    if (!vehicle) {
      return response.notFound(res, 'Vehicle not found');
    }

    response.ok(res, 'Vehicle deleted successfully.........,,,');
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    return response.serverError(res, 'An error occurred while deleting the vehicle: ' + error.message);
  }
});

// Bulk delete vehicles
const bulkDeleteVehicles = asyncHandler(async (req, res) => {
  const { ids } = req.body; // Expect an array of vehicle IDs

  try {
    // Validate that ids is an array and not empty
    if (!Array.isArray(ids) || ids.length === 0) {
      return response.badRequest(res, 'Please provide an array of vehicle IDs');
    }

    // Delete multiple vehicles
    const result = await NewVehicle.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount === 0) {
      return response.notFound(res, 'No vehicles found to delete');
    }

    response.ok(res, `Successfully deleted ${result.deletedCount} vehicles`);
  } catch (error) {
    console.error('Error bulk deleting vehicles:', error);
    return response.serverError(res, 'Error bulk deleting vehicles', error);
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
    const { type, make, bodyType } = req.query;

    // First find the bodyType ID if bodyType is provided
    let bodyTypeId;
    if (bodyType) {
      const body = await BrowesByBody.findOne({
        title: { $regex: new RegExp('^' + bodyType + '$', 'i') }
      });
      bodyTypeId = body?._id?.toString();
    }

    // Build the filter based on query parameters
    const filter = {
      ...(type && { type: { $regex: new RegExp('^' + type + '$', 'i') } }),
      ...(make && { make: { $regex: new RegExp('^' + make + '$', 'i') } }),
      ...(bodyTypeId && { bodyType: bodyTypeId })
    };

    const popularVehicles = await NewVehicle.aggregate([
      { $match: filter },
      { $sort: { views: -1 } },  // Sort by views in descending order
      { $limit: 8 },  // Limit the results to 8 vehicles
      {
        $lookup: {
          from: 'reviews',  // Join with the reviews collection
          localField: '_id',  // Vehicle ID in NewVehicle collection
          foreignField: 'vehicleId',  // Changed from 'vehicle' to 'vehicleId'
          as: 'reviews'  // Store the reviews data
        }
      },
      {
        $addFields: {
          averageRating: {
            $cond: {
              if: { $gt: [{ $size: '$reviews' }, 0] },
              then: {
                $round: [
                  {
                    $avg: {
                      $map: {
                        input: '$reviews',
                        as: 'review',
                        in: { 
                          $convert: {
                            input: '$$review.overAllRating',
                            to: 'double',
                            onError: 0,
                            onNull: 0
                          }
                        }
                      }
                    }
                  },
                  1  // Round to 1 decimal place
                ]
              },
              else: 0  // Return 0 instead of null when no reviews
            }
          },
          reviewCount: { $size: '$reviews' }
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
          views: 1,
          minPrice: 1,
          maxPrice: 1,
          year: 1,
          defaultImage: 1,
          averageRating: 1,
          reviewCount: 1,
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

const getTopComparisonVehicles = asyncHandler(async (req, res) => {
  try {
    const { type, make, bodyType } = req.query;

    let bodyTypeId;
    if (bodyType) {
      const body = await BrowesByBody.findOne({
        title: { $regex: new RegExp('^' + bodyType + '$', 'i') }
      });
      bodyTypeId = body?._id?.toString();
    }
    // Build the filter based on query parameters
    const filter = {
      ...(type && { type }), // Add type to filter if provided
      ...(make && { make }),  // Add make to filter if provided
      ...(bodyTypeId && { bodyType: bodyTypeId })  // Add body to filter if provided
    };

    // Fetch up to 12 popular vehicles based on the provided filter
    const comparisonVehicles = await NewVehicle.aggregate([
      { $match: filter },  // Match the filter for type and make if provided
      { $limit: 12 },  // Limit the results to 12 vehicles
      {
        $lookup: {
          from: 'reviews',  // Join with the reviews collection
          localField: '_id',  // Vehicle ID in NewVehicle collection
          foreignField: 'vehicle',  // Match with vehicle reference in Review collection
          as: 'reviews'  // Store the reviews data
        }
      },
      {
        $addFields: {
          averageRating: {
            $cond: {
              if: { $gt: [{ $size: '$reviews' }, 0] },  // Check if there are any reviews
              then: {
                $round: [{ $avg: '$reviews.overAllRating' }, 4]  // Calculate the average rating and round to 4 decimal places
              },
              else: null  // If no reviews, return null
            }
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
          views: 1,
          minPrice: 1,
          maxPrice: 1,
          year: 1,
          defaultImage: 1,  // Include the default image
          averageRating: 1,  // Include average rating
          reviewCount: 1,    // Include review count
        }
      }
    ]);

    // Return an empty array if fewer than 2 vehicles are available for pairing
    if (comparisonVehicles.length < 2) {
      return response.ok(res, 'Not enough vehicles found for comparison', []);
    }

    // Randomize and create up to 6 pairs of vehicles
    const shuffledVehicles = comparisonVehicles.sort(() => 0.5 - Math.random());
    const vehiclePairs = [];
    const pairsToCreate = Math.min(6, Math.floor(shuffledVehicles.length / 2));

    for (let i = 0; i < pairsToCreate * 2; i += 2) {
      const vehiclePair = {
        vehicle1: shuffledVehicles[i],
        vehicle2: shuffledVehicles[i + 1]
      };
      vehiclePairs.push(vehiclePair);
    }

    // Respond with the generated vehicle pairs
    response.ok(res, 'Vehicle pairs for comparison retrieved successfully', vehiclePairs);
  } catch (error) {
    console.error('Error retrieving comparison vehicles:', error);
    return response.serverError(res, 'Error retrieving comparison vehicles', error);
  }
});

export const getComparison = async (req, res) => {
  const { vehicle1, vehicle2, vehicle3 } = req.body;
  const { type } = req.query;

  // Check that at least two vehicles are provided
  if (!vehicle1 || !vehicle2 || (vehicle1 && !vehicle2 && vehicle3)) {
    return res.status(400).json({ error: "You must select at least two vehicles to compare." });
  }

  try {
    // Function to find or return a random vehicle based on type
    const findOrRandomVehicle = async (vehicle, type) => {
      if (vehicle) {
        // Check for vehicle with make, model, and variant
        let existingVehicle = await NewVehicle.findOne({
          make: vehicle.make,
          model: vehicle.model,
          variant: vehicle.variant,
          type: type
        });

        // If vehicle exists, return its ID
        if (existingVehicle) {
          return existingVehicle._id;
        }

        // Check for vehicle with make and model
        existingVehicle = await NewVehicle.findOne({
          make: vehicle.make,
          model: vehicle.model,
          type: type
        });

        // If vehicle exists, return its ID
        if (existingVehicle) {
          return existingVehicle._id;
        }

        // Check for vehicle with model only
        existingVehicle = await NewVehicle.findOne({
          model: vehicle.model,
          type: type
        });

        // If vehicle exists, return its ID
        if (existingVehicle) {
          return existingVehicle._id;
        }
      }

      // If vehicle doesn't exist or not provided, return a random vehicle ID based on the type
      const randomVehicle = await NewVehicle.aggregate([
        { $match: { type: type } }, // Filter by type before selecting randomly
        { $sample: { size: 1 } }
      ]);
      return randomVehicle[0]._id;
    };

    // Check each vehicle and get their IDs
    const vehicleIds = [];
    vehicleIds.push(await findOrRandomVehicle(vehicle1, type));
    vehicleIds.push(await findOrRandomVehicle(vehicle2, type));

    if (vehicle3) {
      vehicleIds.push(await findOrRandomVehicle(vehicle3, type));
    }

    // Populate the vehicle details along with reviews and calculated fields
    const populatedVehicles = await NewVehicle.aggregate([
      { $match: { _id: { $in: vehicleIds } } },
      {
        $lookup: {
          from: 'reviews',  // Join with the reviews collection
          localField: '_id',  // Vehicle ID in NewVehicle collection
          foreignField: 'vehicle',  // Match with vehicle reference in Review collection
          as: 'reviews'  // Store the reviews data
        }
      },
      {
        $addFields: {
          averageRating: {
            $cond: {
              if: { $gt: [{ $size: '$reviews' }, 0] },  // Check if there are any reviews
              then: {
                $round: [{ $avg: '$reviews.overAllRating' }, 4]  // Calculate the average rating and round to 4 decimal places
              },
              else: null  // If no reviews, return null
            }
          },
          reviewCount: { $size: '$reviews' }  // Count the number of reviews
        }
      }
    ]);

    res.status(200).json({
      message: "Comparison data retrieved successfully",
      comparison: populatedVehicles
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// API to Get Upcoming Vehicles (releaseDate in the future)
const getUpcomingNewVehicles = asyncHandler(async (req, res) => {
  try {
    const { type, make, bodyType } = req.query;

    let bodyTypeId;
    if (bodyType) {
      const body = await BrowesByBody.findOne({
        title: { $regex: new RegExp('^' + bodyType + '$', 'i') }
      });
      bodyTypeId = body?._id?.toString();
    }
    // Build the filter based on query parameters
    const filter = {
      releaseDate: { $gte: new Date() },  // Find vehicles with release dates in the future
      ...(type && { type }),  // Add type to filter if provided
      ...(make && { make }),  // Add make to filter if provided
      ...(bodyTypeId && { bodyType: bodyTypeId })  // Add body to filter if provided
    };


    // Find all vehicles where the release date is in the future, with filters
    const upcomingVehicles = await NewVehicle.find(filter).sort({ releaseDate: 1 });

    // If no upcoming vehicles found, send a not found response
    if (upcomingVehicles.length === 0) {
      return res.status(404).json({ message: 'No upcoming vehicles found' });
    }

    // Respond with the list of upcoming vehicles
    return res.status(200).json({ message: 'Upcoming vehicles retrieved successfully', data: upcomingVehicles });

  } catch (error) {
    console.error('Error retrieving upcoming vehicles:', error);
    return res.status(500).json({ message: 'Error retrieving upcoming vehicles' });
  }
});


// API to Get Vehicles by Make
const getVehiclesByMake = asyncHandler(async (req, res) => {
  try {
    const { type, make } = req.query;

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
          slug: 1,
          type: 1,
          views: 1,
          defaultImage: 1,
          createdAt: 1,
          maxPrice: 1,
          minPrice: 1,
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



// const getPopularVehiclesByReviews = asyncHandler(async (req, res) => {
//   try {
//     const popularVehicles = await Review.aggregate([
//       {
//         $group: {
//           _id: '$vehicle',              // Group by vehicle ID
//           reviewCount: { $sum: 1 }      // Count the number of reviews per vehicle
//         }
//       },
//       {
//         $sort: { reviewCount: -1 }      // Sort by review count in descending order
//       },
//       {
//         $limit: 8                       // Limit the results to 8 vehicles
//       },
//       {
//         $lookup: {                       // Join with Vehicle collection to get vehicle details
//           from: 'newvehicles',              // Name of the vehicles collection
//           localField: '_id',             // The field from the reviews collection (vehicle ID)
//           foreignField: 'vehicleId',           // The field from the vehicles collection (vehicle ID)
//           as: 'vehicleDetails'           // The alias for the joined data
//         }
//       },
//       {
//         $unwind: '$vehicleDetails'       // Unwind the vehicle details array
//       },
//       {
//         $project: {
//           _id: 0,                        // Exclude the grouped _id (vehicle ID)
//           vehicle: '$vehicleDetails',    // Include full vehicle details
//           reviewCount: 1                 // Include review count
//         }
//       }
//     ]);

//     if (!popularVehicles.length) {
//       return response.notFound(res, 'No vehicles found');
//     }

//     return response.ok(res, 'Popular vehicles retrieved successfully', popularVehicles);
//   } catch (error) {
//     console.error('Error retrieving popular vehicles by reviews:', error);
//     return response.serverError(res, 'An error occurred while retrieving popular vehicles by reviews');
//   }
// });
const getNewlyLaunchedVehicles = asyncHandler(async (req, res) => {
  try {
    const { type, make, bodyType } = req.query;

    // Get today's date and the date from one month ago
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);

    let bodyTypeId;
    if (bodyType) {
      const body = await BrowesByBody.findOne({
        title: { $regex: new RegExp('^' + bodyType + '$', 'i') }
      });
      bodyTypeId = body?._id?.toString();
    }
    // Build the filter based on query parameters
    const filter = {
      releaseDate: { $gte: oneMonthAgo, $lte: today },  // Release date should be within the last month
      ...(type && { type }),  // Add type to filter if provided
      ...(make && { make }),  // Add make to filter if provided
      ...(bodyTypeId && { bodyType: bodyTypeId })  // Add body to filter if provided
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
          maxPrice: 1,
          minPrice: 1,
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

const getListVehicles = asyncHandler(async (req, res) => {
  const pathSegments = req.params[0].split('/');
  const filters = {};
  const options = {
    limit: parseInt(req.query.limit, 10) || 10,
    sort: {},
  };

  let page = 1;

  let makes = [];
  let models = [];
  let variants = [];
  let bodyTypes = [];

  pathSegments.forEach((segment) => {
    const [key, ...rest] = segment.split('_');
    const value = rest.join('_');

    switch (key) {
      case 't':
        filters.type = value;
        break;
      case 'mk':
        makes.push(value);
        break;
      case 'md':
        models.push(value);
        break;
      case 'vt':
        variants.push(value);
        break;
      case 'featured':
        filters.featured = true;
        break;
      case 'bt':
        bodyTypes.push(value);
        break;
      case 'pr':
        const [minPrice, maxPrice] = value.split('_').map(Number);
        filters.minPrice = { $lte: maxPrice };
        filters.maxPrice = { $gte: minPrice };
        break;
      case 'yr':
        const [minYear, maxYear] = value.split('_').map(Number);
        filters.year = { $gte: minYear, $lte: maxYear };
        break;
      case 'tr':
        filters['transmission.type'] = { $regex: value, $options: 'i' };
        break;
      case 'cl':
        filters['exterior.colorsAvailable'] = { $in: [new RegExp(value, 'i')] };
        break;
      case 'fuel':
        filters['engine.type'] = { $regex: value, $options: 'i' };
        break;
      case 'sb':
        if (value === 'price-asc') {
          options.sort.minPrice = 1;
        } else if (value === 'price-desc') {
          options.sort.minPrice = -1;
        } else if (value === 'year-asc') {
          options.sort.year = 1;
        } else if (value === 'year-desc') {
          options.sort.year = -1;
        } else if (value === 'upcoming') {
          options.sort.releaseDate = 1;
        } else if (value === 'popular') {
          options.sort.views = -1;
        } else {
          options.sort.createdAt = -1;
        }
        break;
      case 'page':
        page = parseInt(rest[0], 10);
        break;
      default:
        break;
    }
  });

  if (makes.length > 0) {
    filters.make = { $in: makes.map((make) => new RegExp(`${make.trim()}`, 'i')) };
  }

  if (models.length > 0) {
    filters.model = { $in: models.map((model) => new RegExp(`${model.trim()}`, 'i')) };
  }

  if (variants.length > 0) {
    filters.variant = { $in: variants.map((variant) => new RegExp(`${variant.trim()}`, 'i')) };
  }

  if (bodyTypes.length > 0) {
    filters.bodyType = {
      $in: bodyTypes.map((bodyType) => new RegExp(`${bodyType.trim()}`, 'i')),
    };
  }

  options.skip = (page - 1) * options.limit;

  const [totalVehicles, vehicles] = await Promise.all([
    NewVehicle.countDocuments(filters),
    NewVehicle.find(filters, null, options).lean(),
  ]);

  const aggregationPipeline = [
    {
      $facet: {
        typeCounts: [
          { $match: filters },
          { $group: { _id: '$type', count: { $sum: 1 } } },
        ],
        makeCounts: [
          { $match: filters },
          { $group: { _id: '$make', count: { $sum: 1 } } },
        ],
        modelCounts: [
          { $match: filters },
          { $group: { _id: '$model', count: { $sum: 1 } } },
        ],
        variantCounts: [
          { $match: filters },
          { $group: { _id: '$variant', count: { $sum: 1 } } },
        ],
        yearCounts: [
          { $match: filters },
          { $group: { _id: '$year', count: { $sum: 1 } } },
        ],
        bodyTypeCounts: [
          { $match: filters },
          { $group: { _id: '$bodyType', count: { $sum: 1 } } },
        ],
        fuelTypeCounts: [
          { $match: filters },
          { $group: { _id: '$engine.type', count: { $sum: 1 } } },
        ],
        transmissionCounts: [
          { $match: filters },
          { $group: { _id: '$transmission.type', count: { $sum: 1 } } },
        ],
        exteriorColorCounts: [
          { $match: filters },
          { $unwind: '$exterior.colorsAvailable' },
          { $group: { _id: '$exterior.colorsAvailable', count: { $sum: 1 } } },
        ],
      },
    },
  ];

  const [aggregationResult] = await NewVehicle.aggregate(aggregationPipeline);

  const counts = {
    typeCounts: aggregationResult.typeCounts || [],
    makeCounts: aggregationResult.makeCounts || [],
    modelCounts: aggregationResult.modelCounts || [],
    variantCounts: aggregationResult.variantCounts || [],
    yearCounts: aggregationResult.yearCounts || [],
    bodyTypeCounts: aggregationResult.bodyTypeCounts || [],
    fuelTypeCounts: aggregationResult.fuelTypeCounts || [],
    transmissionCounts: aggregationResult.transmissionCounts || [],
    exteriorColorCounts: aggregationResult.exteriorColorCounts || [],
  };

  const vehiclesResponse = {
    results: vehicles,
    count: totalVehicles,
    counts,
  };

  return response.ok(res, 'Vehicles retrieved successfully', vehiclesResponse);
});

// get vehicle by id
const getVehicleById = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const vehicle = await NewVehicle.findById(id);
  return response.ok(res, 'Vehicle retrieved successfully', vehicle);
});

 const getVehicleVariants = async (req, res) => {
  try {
    const { slug } = req.params;

    // First, find the reference vehicle by slug
    const referenceVehicle = await NewVehicle.findOne({ slug });

    if (!referenceVehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    // Find all variants matching make, model, and year
    const variants = await NewVehicle.find({
      make: referenceVehicle.make,
      model: referenceVehicle.model,
      year: referenceVehicle.year,
      _id: { $ne: referenceVehicle._id } // Exclude the reference vehicle
    })
    // .select('name make model variant year slug price specifications images defaultImage minPrice maxPrice'); 

    // Group the response
    const response = {
      referenceVehicle: {
        _id: referenceVehicle._id,
        name: referenceVehicle.name,
        make: referenceVehicle.make,
        model: referenceVehicle.model,
        variant: referenceVehicle.variant,
        year: referenceVehicle.year,
        slug: referenceVehicle.slug,
        price: referenceVehicle.price,
        specifications: referenceVehicle.specifications,
        images: referenceVehicle.images,
        defaultImage: referenceVehicle.defaultImage,
        minPrice: referenceVehicle.minPrice,
        maxPrice: referenceVehicle.maxPrice
      },
      variants
    };

    return res.status(200).json({
      success: true,
      data: response,
      message: 'Vehicle and its variants fetched successfully'
    });

  } catch (error) {
    console.error('Error fetching vehicle variants:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export {
  createNewVehicle,
  getListNewVehicles,
  getNewVehicleBySlug,
  updateNewVehicle,
  deleteNewVehicle,
  bulkDeleteVehicles,
  getSimilarNewVehicles,
  getPopularNewVehicles,
  getUpcomingNewVehicles,
  getVehiclesByMake,
  getPopularVehiclesByReviews,
  getNewlyLaunchedVehicles,
  getTopComparisonVehicles,
  getListVehicles,
  getVehicleById,
  getVehicleVariants,
  
};
