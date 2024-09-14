
import express from 'express';
import {
    getAllReviews,
    getAllReviewsbyVehicle,
    submitReview
} from './controller.js';

const router = express.Router();

router.post('/', submitReview);
router.get('/', getAllReviews);
router.get('/by-vehicle', getAllReviewsbyVehicle);
// router.get('/', getAllComments);
// router.get('/:id', getCommentById);
// router.put('/:id', updateComment);
// router.delete('/:id', deleteComment);

export default router;
