import asyncHandler from 'express-async-handler';
import UserReview from './model.js';
import User from '../User/model.js';
import responses from '../Utils/response.js';

const addReview = asyncHandler(async (req, res) => {
    const { dealerId, title, review, rating, recommend } = req.body;

    const dealer = await User.findById(dealerId);
    if (!dealer) {
        return responses.notFound(res, 'Dealer not found');
    }

    const newReview = new UserReview({
        title,
        review,
        rating,
        recommend,
        user: req.user._id,
        dealer: dealerId,
    });


    dealer.reviewCount += 1; // Increment the review count
    dealer.save()
    await newReview.save();
    return responses.ok(res, 'Review added successfully', newReview);
});

const getReviews = asyncHandler(async (req, res) => {
    const { dealerId } = req.params;

    const reviews = await UserReview.find({ dealer: dealerId }).populate('user', 'fullName');

    if (!reviews) {
        return responses.notFound(res, 'No reviews found for this dealer');
    }

    return responses.ok(res, 'Reviews fetched successfully', reviews);
});

export { addReview, getReviews };