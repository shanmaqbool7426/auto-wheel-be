import asyncHandler from 'express-async-handler';
import BrowesByBody from './model.js';
import responses from "../Utils/response.js";
import { uploadOnCloudinary } from '../Utils/cloudinary.js';

export const createBody = asyncHandler(async (req, res) => {
  const { name,type } = req.body;
  console.log('createBody',req.file?.path)
  const bodyImageURL = await uploadOnCloudinary(req.file?.path)
  console.log('bodyImageURL',bodyImageURL)
  const body = new BrowesByBody({bodyImage: bodyImageURL?.url, name,type });
  await body.save();
  return responses.created(res, 'Body entry created successfully', body);
});

export const getAllBodies = asyncHandler(async (req, res) => {
  const { type } = req.params;
  const Bodies = await BrowesByBody.find({type});
  return responses.ok(res, 'All Body entries retrieved successfully', Bodies);
});

export const getBodyById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const Body = await BrowesByBody.findById(id);
  if (!Body) {
    return responses.notFound(res, 'Body entry not found');
  }
  return responses.ok(res, 'Body entry retrieved successfully', Body);
});

export const updateBodyById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { bodyImage, name, } = req.body;
  const Body = await BrowesByBody.findById(id);
  if (!Body) {
    return responses.notFound(res, 'Body entry not found');
  }

  Body.bodyImage = bodyImage || Body.bodyImage;
  Body.name = name || Body.name;

  await Body.save();
  return responses.ok(res, 'Body entry updated successfully', Body);
});

export const deleteBodyById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const Body = await BrowesByBody.findById(id);
  if (!Body) {
    return responses.notFound(res, 'Body entry not found');
  }
  await Body.remove();
  return responses.ok(res, 'Body entry deleted successfully');
});
