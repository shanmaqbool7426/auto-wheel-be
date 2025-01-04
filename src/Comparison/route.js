import express from 'express';
import {
  createCompareSet,
  getCompareSet,
  deleteCompareSet,
  getTopComparisons,
  getComparisonsList,
  getComparisonSets
} from './controller.js';

const router = express.Router();

// Create a comparison set
router.post('/', createCompareSet);

// Get top comparisons
router.get('/top', getTopComparisons);

// Get list of all comparisons
router.get('/list', getComparisonSets);

// Get comparison set by ID
router.get('/:compareSetId', getCompareSet);

// Delete comparison set

router.delete('/:compareSetId', deleteCompareSet);

export default router;

