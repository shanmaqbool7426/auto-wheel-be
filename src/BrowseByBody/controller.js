import asyncHandler from 'express-async-handler';
import BrowesByBody from './model.js'; // Ensure this path is correct for your project structure
import responses from "../Utils/response.js";
import { uploadOnCloudinary } from '../Utils/cloudinary.js';

// Create a new Body entry
export const createBody = asyncHandler(async (req, res) => {
  const { name } = req.body;
  console.log('createBody',req.file?.path)
  const bodyImageURL = await uploadOnCloudinary(req.file?.path)
  console.log('bodyImageURL',bodyImageURL)
  const body = new BrowesByBody({bodyImage: bodyImageURL?.url, name });
  await body.save();
  return responses.created(res, 'Body entry created successfully', body);
});

// Retrieve all Body entries
export const getAllBodies = asyncHandler(async (req, res) => {
  const Bodies = await BrowesByBody.find({});
  return responses.ok(res, 'All Body entries retrieved successfully', Bodies);
});

// Retrieve a single Body entry by ID
export const getBodyById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const Body = await BrowesByBody.findById(id);
  if (!Body) {
    return responses.notFound(res, 'Body entry not found');
  }
  return responses.ok(res, 'Body entry retrieved successfully', Body);
});

// Update a Body entry by ID
export const updateBodyById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { bodyImage, name } = req.body;
  const Body = await BrowesByBody.findById(id);
  if (!Body) {
    return responses.notFound(res, 'Body entry not found');
  }

  Body.bodyImage = bodyImage || Body.bodyImage;
  Body.name = name || Body.name;

  await Body.save();
  return responses.ok(res, 'Body entry updated successfully', Body);
});

// Delete a Body entry by ID
export const deleteBodyById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const Body = await BrowesByBody.findById(id);
  if (!Body) {
    return responses.notFound(res, 'Body entry not found');
  }
  await Body.remove();
  return responses.ok(res, 'Body entry deleted successfully');
});
