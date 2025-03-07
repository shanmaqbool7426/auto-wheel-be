import express from 'express';
import {
  createLocation,
  getLocations,
  updateLocation,
  deleteLocation,
  getLocationHierarchy,
  getChildrenLocations,
  getProvinces
} from './controller.js';

const router = express.Router();

// Public routes
router.get('/', getLocations);
router.get('/hierarchy', getLocationHierarchy);
router.get('/children/:parentId', getChildrenLocations);
router.get('/provinces', getProvinces);
// router.get('/cities', getCities);

// Admin routes
router.post('/',  createLocation);
router.put('/:id',  updateLocation);
router.delete('/:id', deleteLocation);
// router.get('/provinces', getProvinces);

export default router;