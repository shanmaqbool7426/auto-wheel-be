
import asyncHandler from 'express-async-handler';
import BrowesByMake from './model.js'; 
import responses from "../Utils/response.js";
import { uploadOnCloudinary } from '../Utils/cloudinary.js';

export const createMake = asyncHandler(async (req, res) => {
  const { name, type, models } = req.body;

  const companyImageURL =  null;
//   const parsedModels = JSON.parse(models);
// console.log('parsedModels',parsedModels);

  const make = new BrowesByMake({
    companyImage: companyImageURL?.url,
    name,
    type,
    models: models || []
  });

  await make.save();

  return responses.created(res, 'Make entry created successfully', make);
});




export const getAllMakes = asyncHandler(async (req, res) => {
  const { type } = req.query;
  const filter = type ? { type } : {};
  const makes = await BrowesByMake.find(filter);
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
  const { name, type, models } = req.body;

  const make = await BrowesByMake.findById(id);

  if (!make) {
    return responses.notFound(res, 'Make entry not found');
  }

  if (req.file) {
    const companyImageURL = await uploadOnCloudinary(req.file.path);
    make.companyImage = companyImageURL.url || make.companyImage;
  }

  make.name = name || make.name;
  make.type = type || make.type; // Allow updating the type
  make.models = models || make.models;

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
