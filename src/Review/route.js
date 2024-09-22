import express from 'express';
import {
    getAllReviews,
    getAllReviewsbyVehicle,
    submitReview,
    getOverallRatings
} from './controller.js';

const router = express.Router();

router.post('/', submitReview);
router.get('/', getAllReviews);
router.get('/by-vehicle/:makeModel', getAllReviewsbyVehicle);
// router.get('/', getAllComments);
// router.get('/:id', getCommentById);
// router.put('/:id', updateComment);
// router.delete('/:id', deleteComment);

router.get('/overall-ratings/:makeModel', getOverallRatings);

export default router;
