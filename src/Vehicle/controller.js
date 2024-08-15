import asyncHandler from 'express-async-handler';
import Vehicle from './model.js'; 
import response from "../Utils/response.js";
import { uploadOnCloudinary } from '../Utils/cloudinary.js';




const createVehicle = asyncHandler(async (req, res) => {
    try {
      const { specifications, features,contactInfo ,seller, ...rest } = req.body;
  
      // Parse JSON fields
      const parsedSpecifications = JSON.parse(specifications);
      const parsedFeatures = JSON.parse(features);
      const parsedContactInfo = JSON.parse(contactInfo);
  
      let uploadedImages = [];
      let defaultImageUrl = null;
        console.log(req.files.images,'>>>>>>>>>>')
      if (req.files) {
        const imageUploadPromises = [];
  
        if (req.files.images) {
          req.files.images.forEach((file) => {
            imageUploadPromises.push(uploadOnCloudinary(file.path));
          });
        }
  
        if (req.files.defaultImage) {
          imageUploadPromises.push(uploadOnCloudinary(req.files.defaultImage[0].path));
        }
  


        
        const uploadResults = await Promise.all(imageUploadPromises);
  
        uploadResults.forEach((uploadResult, index) => {
          if (uploadResult && uploadResult.url) {
            if (index < req.files.images?.length) {
              uploadedImages.push(uploadResult.url);
            } else {
              defaultImageUrl = uploadResult.url;
            }
          } else {
            throw new Error('Error uploading image to Cloudinary');
          }
        });
      }
  
      const vehicleData = {
        ...rest,
        specifications: parsedSpecifications,
        features: parsedFeatures,
        contactInfo: parsedContactInfo,
        images: uploadedImages,
        defaultImage: defaultImageUrl || rest.defaultImage,
      };
  
      const vehicle = new Vehicle(vehicleData);
      await vehicle.save();
      response.ok(res, "Vehicle Created Successfully",vehicle);
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
      console.log('Retrieved vehicles:', vehicles);
      return response.ok(res, 'Vehicles retrieved successfully', vehicles);
    } catch (error) {
      return response.error(res, 'Error retrieving vehicles', error);
    }
  });
  

 
 

  const getListVehicles = asyncHandler(async (req, res) => {
    const pathSegments = req.params[0].split('/'); // Split the dynamic path into segments
    const filters = {};
  
    pathSegments.forEach(segment => {
      const [key, value] = segment.split('_'); // Split each segment by the underscore
      switch (key) {
        case 'mk':
          filters.make = value;
          break;
        case 'ct':
          // For multiple cities, use an array
          if (filters.city) {
            filters.city.$in.push(value);
          } else {
            filters.city = { $in: [value] };
          }
          break;
        case 'ca':
          filters.cityArea = value;
          break;
        // Add more cases as needed
        default:
          break;
      }
    });
  
    const options = {
      limit: parseInt(req.query.limit, 10) || 10,
      skip: (parseInt(req.query.page, 10) - 1) * (parseInt(req.query.limit, 10) || 10),
      sort: {}
    };
  
    // Handle sorting logic if needed
    const sort = req.query.sort;
    if (sort === 'priceAsc') {
      options.sort.price = 1;
    } else if (sort === 'priceDesc') {
      options.sort.price = -1;
    } else {
      options.sort.createdAt = -1;
    }
  
    const [totalVehicles, vehicles] = await Promise.all([
      Vehicle.countDocuments(filters),
      Vehicle.find(filters, null, options).lean()
    ]);
  
    // Aggregation pipeline to get counts for each filter type
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
  
    const vehiclesResponse = {
      results: vehicles,
      count: totalVehicles,
      counts
    };
  
    return response.ok(res, 'Vehicles retrieved successfully', vehiclesResponse);
  });
  
  export default getListVehicles;
  

export {createVehicle, getBrowseByVehicles, getListVehicles}