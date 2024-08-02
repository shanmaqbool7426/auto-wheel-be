import express from 'express';
import {
  createMake,
  getAllMakes,
  getMakeById,
  updateMakeById,
  deleteMakeById
} from './controller'; // Ensure this path is correct for your project structure

const router = express.Router();

router.post('/', createMake);
router.get('/', getAllMakes);
router.get('/:id', getMakeById);
router.put('/:id', updateMakeById);
router.delete('/:id', deleteMakeById);

export default router;
