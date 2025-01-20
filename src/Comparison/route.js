import express from 'express';
import {
  createCompareSet,
  getCompareSet,
  deleteCompareSet,
  getTopComparisons,
  getComparisonsList,
  getComparisonSets,
  updateCompareSet
} from './controller.js';

const router = express.Router();

// Create a comparison set
router.post('/', createCompareSet);

// Update a comparison set
router.put('/:id', updateCompareSet);

// Get top comparisons
router.get('/top', getTopComparisons);

// Get list of all comparisons
router.get('/list', getComparisonSets);

// Get comparison set by ID
router.get('/:compareSetId', getCompareSet);

// Delete comparison set

router.delete('/:id', deleteCompareSet);

export default router;

