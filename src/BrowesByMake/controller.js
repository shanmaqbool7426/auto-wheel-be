import asyncHandler from 'express-async-handler';
import BrowesByMake from './model.js'; 
import responses from "../Utils/response.js";
import { uploadOnCloudinary } from '../Utils/cloudinary.js';

export const createMake = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const companyImageURL = await uploadOnCloudinary(req.file?.path)
  const make = new BrowesByMake({companyImage: companyImageURL.url, name });
  await make.save();
  return responses.created(res, 'Make entry created successfully', make);
});


export const getAllMakes = asyncHandler(async (req, res) => {
  const makes = await BrowesByMake.find({});

  return responses.ok(res, 'All make entries retrieved successfully', makes);
});

export const getMakeById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const make = await BrowesByMake.findById(id);

  if (!make) {
    return responses.notFound(res, 'Make entry not found');
  }

  return responses.ok(res, 'Make entry retrieved successfully', make);
});

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

export const deleteMakeById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const make = await BrowesByMake.findById(id);

  if (!make) {
    return responses.notFound(res, 'Make entry not found');
  }

  await make.remove();

  return responses.ok(res, 'Make entry deleted successfully');
});
