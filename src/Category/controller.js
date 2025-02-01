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
      { description: { $regex: search, $options: 'i' } },
      { slug: { $regex: search, $options: 'i' } }
    ];
  }

  // Calculate pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);

  // Build sort object
  const sort = {
    [sortBy]: sortOrder === 'desc' ? -1 : 1
  };

  try {
    // Execute query with pagination
    const [categories, totalCount] = await Promise.all([
      Category.find(query)
        .populate('parentCategory')
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      Category.countDocuments(query)
    ]);

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / parseInt(limit));
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return responses.ok(res, 'Categories fetched successfully', {
      data: categories,
      pagination: {
        totalItems: totalCount,
        totalPages,
        currentPage: parseInt(page),
        itemsPerPage: parseInt(limit),
        hasNextPage,
        hasPrevPage
      }
    });
  } catch (error) {
    return responses.internalServerError(res, 'Error fetching categories', error);
  }
});
export const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return responses.badRequest(res, 'Invalid category ID');
  // }

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

// Add this new controller function for bulk delete
export const deleteMultipleCategories = asyncHandler(async (req, res) => {
  const { ids } = req.body;
  // Validate input
  if (!Array.isArray(ids) || ids.length === 0) {
    return responses.badRequest(res, 'Please provide an array of category IDs');
  }

  // Validate all IDs are valid MongoDB ObjectIDs
  const areValidIds = ids.every(id => mongoose.Types.ObjectId.isValid(id));
  // if (!areValidIds) {
  //   return responses.badRequest(res, 'Invalid category ID(s) provided');
  // }

  try {
    // Find all categories that exist
    const existingCategories = await Category.find({ _id: { $in: ids } });
    
    if (existingCategories.length === 0) {
      return responses.notFound(res, 'No categories found with the provided IDs');
    }

    // Delete all categories
    console.log('ids', ids);
    const result = await Category.deleteMany({ _id: { $in: ids } });

    // Check if any documents were deleted
    if (result.deletedCount === 0) {
      return responses.notFound(res, 'No categories were deleted');
    }

    // Check for partial deletion
    if (result.deletedCount !== ids.length) {
      return responses.ok(res, `${result.deletedCount} out of ${ids.length} categories were deleted successfully`);
    }

    return responses.ok(res, 'All categories deleted successfully', {
      deletedCount: result.deletedCount,
      deletedCategories: existingCategories
    });

  } catch (error) {
    return responses.internalServerError(res, 'Error deleting categories', error);
  }
});
