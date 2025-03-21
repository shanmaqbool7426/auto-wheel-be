import asyncHandler from 'express-async-handler';
import Vehicle from './model.js';
import response from "../Utils/response.js";
import Review from '../Review/model.js';
import User from '../User/model.js';
import mongoose, { mongo } from 'mongoose';
import cron from 'node-cron';

const createVehicle = asyncHandler(async (req, res) => {
  try {
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    const user = await User.findById(req.body?.seller);
    if (!user) {
      return response.notFound(res, 'User not found');
    }
    user.adsCount = (user.adsCount || 0) + 1;
    await user.save();
    response.ok(res, "Vehicle Created Successfully", vehicle);
  } catch (error) {
    console.error('Error creating vehicle:', error);
    response.internalServerError(res, 'Failed to create vehicle');
  }
});

const updateVehicle = asyncHandler(async (req, res) => {
  try {
    const { vehicleId } = req.params;
    
    // First check if vehicle exists and belongs to the authenticated user
    const existingVehicle = await Vehicle.findOne({ 
      _id: vehicleId,
      seller: req.user._id 
    });

    if (!existingVehicle) {
      return response.notFound(res, 'Vehicle not found or you are not authorized to update it');
    }

    // Update the vehicle with new data
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      vehicleId,
      { 
        $set: req.body 
      },
      { 
        new: true,      // Return the updated document
        runValidators: true  // Run model validators
      }
    );

    response.ok(res, "Vehicle Updated Successfully", updatedVehicle);
  } catch (error) {
    console.error('Error updating vehicle:', error);
    response.internalServerError(res, 'Failed to update vehicle');
  }
});

//  update vehicle status
const updateVehicleStatus = asyncHandler(async (req, res) => {
  //not soft deleted
  const { vehicleId } = req.params;
  try { 
    const { status } = req.body;
    const vehicle = await Vehicle.findByIdAndUpdate(vehicleId, { status }, { new: true });
    response.ok(res, 'Vehicle status updated successfully', vehicle);
  } catch (error) {
    console.error('Error updating vehicle status:', error);
    response.serverError(res, 'An error occurred while updating the vehicle status');
  }
});

const getBrowseByVehicles = asyncHandler(async (req, res) => {
  try {
    // not include deleted vehicles 
    const { type } = req.query;
    let vehicles;
    if (type) {
      vehicles = await Vehicle.find({ type }).limit(8);
    } else {
      vehicles = await Vehicle.aggregate([
        { $match: { type: { $in: ['car', 'bike', 'truck'] } } },
        { $sample: { size: 24 } },
        { $group: { _id: '$type', vehicles: { $push: '$$ROOT' } } },
        { $project: { vehicles: { $slice: ['$vehicles', 8] } } },
        { $unwind: '$vehicles' },
        { $replaceRoot: { newRoot: '$vehicles' } },
        { $sample: { size: 8 } },
        { $match: { status: { $ne: 'deleted' } } }
      ]);
    }
    return response.ok(res, 'Vehicles retrieved successfully', vehicles);
  } catch (error) {
    return response.error(res, 'Error retrieving vehicles', error);
  }
});

