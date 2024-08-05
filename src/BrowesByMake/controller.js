import asyncHandler from 'express-async-handler';
import BrowesByMake from './model.js'; // Ensure this path is correct for your project structure
import responses from "../Utils/response.js";
import { uploadOnCloudinary } from '../Utils/cloudinary.js';

// Create a new make entry
export const createMake = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const companyImageURL = await uploadOnCloudinary(req.file?.path)
  const make = new BrowesByMake({companyImage: companyImageURL.url, name });
  await make.save();
  return responses.created(res, 'Make entry created successfully', make);
});


// Retrieve all make entries
export const getAllMakes = asyncHandler(async (req, res) => {
  const makes = await BrowesByMake.find({});

  return responses.ok(res, 'All make entries retrieved successfully', makes);
});

// Retrieve a single make entry by ID
export const getMakeById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const make = await BrowesByMake.findById(id);

  if (!make) {
    return responses.notFound(res, 'Make entry not found');
  }

  return responses.ok(res, 'Make entry retrieved successfully', make);
});

// Update a make entry by ID
export const updateMakeById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { companyImage, name } = req.body;

  const make = await BrowesByMake.findById(id);

  if (!make) {
    return responses.notFound(res, 'Make entry not found');
  }

  make.companyImage = companyImage || make.companyImage;
  make.name = name || make.name;

  await make.save();

  return responses.ok(res, 'Make entry updated successfully', make);
});

// Delete a make entry by ID
export const deleteMakeById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const make = await BrowesByMake.findById(id);

  if (!make) {
    return responses.notFound(res, 'Make entry not found');
  }

  await make.remove();

  return responses.ok(res, 'Make entry deleted successfully');
});
