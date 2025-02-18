import Color from './model.js';
import asyncHandler from 'express-async-handler';
import slugify from 'slugify';
import response from '../Utils/response.js';

// Get next order number helper
const getNextOrder = async () => {
  const lastColor = await Color.findOne().sort({ order: -1 });
  return lastColor ? lastColor.order + 1 : 1;
};

// Create a new color
export const createColor = asyncHandler(async (req, res) => {
  try {
    const { title, type } = req.body;
    
    // Generate slug from title
    const slug = slugify(title, { lower: true });

    // Check if slug already exists
    const existingColor = await Color.findOne({ slug });
    if (existingColor) {
      return response.badRequest(res, 'A color with this title already exists');
    }

    const color = await Color.create({
      ...req.body,
      slug,
      order: req.body.order || await getNextOrder()
    });
    
    response.created(res, 'Color created successfully', color);
  } catch (error) {
    console.error('Error creating color:', error);
    response.serverError(res, 'Error creating color');
  }
});

// Get all colors
export const getAllColors = asyncHandler(async (req, res) => {
  try {
    const colors = await Color.find().sort({ order: 1, createdAt: -1 });
    response.ok(res, 'Colors retrieved successfully', colors);
  } catch (error) {
    console.error('Error retrieving colors:', error);
    response.serverError(res, 'Error retrieving colors');
  }
});

// Get color by ID
export const getColorById = asyncHandler(async (req, res) => {
  try {
    const color = await Color.findById(req.params.id);
    if (!color) {
      return response.notFound(res, 'Color not found');
    }
    response.ok(res, 'Color retrieved successfully', color);
  } catch (error) {
    console.error('Error retrieving color:', error);
    response.serverError(res, 'Error retrieving color');
  }
});

// Update color
export const updateColor = asyncHandler(async (req, res) => {
  try {
    const color = await Color.findById(req.params.id);
    if (!color) {
      return response.notFound(res, 'Color not found');
    }

    // If title is being updated, update slug as well
    if (req.body.title) {
      req.body.slug = slugify(req.body.title, { lower: true });
      
      // Check if new slug already exists (excluding current color)
      const existingColor = await Color.findOne({
        slug: req.body.slug,
        _id: { $ne: req.params.id }
      });
      
      if (existingColor) {
        return response.badRequest(res, 'A color with this title already exists');
      }
    }

    // Check for duplicate order
    if (req.body.order && req.body.order !== color.order) {
      const existingColor = await Color.findOne({ 
        order: req.body.order,
        _id: { $ne: color._id }
      });
      if (existingColor) {
        return response.badRequest(res, 'A color with this order number already exists');
      }
    }

    const updatedColor = await Color.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );

    response.ok(res, 'Color updated successfully', updatedColor);
  } catch (error) {
    console.error('Error updating color:', error);
    response.serverError(res, 'Error updating color');
  }
});

// Delete color
export const deleteColor = asyncHandler(async (req, res) => {
  try {
    const color = await Color.findById(req.params.id);
    if (!color) {
      return response.notFound(res, 'Color not found');
    }

    await Color.findByIdAndDelete(req.params.id);
    response.ok(res, 'Color deleted successfully');
  } catch (error) {
    console.error('Error deleting color:', error);
    response.serverError(res, 'Error deleting color');
  }
});

// Update color order
export const updateColorOrder = asyncHandler(async (req, res) => {
  try {
    const { newOrder } = req.body;
    const color = await Color.findById(req.params.id);

    if (!color) {
      return response.notFound(res, 'Color not found');
    }

    const existingColor = await Color.findOne({ 
      order: newOrder,
      _id: { $ne: color._id }
    });

    if (existingColor) {
      return response.badRequest(res, 'A color with this order number already exists');
    }

    color.order = newOrder;
    await color.save();

    response.ok(res, 'Color order updated successfully', color);
  } catch (error) {
    console.error('Error updating color order:', error);
    response.serverError(res, 'Error updating color order');
  }
});