import asyncHandler from 'express-async-handler';
import Vehicle from './model.js'; // Ensure this path is correct for your project structure
import responses from "../Utils/response.js";

const getBrowseByVehicles = asyncHandler(async (req, res) => {
    const { type } = req.query;
    if (!type) {
        return responses.badRequest(res, 'Vehicle type is required');
    }
    const vehicles = await Vehicle.find({ type }, 'name price model year specifications.transmission seller.location').limit(8);
    return responses.ok(res, 'Vehicles retrieved successfully', vehicles);
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
        select: 'name price model year transmission seller.location',
        lean: true,
        sort: { createdAt: -1 }
    };
    const vehicles = await Vehicle.paginate(filters, options);
    return responses.ok(res, 'Vehicles retrieved successfully', vehicles);


})