import express from 'express';
import { 
  createColor, 
  getAllColors, 
  getColorById, 
  updateColor, 
  deleteColor,
  updateColorOrder,
  getColorsByType
} from './controller.js';

const router = express.Router();

// Create a new color
router.post('/', createColor);

// Get all colors
router.get('/', getAllColors);

// Get a specific color by ID
router.get('/:id', getColorById);

// Update a color
router.put('/:id', updateColor);

// Delete a color
router.delete('/:id', deleteColor);

// Update color order
router.put('/order/:id', updateColorOrder);

// Get colors by type
router.get('/type/:type', getColorsByType);

export default router;