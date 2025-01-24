import asyncHandler from 'express-async-handler';
import BrowesByBody from './model.js';
import responses from "../Utils/response.js";
import { uploadOnCloudinary } from '../Utils/cloudinary.js';
import { createSlug } from '../Utils/index.js ';

export const createBody = asyncHandler(async (req, res) => {
  const { title, type, bodyImage } = req.body;

  // Generate slug from title
  const slug = createSlug(title);

  // Check if body with same slug already exists
  const existingBody = await BrowesByBody.findOne({ slug });
  if (existingBody) {
    return responses.conflict(res, 'A body type with this title already exists');
  }

  const body = new BrowesByBody({
    title,
    type,
    bodyImage,
    slug
  });

  await body.save();
  return responses.created(res, 'Body type created successfully', body);
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

export const updateBody = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, type, bodyImage } = req.body;

  let updateData = {
    title,
    type,
    bodyImage
  };

  // Only update slug if title is being changed
  if (title) {
    updateData.slug = createSlug(title);
  }

  const body = await BrowesByBody.findByIdAndUpdate(
    id,
    updateData,
    { new: true }
  );

  if (!body) {
    return responses.notFound(res, 'Body type not found');
  }

  return responses.success(res, 'Body type updated successfully', body);
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
