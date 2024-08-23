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
  const tags = await Tag.find();
  return responses.ok(res, 'Tags fetched successfully', tags);
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
