import express from 'express';
import {
  addComparison,
  getAllComparisons,
  getComparisonById
} from './controller.js';

const router = express.Router();

router.post('/add', addComparison);

router.get('/', getAllComparisons);

router.get('/:id', getComparisonById);

export default router;
