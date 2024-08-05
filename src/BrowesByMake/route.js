import express from 'express';
import multer from "multer"
import {
  createMake,
  getAllMakes,
  getMakeById,
  updateMakeById,
  deleteMakeById
} from './controller.js'; // Ensure this path is correct for your project structure

const router = express.Router();
import {upload} from "../Middleware/multer.js"


router.post('/', upload.single("companyImage"),createMake);
router.get('/', getAllMakes);
router.get('/:id', getMakeById);
router.put('/:id', updateMakeById);
router.delete('/:id', deleteMakeById);

export default router;