const getListVehicles = asyncHandler(async (req, res) => {
  // not include deleted vehicles 
  const pathSegments = req.params[0].split('/');
  const features = [];
  const filters = {};
  const options = {
    limit: parseInt(req.query.limit, 10) || 10,
    sort: {},
  };

  let page = 1;

  let cities = [];
  let makes = [];
  let variants = [];
  let models = [];
  let bodyTypes = [];
  pathSegments.forEach((segment) => {
    const [key, ...rest] = segment.split('_');
    const value = rest.join('_');
    console.log('>>>>>', value);
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
      case 'ct':
        cities.push(value);
        break;
      case 'ft':
        if (value === 'featured') {
          features.push('featured'); // Add 'featured' to features filter
        }
        break;
      case 'bt':
        bodyTypes.push(value);
        break;
      case 'ad':
        filters.address = { $regex: value, $options: 'i' };
        break;
      case 'ca':
        filters.cityArea = { $regex: value, $options: 'i' };
        break;
      case 'pr':
        const [minPrice, maxPrice] = value.split('_').map(Number);
        filters.price = { $gte: minPrice, $lte: maxPrice };
        break;
      case 'yr':
        const [minYear, maxYear] = value.split('_').map(Number);
        filters.year = { $gte: minYear, $lte: maxYear };
        break;
      case 'ml':
        const [minMileage, maxMileage] = value.split('_').map(Number);
        filters['specifications.mileage'] = { $gte: minMileage, $lte: maxMileage };
        break;
      case 'tr':
        filters['specifications.transmission'] = { $regex: value, $options: 'i' };
        break;
      case 'cl':
        filters['specifications.exteriorColor'] = { $regex: value, $options: 'i' };
        break;
      case 'ft':
        filters['specifications.fuelType'] = { $regex: value, $options: 'i' };
        break;
      case 'cn':
        filters.condition = { $regex: value, $options: 'i' };
        break;
      case 'sb':
        if (value === 'price-asc') {
          options.sort.price = 1;
        } else if (value === 'price-desc') {
          options.sort.price = -1;
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
  if (
    filters.condition &&
    filters.condition.$regex &&
    filters.condition.$regex === 'new' &&
    options.sort.releaseDate
  ) {
    filters.releaseDate = { $gte: new Date() };
  }

  if (cities.length > 0) {
    filters.city = { $in: cities.map((city) => new RegExp(`${city.trim()}`, 'i')) };
  }

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
    filters['specifications.bodyType'] = {
      $in: bodyTypes.map((bodyType) => new RegExp(`${bodyType.trim()}`, 'i')),
    };
  }
  console.log('pathSegments>>', pathSegments);
  if (pathSegments.includes('ft_featured')) {
    const now = new Date();
    filters.isFeatured = true;
    filters.featureEndDate = { $gt: now }; 
  }
  filters.status = { $ne: 'deleted' };

  options.skip = (page - 1) * options.limit;

  // Create a copy of filters without any filters for cityCounts
  const cityCountsFilters = {}; // Empty filters to include all documents

  // Modify the options.sort to include isFeatured sorting first
  // Keep existing sort criteria as secondary sorting
  const existingSort = {...options.sort};
  options.sort = {
    isFeatured: -1, // Sort featured items first (-1 means descending, so true comes before false)
    ...existingSort  // Keep any existing sort criteria as secondary sort
  };

  const [totalVehicles, vehicles] = await Promise.all([
    Vehicle.countDocuments(filters),
    Vehicle.find(filters, null, options)
      .sort(options.sort)  // Apply the sort
      .skip(options.skip)
      .limit(options.limit)
      .lean(),
  ]);

  const aggregationPipeline = [
    {
      $facet: {
        typeCounts: [
          { $match: filters },
          { $group: { _id: '$type', count: { $sum: 1 } } },
        ],
        cityCounts: [
          { $match: cityCountsFilters }, // Use empty filters to include all documents
          { $group: { _id: '$city', count: { $sum: 1 } } },
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
        conditionCounts: [
          { 
            $match: filters 
          },
          { 
            $group: { 
              _id: '$condition',
              count: { $sum: 1 } 
            } 
          },
          {
            $match: {
              _id: { $ne: null }
            }
          }
        ],
        bodyTypeCounts: [
          { $match: filters },
          { $group: { _id: '$specifications.bodyType', count: { $sum: 1 } } },
        ],
        fuelTypeCounts: [
          { $match: filters },
          { $group: { _id: '$specifications.fuelType', count: { $sum: 1 } } },
        ],
        transmissionCounts: [
          { $match: filters },
          { $group: { _id: '$specifications.transmission', count: { $sum: 1 } } },
        ],
        exteriorColorCounts: [
          { $match: filters },
          { $group: { _id: '$specifications.exteriorColor', count: { $sum: 1 } } },
        ],
        driveCounts: [
          { $match: filters },
          { $group: { _id: '$specifications.drive', count: { $sum: 1 } } },
        ],
        cityAreaCounts: [
          { $match: filters },
          { $group: { _id: '$cityArea', count: { $sum: 1 } } },
        ],
      },
    },
  ];

  const [aggregationResult] = await Vehicle.aggregate(aggregationPipeline);

  const counts = {
    typeCounts: aggregationResult.typeCounts || [],
    conditionCounts: aggregationResult.conditionCounts || [],
    cityCounts: aggregationResult.cityCounts || [],
    makeCounts: aggregationResult.makeCounts || [],
    modelCounts: aggregationResult.modelCounts || [],
    variantCounts: aggregationResult.variantCounts || [],
    yearCounts: aggregationResult.yearCounts || [],
    bodyTypeCounts: aggregationResult.bodyTypeCounts || [],
    fuelTypeCounts: aggregationResult.fuelTypeCounts || [],
    transmissionCounts: aggregationResult.transmissionCounts || [],
    exteriorColorCounts: aggregationResult.exteriorColorCounts || [],
    driveCounts: aggregationResult.driveCounts || [],
    cityAreaCounts: aggregationResult.cityAreaCounts || [],
  };

  const vehiclesResponse = {
    results: vehicles,
    count: totalVehicles,
    counts,
  };

  return response.ok(res, 'Vehicles retrieved successfully', vehiclesResponse);
});

export default getListVehicles;

const getVehicleBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  console.log('slug:', slug);

  try {
    // Find the vehicle by slug and increment the views count
    const vehicleDetail = await Vehicle.findOneAndUpdate(
      { slug },
      { $inc: { views: 1 } },  // Increment the views count by 1
      { new: true, timestamps: false }            // Return the updated document
    ).populate({
      path: 'seller',          // This should match the field name in Vehicle model
      model: 'User',           // Explicitly specify the model to populate from
      select: '-password -loginType -isVerified -isActive -createdAt -updatedAt' // Exclude sensitive fields
    });;

    if (!vehicleDetail) {
      return response.notFound(res, 'Vehicle not found');
    }

    return response.ok(res, 'Vehicle detail retrieved successfully', vehicleDetail);
  } catch (error) {
    console.error('Error retrieving vehicle detail:', error);
    return response.serverError(res, 'An error occurred while retrieving vehicle details');
  }
});

const getVehicleFromSeller = asyncHandler(async (req, res) => {
  const { vehicleId } = req.params;
  try {
    // Find the vehicle by vehicleId and seller
    const vehicleDetail = await Vehicle.findOne({ 
      _id:vehicleId,
      seller: req.user._id 
    }).populate({
      path: 'seller',          
      model: 'User',           
      select: '-password -loginType -isVerified -isActive -createdAt -updatedAt'
    });

    if (!vehicleDetail) {
      return response.notFound(res, 'Vehicle not found');
    }


    return response.ok(res, 'Vehicle detail retrieved successfully', vehicleDetail);
  } catch (error) {
    console.error('Error retrieving vehicle detail:', error);
    return response.serverError(res, 'An error occurred while retrieving vehicle details');
  }
});


const getSimilarVehicles = asyncHandler(async (req, res) => {
  try {
    const { vehicleId } = req.params;

    const currentVehicle = await Vehicle.findById(vehicleId);
    if (!currentVehicle) {
      return response.badRequest(res, "Vehicle not found");
    }

    const similarVehicles = await Vehicle.find({
      $and: [
        { _id: { $ne: currentVehicle._id } },
        {
          $or: [
            {type: currentVehicle.type},
            { make: currentVehicle.make, model: currentVehicle.model },
            { make: currentVehicle.make },
          ],
        },
      ],
    })
      .limit(10)
      .lean();

    response.ok(res, "Similar vehicles fetched successfully", similarVehicles);
  } catch (error) {
    console.error("Error fetching similar vehicles:", error);
    response.serverError(res, "An error occurred while fetching similar vehicles");
  }
});

const getPopularVehicles = asyncHandler(async (req, res) => {
  try {
    const { type } = req.query
    const popularVehicles = await Vehicle.find({ type: type })
      .sort({ views: -1 })
      .limit(8);

    if (popularVehicles.length === 0) {
      return response.notFound(res, 'No vehicles found');
    }

    return response.ok(res, 'Popular vehicles retrieved successfully', popularVehicles);
  } catch (error) {
    console.error('Error retrieving popular vehicles:', error);
    return response.serverError(res, 'An error occurred while retrieving popular vehicles');
  }
});


const getPopularVehiclesByReviews = asyncHandler(async (req, res) => {
  try {
    // not include deleted vehicles 
    const popularVehicles = await Review.aggregate([
      {
        $match: { status: { $ne: 'deleted' } },
      },
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
          from: 'vehicles',              // Name of the vehicles collection
          localField: '_id',             // The field from the reviews collection (vehicle ID)
          foreignField: '_id',           // The field from the vehicles collection (vehicle ID)
          as: 'vehicleDetails'           // The alias for the joined data
        }
      },
      {
        $unwind: '$vehicleDetails'       // Unwind the vehicle details array
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
      return response.notFound(res, 'No vehicles found');
    }

    return response.ok(res, 'Popular vehicles retrieved successfully', popularVehicles);
  } catch (error) {
    console.error('Error retrieving popular vehicles by reviews:', error);
    return response.serverError(res, 'An error occurred while retrieving popular vehicles by reviews');
  }
});

const getVehiclesByUserId = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const { search, type, status, sort, page = 1, limit = 10 } = req.query;

    const query = { seller: userId, status: { $ne: "deleted" } };  // Exclude deleted vehicles by default

    // If status is explicitly provided in the query, add it as an additional condition
    if (status) {
      console.log("status>>>>>>>", status.toLowerCase());
      // Instead of replacing the status condition, use $in to match the provided status
      // while still excluding "deleted" status
      query.status = { 
        $in: [status.toLowerCase()], 
        $ne: "deleted" 
      };
    }

    // Add search filter if provided
    if (search) {
      // Trim the search term to remove leading/trailing spaces
      const trimmedSearch = search.trim();
      
      if (trimmedSearch) {
        // Split the search term into words
        const searchWords = trimmedSearch.split(/\s+/);
        
        // Create a more flexible search pattern
        // This will match documents where any field contains all the search words
        const searchConditions = [];
        
        // For each search word, create conditions to match in any field
        searchWords.forEach(word => {
          if (word) {
            searchConditions.push({
              $or: [
                { make: { $regex: word, $options: 'i' } },
                { model: { $regex: word, $options: 'i' } },
                { 'Info.make': { $regex: word, $options: 'i' } },
                { 'Info.model': { $regex: word, $options: 'i' } },
                { 'Info.variant': { $regex: word, $options: 'i' } }
              ]
            });
          }
        });
        
        // Add the search conditions to the query
        if (searchConditions.length > 0) {
          query.$and = searchConditions;
        }
      }
    }

    // Add type filter if provided
    if (type) {
      query.type = type;
    }

    // Set up sorting
    let sortOption = { createdAt: -1 }; // Default sort
    if (sort === 'newToOld') {
      sortOption = { createdAt: -1 };
    } else if (sort === 'oldToNew') {
      sortOption = { createdAt: 1 };
    }

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    const vehicles = await Vehicle.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit, 10));

    const totalVehicles = await Vehicle.countDocuments(query);

    const result = {
      vehicles,
      currentPage: parseInt(page, 10),
      totalPages: Math.ceil(totalVehicles / parseInt(limit, 10)),
      totalVehicles
    };

    return response.ok(res, 'Vehicles retrieved successfully', result);
  } catch (error) {
    console.error('Error retrieving vehicles by user ID:', error);
    return response.serverError(res, 'An error occurred while retrieving vehicles');
  }
});



