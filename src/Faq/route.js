import express from 'express';
import {
  createFaq,
  getAnswerForQuestion,
  getFaqs,
  updateFaq,
  deleteFaq
} from './controller.js';

const router = express.Router();

// Public routes
router.get('/', getFaqs); // Get all FAQs with type filter
router.get('/answer', getAnswerForQuestion); // Get specific answer for a question

router.post('/', createFaq); // Create new FAQ
router.put('/:id', updateFaq); // Update existing FAQ
router.delete('/:id', deleteFaq); // Delete FAQ

export default router;