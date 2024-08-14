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
    const {
      type,
      city,
      make,
      model,
      year,
      minYear,
      maxYear,
      cityArea,
      registeredIn,
      priceMin,
      priceMax,
      bodyType,
      fuelType,
      transmission,
      exteriorColor,
      drive,
      mileageMin,
      mileageMax,
      search = '',
      page = 1,
      limit = 10,
      sort
    } = req.query;
  
    const filters = {};
  
    if (type) filters.type = type;
    if (city) filters.city = city;
    if (make) filters.make = new RegExp(make, 'i');
    if (model) filters.model = new RegExp(model, 'i');
    if (year) filters.year = year;
    if (minYear || maxYear) {
      filters.year = {};
      if (minYear) filters.year.$gte = parseInt(minYear, 10);
      if (maxYear) filters.year.$lte = parseInt(maxYear, 10);
    }
    if (cityArea) filters.cityArea = cityArea;
    if (registeredIn) filters.registeredIn = registeredIn;
    if (priceMin || priceMax) {
      filters.price = {};
      if (priceMin) filters.price.$gte = priceMin;
      if (priceMax) filters.price.$lte = priceMax;
    }
    if (bodyType) filters['specifications.bodyType'] = bodyType;
    if (fuelType) filters['specifications.fuelType'] = fuelType;
    if (transmission) filters['specifications.transmission'] = transmission;
    if (exteriorColor) filters['specifications.exteriorColor'] = exteriorColor;
    if (drive) filters['specifications.drive'] = drive;
    if (mileageMin || mileageMax) {
      filters['specifications.mileage'] = {};
      if (mileageMin) filters['specifications.mileage'].$gte = mileageMin;
      if (mileageMax) filters['specifications.mileage'].$lte = mileageMax;
    }
  
    if (search) {
      filters.$or = [
        { carInfo: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { make: new RegExp(search, 'i') },
        { model: new RegExp(search, 'i') },
        { 'specifications.bodyType': new RegExp(search, 'i') },
        { 'specifications.fuelType': new RegExp(search, 'i') },
        { 'specifications.transmission': new RegExp(search, 'i') },
        { city: new RegExp(search, 'i') },
        { cityArea: new RegExp(search, 'i') }
      ];
    }
  
    const options = {
      skip: (page - 1) * limit,
      limit: parseInt(limit, 10),
      sort: {}
    };
  
    if (sort === 'priceAsc') {
      options.sort.price = 1;
    } else if (sort === 'priceDesc') {
      options.sort.price = -1;
    } else {
      options.sort.createdAt = -1;
    }
  
    // Get the list of vehicles with pagination and sorting
    const [totalVehicles, vehicles] = await Promise.all([
      Vehicle.countDocuments(filters),
      Vehicle.find(filters, null, options).lean()
    ]);
  
    // Aggregation to get counts for each field
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
      type: aggregationResult.typeCounts || [],
      city: aggregationResult.cityCounts || [],
      make: aggregationResult.makeCounts || [],
      model: aggregationResult.modelCounts || [],
      year: aggregationResult.yearCounts || [],
      bodyType: aggregationResult.bodyTypeCounts || [],
      fuelType: aggregationResult.fuelTypeCounts || [],
      transmission: aggregationResult.transmissionCounts || [],
      exteriorColor: aggregationResult.exteriorColorCounts || [],
      drive: aggregationResult.driveCounts || [],
      cityArea: aggregationResult.cityAreaCounts || []
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