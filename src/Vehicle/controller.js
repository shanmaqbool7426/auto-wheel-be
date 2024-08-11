import asyncHandler from 'express-async-handler';
import Vehicle from './model.js'; 
import response from "../Utils/response.js";
import { uploadOnCloudinary } from '../Utils/cloudinary.js';




const createVehicle = asyncHandler(async (req, res) => {
    try {
      const { specifications, features, seller, ...rest } = req.body;
  
      // Parse JSON fields
      const parsedSpecifications = JSON.parse(specifications);
      const parsedFeatures = JSON.parse(features);
      const parsedSeller = JSON.parse(seller);
  
      let uploadedImages = [];
      let defaultImageUrl = null;
        console.log()
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
        seller: parsedSeller,
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
        make,
        model,
        yearMin,
        yearMax,
        priceMin,
        priceMax,
        bodyType,
        fuelType,
        transmission,
        mileageMin,
        mileageMax,
        city,
        search = '',
        page = 1,
        limit = 10,
        sort
    } = req.query;

    const filters = {};

    if (type) filters.type = type;
    if (make) filters.make = new RegExp(make, 'i');
    if (model) filters.model = new RegExp(model, 'i');
    if (priceMin) filters.year = { $gte: yearMin };
    if (priceMax) filters.year = { ...filters.year, $lte: yearMax };
    if (priceMin) filters.price = { $gte: priceMin };
    if (priceMax) filters.price = { ...filters.price, $lte: priceMax };
    if (bodyType) filters['specifications.bodyType'] = bodyType;
    if (city) filters['seller.location'] = city;
    if (fuelType) filters['specifications.fuelType'] = fuelType;
    if (transmission) filters['specifications.transmission'] = transmission;
    if (mileageMin) filters['specifications.mileage'] = { $gte: mileageMin };
    if (mileageMax) filters['specifications.mileage'] = { ...filters['specifications.mileage'], $lte: mileageMax };

    if (search) {
        filters.$or = [
            { name: new RegExp(search, 'i') },
            { model: new RegExp(search, 'i') },
            { 'specifications.bodyType': new RegExp(search, 'i') },
            { 'specifications.fuelType': new RegExp(search, 'i') },
            { 'specifications.transmission': new RegExp(search, 'i') },
            { 'seller.location': new RegExp(search, 'i') }
        ];
    }

    const options = {
        skip: (parseInt(page, 10) - 1) * parseInt(limit, 10),
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        lean: true,
        sort: { }
    };
    if (sort === 'priceAsc') {
        options.sort.price = 1;
    } else if (sort === 'priceDesc') {
        options.sort.price = -1;
    } else if (sort === 'latest') {
        options.sort.createdAt = -1;
    } else {
        options.sort.createdAt = -1;
    }
    const totalVehicles = await Vehicle.countDocuments(filters);
    const vehicles = await Vehicle.find(filters,null,options);

    const vehiclesResponse = {
        results: vehicles,
        count: totalVehicles,
    };
    return response.ok(res, 'Vehicles retrieved successfully', vehiclesResponse);


})

export {createVehicle, getBrowseByVehicles, getListVehicles}