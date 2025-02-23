import asyncHandler from 'express-async-handler';
import BrowesByBody from './model.js';
import responses from "../Utils/response.js"
import { uploadOnCloudinary } from '../Utils/cloudinary.js';
import { createSlug } from '../Utils/index.js';

export const createBody = asyncHandler(async (req, res) => {
  const { title, type, bodyImage,description } = req.body;

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
    slug,
    description
  });

  await body.save();
  return responses.created(res, 'Body type created successfully', body);
});

export const getAllBodies = asyncHandler(async (req, res) => {
  const { type } = req.params;
  const { page = 1, limit = 10, search } = req.query;

  try {
    // Build filter based on type and search
    let filter = type === 'all' ? {} : { type };
    
    // Add search filter if search query exists
    if (search) {
      filter = {
        ...filter,
        title: { $regex: new RegExp(search, 'i') } // Case-insensitive search on title
      };
    }

    // Calculate skip value for pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute queries in parallel
    const [totalCount, bodies] = await Promise.all([
      BrowesByBody.countDocuments(filter),
      BrowesByBody.find(filter)
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 })
    ]);

    return responses.ok(res, 'All Body entries retrieved successfully',bodies);
  } catch (error) {
    console.error('Error fetching bodies:', error);
    return responses.serverError(res, 'Error retrieving body entries');
  }
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
  const { title, type, bodyImage,description } = req.body;

  let updateData = {
    title,
    type,
    bodyImage,
    description
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

  return responses.ok(res, 'Body type updated successfully', body);
});

export const deleteBodyById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const Body = await BrowesByBody.findByIdAndDelete(id);
  if (!Body) {
    return responses.notFound(res, 'Body entry not found');
  }
 
  return responses.ok(res, 'Body entry deleted successfully');
});
