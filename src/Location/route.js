import express from 'express';
import {
  createLocation,
  getLocations,
  updateLocation,
  deleteLocation,
  getLocationHierarchy,
  bulkDeleteLocations
} from './controller.js';

const router = express.Router();

// Public routes
router.get('/', getLocations);
router.get('/hierarchy', getLocationHierarchy);

// Admin routes
router.post('/',  createLocation);
router.put('/:id',  updateLocation);
router.delete('/bulk-delete', bulkDeleteLocations);
router.delete('/:id', deleteLocation);

export default router;