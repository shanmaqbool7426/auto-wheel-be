import express from 'express';
import { addReview, getReviews } from './controller.js';
import { protect } from '../Middleware/auth.js';

const router = express.Router();

router.post('/add-review',protect, addReview);
router.get('/get-reviews/:dealerId', getReviews);

export default router;