const getFavoriteVehiclesByUserId = asyncHandler(async (req, res) => {
  // not include deleted vehicles 
  const { userId } = req.params;
  const { search, sort } = req.query; // Get search and sort from query parameters

  try {
    const user = await User.findById(userId).populate('favoriteVehicles');
    if (!user) {
      return response.notFound(res, 'User not found');
    }

    let favoriteVehicles = user.favoriteVehicles;

    // Filter by vehicle ID if search parameter is provided
    if (search) {
      favoriteVehicles = favoriteVehicles.filter(vehicle => {
        // Convert the vehicle ID to string and check if it includes the search term
        return vehicle._id.toString().includes(search)
      });
    }

    // Sort the vehicles based on the sort parameter
    if (sort) {
      favoriteVehicles.sort((a, b) => {
        if (sort === 'newToOld') {
          return new Date(b.createdAt) - new Date(a.createdAt);
        } else if (sort === 'oldToNew') {
          return new Date(a.createdAt) - new Date(b.createdAt);
        }
        return 0; // No sorting if sort parameter is not recognized
      });
    }

    return response.ok(res, 'Favorite vehicles retrieved successfully', favoriteVehicles);
  } catch (error) {
    console.error('Error retrieving favorite vehicles:', error);
    // return response.serverError(res, 'An error occurred while retrieving favorite vehicles');
  }
});


