import express from 'express';
import {
  createLocation,
  getLocations,
  updateLocation,
  deleteLocation,
  getLocationHierarchy,
  getChildrenLocations
} from './controller.js';

const router = express.Router();

// Public routes
router.get('/', getLocations);
router.get('/hierarchy', getLocationHierarchy);
router.get('/children/:parentId', getChildrenLocations);

// Admin routes
router.post('/',  createLocation);
router.put('/:id',  updateLocation);
router.delete('/:id', deleteLocation);

export default router;