import express from 'express';
import {
  createBody,
  getAllBodies,
  getBodyById,
  updateBodyById,
  deleteBodyById
} from './controller.js'; // Ensure this path is correct for your project structure

const router = express.Router();
import {upload} from "../Middleware/multer.js"


router.post('/', upload.single("bodyImage"),createBody);
router.get('/', getAllBodies);
router.get('/:id', getBodyById);
router.put('/:id', updateBodyById);
router.delete('/:id', deleteBodyById);

export default router;