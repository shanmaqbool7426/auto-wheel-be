import express from 'express';
import { protect } from '../Middleware/auth.js';
import {
  createReview,
  getDealerReviews,
  addComment,
  likeDislikeReview
} from './controller.js';

const router = express.Router();

router.post('/',protect,  createReview);
router.get('/dealer/:dealerId', getDealerReviews);
router.post('/:reviewId/comment', protect, addComment);
router.post('/:reviewId/like-dislike',protect, likeDislikeReview);

export default router;