import express from 'express';
import { 
  createNearByLocation, 
  getAllNearByLocations, 
  getNearByLocationById, 
  updateNearByLocation, 
  deleteNearByLocation,
  updateNearByLocationOrder,
  getAllActiveNearByLocations
} from './controller.js';

const router = express.Router();

// Create a new nearby location
router.post('/', createNearByLocation);

// Get all nearby locations
router.get('/', getAllNearByLocations);

// Get all active nearby locations
router.get('/active', getAllActiveNearByLocations);

// Get a specific nearby location by ID
router.get('/:id', getNearByLocationById);

// Update a nearby location
router.put('/:id', updateNearByLocation);

// Delete a nearby location
router.delete('/:id', deleteNearByLocation);

// Update nearby location order
router.put('/order/:id', updateNearByLocationOrder);

export default router;