const toggleFavoriteVehicle = asyncHandler(async (req, res) => {
  try {
    const { userId, vehicleId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return response.notFound(res, 'User not found');
    }

    const isFavorite = user.favoriteVehicles.includes(vehicleId);
    
    if (isFavorite) {
      // Remove from favorites
      user.favoriteVehicles = user.favoriteVehicles.filter(id => id.toString() !== vehicleId);
    } else {
      // Add to favorites
      user.favoriteVehicles.push(vehicleId);
    }

    await user.save();

    return response.ok(res, 
      isFavorite ? 'Vehicle removed from favorites' : 'Vehicle added to favorites',
      { isFavorite: !isFavorite,favoriteVehicles: user.favoriteVehicles }
    );
  } catch (error) {
    console.error('Error toggling favorite status:', error);
    return response.serverError(res, 'An error occurred while updating favorites');
  }
});


const deleteVehicle = asyncHandler(async (req, res) => {
  try {
    // soft delete
    const { vehicleId } = req.params;
   const id= new mongoose.Types.ObjectId(vehicleId)
    const vehicle = await Vehicle.updateOne({_id:id}, { $set: { status: 'deleted' } });
    if (!vehicle) {
      return response.notFound(res, 'Vehicle not found');
    }

    return response.ok(res, 'Vehicle deleted successfully',  vehicle);
  } catch (error) {
    console.error('Error deleting vehiclewww:', error);
    return response.serverError(res, 'An error occurred while deleting the vehicle: ' + error.message);
  }
});


