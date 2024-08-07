import asyncHandler from 'express-async-handler';
import Vehicle from './model.js'; // Ensure this path is correct for your project structure
import response from "../Utils/response.js";
import { uploadOnCloudinary } from '../Utils/cloudinary.js';




const createVehicle = asyncHandler(async (req, res) => {
    try {
        // Parse JSON strings from the request body
        const parsedSpecifications = JSON.parse(req.body.specifications);
        console.log('Parse JSON',req.files.image)
        const parsedFeatures = JSON.parse(req.body.features);
        const parsedSeller = JSON.parse(req.body.seller);
        
        let productUrl = null;

        console.log('>>>>>>>>>>>',req.files.image[0].path)
        // Check if file is uploaded
        if (req.files) {
            productUrl = await uploadOnCloudinary(req.files.image[0].path);
            if (!productUrl || !productUrl.url) {
                throw new Error('Error uploading image to Cloudinary');
            }
        }
        // const parsedImages = productUrl.url
        // Create vehicle data object
        const vehicleData = {
            ...req.body,
            features: parsedFeatures,
            seller: parsedSeller,
            image: productUrl ? productUrl.url : undefined // Add the product URL to the vehicle data if available
        };

        
        const vehicle = new Vehicle(vehicleData);
        await vehicle.save();
        response.ok(res, "Vehicle Created Successfully");
    } catch (error) {
        console.error(error);
        // response.error(res, "Error creating vehicle", error.message);
    }
});

  
  const getBrowseByVehicles = asyncHandler(async (req, res) => {
    try {
      const bikes = await Vehicle.find({ type: 'bike' }).limit(8);
      const trucks = await Vehicle.find({ type: 'truck' }).limit(8);
      const cars = await Vehicle.find({ type: 'car' }).limit(8);
      const vehicles = [...bikes, ...trucks, ...cars];
      console.log('>>>>>>>>>. ', vehicles)
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
        year,
        priceMin,
        priceMax,
        bodyType,
        fuelType,
        transmission,
        mileageMin,
        mileageMax,
        search = '',
        page = 1,
        limit = 10
    } = req.query;

    const filters = {};

    if (type) filters.type = type;
    if (make) filters.make = new RegExp(make, 'i');
    if (model) filters.model = new RegExp(model, 'i');
    if (year) filters.year = year;
    if (priceMin) filters.price = { $gte: priceMin };
    if (priceMax) filters.price = { ...filters.price, $lte: priceMax };
    if (bodyType) filters['specifications.bodyType'] = bodyType;
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
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        // select: 'name price model year transmission seller.location',
        lean: true,
        sort: { createdAt: -1 }
    };
    const vehicles = await Vehicle.find(filters);
    return response.ok(res, 'Vehicles retrieved successfully', vehicles);


})

export {createVehicle, getBrowseByVehicles, getListVehicles}