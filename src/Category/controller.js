import asyncHandler from 'express-async-handler';
import Category from './model.js';
import responses from '../Utils/response.js';
import mongoose from 'mongoose';

export const createCategory = asyncHandler(async (req, res) => {
  const { name, slug, parentCategory, description } = req.body;
  const category = new Category({
    name,
    slug,
    parentCategory: parentCategory || null,
    description,
  });

  await category.save();

  return responses.created(res, 'Category created successfully', category);
});

export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().populate('parentCategory');
  return responses.ok(res, 'Categories fetched successfully', categories);
});

export const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return responses.badRequest(res, 'Invalid category ID');
  }

  const category = await Category.findById(id).populate('parentCategory');
  if (!category) {
    return responses.notFound(res, 'Category not found');
  }
  return responses.ok(res, 'Category fetched successfully', category);
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return responses.badRequest(res, 'Invalid category ID');
  }

  const category = await Category.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).populate('parentCategory');

  if (!category) {
    return responses.notFound(res, 'Category not found');
  }

  return responses.ok(res, 'Category updated successfully', category);
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return responses.badRequest(res, 'Invalid category ID');
  }

  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    return responses.notFound(res, 'Category not found');
  }

  return responses.ok(res, 'Category deleted successfully', category);
});