const toggleFeaturedVehicle = asyncHandler(async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const { duration } = req.body; // Duration in days

    // Find the vehicle first to get the seller ID
    const vehicle = await Vehicle.findById(vehicleId);
    
    if (!vehicle) {
      return response.notFound(res, 'Vehicle not found');
    }
    
    const now = new Date();
    const endDate = new Date(now);
    endDate.setDate(endDate.getDate() + parseInt(duration));

    // Update the vehicle to featured status
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      vehicleId,
      {
        isFeatured: true,
        featureStartDate: now,
        featureDuration: duration,
        featureEndDate: endDate
      },
      { new: true, runValidators: true }
    );
    
    // Update the user's counts
    const user = await User.findById(vehicle.seller);
    if (user) {
      user.featureAddsCount = (user.featureAddsCount || 0) + 1;
      user.adsCount = Math.max(0, (user.adsCount || 0) - 1); // Ensure adsCount doesn't go below 0
      await user.save();
    }

    return response.ok(res, 'Vehicle featured successfully', updatedVehicle);
  } catch (error) {
    console.error('Error toggling featured status:', error);
    return response.serverError(res, 'An error occurred while updating the vehicle: ' + error.message);
  }
});

// Add a new function to check and update expired featured listings
const updateExpiredFeaturedListings = asyncHandler(async () => {
  try {
    
    const now = new Date();
    await Vehicle.updateMany(
      {
        isFeatured: true,
        featureEndDate: { $lte: now }
      },
      {
        $set: {
          isFeatured: false,
          featureStartDate: null,
          featureDuration: null,
          featureEndDate: null
        }
      }
    );
  } catch (error) {
    console.error('Error updating expired featured listings:', error);
  }
});


