import asyncHandler from 'express-async-handler';
import Tag from './model.js';

import responses from '../Utils/response.js';
import mongoose from 'mongoose';

export const createTag = asyncHandler(async (req, res) => {
  const { name, slug, description } = req.body;

  const tag = new Tag({
    name,
    slug,
    description,
  });

  await tag.save();

  return responses.created(res, 'Tag created successfully', tag);
});

export const getAllTags = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search = '',
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = req.query;

  // Build query
  const query = {};

  // Search functionality
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  try {
    // Execute query with pagination
    const [tags, totalCount] = await Promise.all([
      Tag.find(query)
        .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit)),
      Tag.countDocuments(query)
    ]);

    return responses.ok(res, 'Tags fetched successfully', {
      data: tags,
      total: totalCount,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(totalCount / limit)
    });

  } catch (error) {
    return responses.internalServerError(res, 'Error fetching tags', error);
  }
});

export const getTagById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return responses.badRequest(res, 'Invalid tag ID');
  }

  const tag = await Tag.findById(id);
  if (!tag) {
    return responses.notFound(res, 'Tag not found');
  }
  return responses.ok(res, 'Tag fetched successfully', tag);
});

export const updateTag = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return responses.badRequest(res, 'Invalid tag ID');
  }

  const tag = await Tag.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

  if (!tag) {
    return responses.notFound(res, 'Tag not found');
  }

  return responses.ok(res, 'Tag updated successfully', tag);
});

export const deleteTag = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return responses.badRequest(res, 'Invalid tag ID');
  }

  const tag = await Tag.findByIdAndDelete(id);

  if (!tag) {
    return responses.notFound(res, 'Tag not found');
  }

  return responses.ok(res, 'Tag deleted successfully', tag);
});
