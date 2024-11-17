import express from 'express';
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  deleteMultipleCategories
} from './controller.js';

const router = express.Router();

router.post('/', createCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);
router.post('/bulk-delete', deleteMultipleCategories); // Add this new route


export default router;
