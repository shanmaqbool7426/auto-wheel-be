import express from 'express';
import { 
  createFuelType, 
  getAllFuelTypes, 
  getFuelTypeById, 
  updateFuelType, 
  deleteFuelType,
  updateFuelTypeOrder,
  getFuelTypesByType
} from './controller.js';

const router = express.Router();

// Create a new fuel type
router.post('/', createFuelType);

// Get all fuel types
router.get('/', getAllFuelTypes);

// Get a specific fuel type by ID
router.get('/:id', getFuelTypeById);

// Update a fuel type
router.put('/:id', updateFuelType);

// Delete a fuel type
router.delete('/:id', deleteFuelType);

// Update fuel type order
router.put('/order/:id', updateFuelTypeOrder);

// Get fuel types by type
router.get('/type/:type', getFuelTypesByType);

export default router;