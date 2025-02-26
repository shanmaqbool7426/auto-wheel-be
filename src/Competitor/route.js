import express from 'express';
import {
  createCompetitor,
  getCompetitor,
  deleteCompetitor,
  getTopCompetitors,
  getCompetitorsList,
  getCompetitors,
  updateCompetitor,
  getCompetitorsByVehicleId
} from './controller.js';

const router = express.Router();

// Create a competitor
router.post('/', createCompetitor);

// Update a competitor
router.put('/:id', updateCompetitor);

// Get top competitors
router.get('/top', getTopCompetitors);

// Get list of all competitors
router.get('/list', getCompetitors);

//Get competitor by vehicleId
router.get('/vehicle/:vehicleId', getCompetitorsByVehicleId);

// Get competitor by ID
router.get('/:competitorId', getCompetitor);

// Delete competitor
router.delete('/:id', deleteCompetitor);

export default router;