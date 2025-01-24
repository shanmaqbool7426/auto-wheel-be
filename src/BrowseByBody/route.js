import express from 'express';
import {
  createBody,
  getAllBodies,
  getBodyById,
  updateBody,
  deleteBodyById
} from './controller.js'; 

const router = express.Router();
import {upload} from "../Middleware/multer.js"


router.post('/', upload.single("bodyImage"),createBody);
router.get('/:type', getAllBodies);
router.get('/:id', getBodyById);
router.put('/:id', updateBody);
router.delete('/:id', deleteBodyById);

export default router;