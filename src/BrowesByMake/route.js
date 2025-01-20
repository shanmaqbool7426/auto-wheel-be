// BrowesByMake/route.js
import express from 'express';
import {
  createMake,
  getAllMakes,
  getMakeById,
  updateMakeById,
  deleteMakeById,
  addModel,
  addVariant,
  updateModel,
  updateVariant,
  deleteModel,
  deleteVariant
} from './controller.js';
import { upload } from "../Middleware/multer.js";

const router = express.Router();

// Make routes
router.post('/', upload.single("companyImage"), createMake);
router.get('/', getAllMakes);
router.get('/:id', getMakeById);
router.put('/:id',upload.single("companyImage"), updateMakeById);
router.delete('/:id', deleteMakeById);
// Model routes
router.post('/:makeId/models', addModel);
router.put('/:makeId/models/:modelId', updateModel);
router.delete('/:makeId/models/:modelId', deleteModel);

// Variant routes
router.post('/:makeId/models/:modelId/variants', addVariant);
router.put('/:makeId/models/:modelId/variants', updateVariant);
router.delete('/:makeId/models/:modelId/variants/:variantId', deleteVariant);

export default router;