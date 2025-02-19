import express from 'express';
import { 
  createDrive, 
  getAllDrives, 
  getDriveById, 
  updateDrive, 
  deleteDrive,
  updateDriveOrder,
  getDrivesByType
} from './controller.js';

const router = express.Router();

// Create a new drive
router.post('/', createDrive);

// Get all drives
router.get('/', getAllDrives);

// Get drives by type
router.get('/type', getDrivesByType);

// Get a specific drive by ID
router.get('/:id', getDriveById);

// Update a drive
router.put('/:id', updateDrive);

// Delete a drive
router.delete('/:id', deleteDrive);

// Update drive order
router.put('/order/:id', updateDriveOrder);


export default router;