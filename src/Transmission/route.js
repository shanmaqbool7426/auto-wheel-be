import express from 'express';
import { 
  createTransmission, 
  getAllTransmissions, 
  getTransmissionById, 
  updateTransmission, 
  deleteTransmission,
  updateTransmissionOrder,
  getTransmissionsByType
} from './controller.js';

const router = express.Router();

// Create a new transmission
router.post('/', createTransmission);

// Get all transmissions
router.get('/', getAllTransmissions);

// Get transmissions by type
router.get('/type', getTransmissionsByType);

// Get a specific transmission by ID
router.get('/:id', getTransmissionById);

// Update a transmission
router.put('/:id', updateTransmission);

// Delete a transmission
router.delete('/:id', deleteTransmission);

// Update transmission order
router.put('/order/:id', updateTransmissionOrder);


export default router;