// list vehicles for admin
const getVehiclesForAdmin = asyncHandler(async (req, res) => {
  try {
    const { type, search, page = 1, limit = 8, status } = req.query;
    const skip = (page - 1) * parseInt(limit);

    // Base query
    const baseQuery = {};

    // Add type filter if provided
    if (type) {
      baseQuery.type = type;
    } else {
      baseQuery.type = { $in: ['car', 'bike', 'truck'] };
    }

    if (status) {
      baseQuery.status = status;
    }

    // Add search filter if provided
    if (search) {
      baseQuery.$or = [
        { 'Info.make': { $regex: search, $options: 'i' } },
        { 'Info.model': { $regex: search, $options: 'i' } },
        { 'Info.variant': { $regex: search, $options: 'i' } },
        { 'city': { $regex: search, $options: 'i' } }
      ];
    }

    // Execute queries in parallel
    const [totalVehicles, vehicles] = await Promise.all([
      Vehicle.countDocuments(baseQuery),
      Vehicle.find(baseQuery)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .select('make model variant type price city status year images Info') // Select only needed fields
        .lean() // Convert to plain JavaScript objects
    ]);

    const totalPages = Math.ceil(totalVehicles / limit);

    return response.ok(res, 'Vehicles retrieved successfully', {
      vehicles,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalVehicles,
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Error in getVehiclesForAdmin:', error);
    return response.error(res, 'Error retrieving vehicles', error);
  }
});

// delete bulk vehicles soft delete
const deleteBulkVehicles = asyncHandler(async (req, res) => {
  try {
    const { ids } = req.body; // Expect an array of vehicle IDs
    console.log("ids>>>>>>>>", ids);
    const vehicles = await Vehicle.updateMany({ _id: { $in: ids } }, { $set: { status: 'deleted' } });
    return response.ok(res, 'Vehicles deleted successfully', vehicles);
  } catch (error) {
    console.error('Error deleting vehicles:', error);
    return response.serverError(res, 'An error occurred while deleting the vehicles: ' + error.message);
  }
});

// You can set up a cron job or scheduled task to run this function periodically
// For example, using node-cron:

// Run every day at midnight
cron.schedule('0 0 * * *', () => {
  updateExpiredFeaturedListings();
});


const getOverviewStats = asyncHandler(async (req, res) => {
  console.log(">>>>>..",req.user)
const userId=req.user._id
  const { month, year } = req.query;
  try {
    // Get start and end date for the selected month
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    // Get all vehicles stats for this user within the date range
    const stats = await Vehicle.aggregate([
      {
        $match: {
          seller: userId,
          // createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $facet: {
          // Total page views
          totalViews: [
            {
              $group: {
                _id: null,
                total: { $sum: "$views" }
              }
            }
          ],
          // // Count of vehicles with no views
          noViews: [
            {
              $match: { views: 0 }
            },
            {
              $count: "count"
            }
          ],
          // Count by status
          statusCounts: [
            {
              $group: {
                _id: "$status",
                count: { $sum: 1 }
              }
            }
          ]
        }
      }
    ]);
    // Process the aggregation results
    const totalViews = stats[0].totalViews[0]?.total || 0;
    const noViews = stats[0].noViews[0]?.count || 0;
    
    // Convert status counts array to object
    const statusCounts = stats[0].statusCounts.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {
      active: 0,
      pending: 0,
      inactive: 0
    });

    const overview = {
      pageViews: totalViews,
      clicks: totalViews, // Using views as clicks
      noViews: totalViews,
      activeAds: statusCounts.active || 0,
      pendingAds: statusCounts.pending || 0,
      inactiveAds: statusCounts.inactive || 0
    };

    return response.ok(res, 'Overview statistics retrieved successfully', overview);

  } catch (error) {
    console.error('Error getting overview stats:', error);
    return response.serverError(res, 'Error retrieving overview statistics');
  }
});

const getTopPerformingPostsBySeller = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    
    // Get the seller ID from the authenticated user
    const userId=req.user._id;

    const posts = await Vehicle.find(
      { 
        seller: userId,
        // status: 'active' 
      },
      {
        _id:1,
        make: 1,
        slug:1,
        model: 1,
        year: 1,
        views: 1,
        defaultImage: 1,
        createdAt: 1,
        status:1
      }
    )
    .sort({ views: -1 }) // Sort by views in descending order
    .skip(skip)
    .limit(parseInt(limit));

    const total = await Vehicle.countDocuments({ 
      seller: userId,
      // status: 'active' 
    });

    // Format the response data
    const formattedPosts = posts.map(post => ({
      id:post._id,
      slug:post.slug,
      post: `${post.make} ${post.model} ${post.year}`,
      created: post.createdAt,
      views: post.views,
      clicks: post.views
    }));

    return res.status(200).json({
      success: true,
      data: {
        posts: formattedPosts,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / limit),
          count:total,
          limit: parseInt(limit)
        }
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching top performing posts',
      error: error.message
    });
  }
};
export {updateVehicle,getVehicleFromSeller,getTopPerformingPostsBySeller,getOverviewStats,deleteBulkVehicles,getVehiclesForAdmin,updateVehicleStatus, createVehicle,getVehiclesByUserId,toggleFavoriteVehicle,toggleFeaturedVehicle,getFavoriteVehiclesByUserId, getBrowseByVehicles,deleteVehicle, getListVehicles, getVehicleBySlug, getSimilarVehicles, getPopularVehicles, getPopularVehiclesByReviews }