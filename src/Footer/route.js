import express from 'express';
import {
  createFooterLink,
  getAllFooterLinks,
  getFooterLinkById,
  updateFooterLink,
  deleteFooterLink
} from './controller.js';
// import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .post(createFooterLink)
  .get(getAllFooterLinks);

router
  .route('/:id')
  .get(getFooterLinkById)
  .put( updateFooterLink)
  .delete( deleteFooterLink);

export default router;
