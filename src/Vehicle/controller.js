import asyncHandler from 'express-async-handler';
import Vehicle from './model.js';
import response from "../Utils/response.js";
import { uploadOnCloudinary } from '../Utils/cloudinary.js';
import Review from '../Review/model.js';

const createVehicle = asyncHandler(async (req, res) => {
  try {
    console.log('>>>>>>>-2',req.body)
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    response.ok(res, "Vehicle Created Successfully", vehicle);
  } catch (error) {
    console.error(error);
  }
});

//   const getBrowseByVehicles = asyncHandler(async (req, res) => {
//     try {
//       const bikes = await Vehicle.find({ type: 'bike' }).limit(8);
//       const trucks = await Vehicle.find({ type: 'truck' }).limit(8);
//       const cars = await Vehicle.find({ type: 'car' }).limit(8);
//       const vehicles = [...bikes, ...trucks, ...cars];
//       console.log('>>>>>>>>>. ', vehicles)
//       return response.ok(res, 'Vehicles retrieved successfully', vehicles);
//     } catch (error) {
//       return response.error(res, 'Error retrieving vehicles', error);
//     }
//   });

const getBrowseByVehicles = asyncHandler(async (req, res) => {
  try {
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
        { $sample: { size: 8 } }
      ]);
    }
    return response.ok(res, 'Vehicles retrieved successfully', vehicles);
  } catch (error) {
    return response.error(res, 'Error retrieving vehicles', error);
  }
});

const getListVehicles = asyncHandler(async (req, res) => {
  const pathSegments = req.params[0].split('/'); 
  const features = [];
  console.log('>>>>>>>>>111',pathSegments)
  const filters = {};
  const options = {
    limit: parseInt(req.query.limit, 10) || 10,
    sort: {}
  };

  let page = 1;

  let cities = [];
  let makes = [];
  let models = [];
  let bodyTypes = [];
  pathSegments.forEach(segment => {
    const [key, ...rest] = segment.split('_');
    const value = rest.join('_'); 
    console.log('>>>>>',value)
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
        }
        else if (value === 'upcoming') {
          options.sort.releaseDate = 1;
        }
        else if (value === 'popular') {
          options.sort.views = -1;
        }
        else {
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
if (filters.condition && filters.condition.$regex && filters.condition.$regex === 'new' && options.sort.releaseDate) {
  filters.releaseDate = { $gte: new Date() };
}

  if (cities.length > 0) {
    filters.city = { $in: cities.map(city => new RegExp(`${city.trim()}`, 'i')) };
  }
  
  if (makes.length > 0) {
    filters.make = { $in: makes.map(make => new RegExp(`${make.trim()}`, 'i')) };
  }
  
  if (models.length > 0) {
    filters.model = { $in: models.map(model => new RegExp(`${model.trim()}`, 'i')) };
  }
  
  if (bodyTypes.length > 0) {
    filters['specifications.bodyType'] = { $in: bodyTypes.map(bodyType => new RegExp(`${bodyType.trim()}`, 'i')) };
  }
  console.log('pathSegments>>',pathSegments)
  if (pathSegments.includes('ft_featured')) {
    filters.featured = true;
    }
  
  options.skip = (page - 1) * options.limit;

  const [totalVehicles, vehicles] = await Promise.all([
    Vehicle.countDocuments(filters),
    Vehicle.find(filters, null, options).lean()
  ]);

  const aggregationPipeline = [
    { $match: filters },
    {
      $facet: {
        typeCounts: [{ $group: { _id: '$type', count: { $sum: 1 } } }],
        cityCounts: [{ $group: { _id: '$city', count: { $sum: 1 } } }],
        makeCounts: [{ $group: { _id: '$make', count: { $sum: 1 } } }],
        modelCounts: [{ $group: { _id: '$model', count: { $sum: 1 } } }],
        yearCounts: [{ $group: { _id: '$year', count: { $sum: 1 } } }],
        bodyTypeCounts: [{ $group: { _id: '$specifications.bodyType', count: { $sum: 1 } } }],
        fuelTypeCounts: [{ $group: { _id: '$specifications.fuelType', count: { $sum: 1 } } }],
        transmissionCounts: [{ $group: { _id: '$specifications.transmission', count: { $sum: 1 } } }],
        exteriorColorCounts: [{ $group: { _id: '$specifications.exteriorColor', count: { $sum: 1 } } }],
        driveCounts: [{ $group: { _id: '$specifications.drive', count: { $sum: 1 } } }],
        cityAreaCounts: [{ $group: { _id: '$cityArea', count: { $sum: 1 } } }]
      }
    }
  ];

  const [aggregationResult] = await Vehicle.aggregate(aggregationPipeline);

  const counts = {
    typeCounts: aggregationResult.typeCounts || [],
    cityCounts: aggregationResult.cityCounts || [],
    makeCounts: aggregationResult.makeCounts || [],
    modelCounts: aggregationResult.modelCounts || [],
    yearCounts: aggregationResult.yearCounts || [],
    bodyTypeCounts: aggregationResult.bodyTypeCounts || [],
    fuelTypeCounts: aggregationResult.fuelTypeCounts || [],
    transmissionCounts: aggregationResult.transmissionCounts || [],
    exteriorColorCounts: aggregationResult.exteriorColorCounts || [],
    driveCounts: aggregationResult.driveCounts || [],
    cityAreaCounts: aggregationResult.cityAreaCounts || []
  };
console.log("vehicles>>>>>",vehicles)
  const vehiclesResponse = {
    results: vehicles,
    count: totalVehicles,
    counts
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
      { new: true }            // Return the updated document
    );

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
   const {type}= req.query
    const popularVehicles = await Vehicle.find({type:type})
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



export { createVehicle, getBrowseByVehicles, getListVehicles, getVehicleBySlug, getSimilarVehicles, getPopularVehicles, getPopularVehiclesByReviews }