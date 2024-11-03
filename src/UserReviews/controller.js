import asyncHandler from 'express-async-handler';
import Review from './model.js';
import User from '../User/model.js';
import responses from '../Utils/response.js';

// Create a new review
export const createReview = asyncHandler(async (req, res) => {
    try {
      const { dealerId, content, buyingProcess, vehicleSelection, levelOfServices } = req.body;
      const userId = req.user._id;
      console.log('userIduserId', userId);
  
      // Validate input
      if (!dealerId || !content || !buyingProcess || !vehicleSelection || !levelOfServices) {
        return responses.badRequest(res, 'All fields are required');
      }
  
      // Check if dealer exists
      const dealer = await User.findById(dealerId);
      if (!dealer) {
        return responses.notFound(res, 'Dealer not found');
      }
  
      // Calculate average rating
      const averageRating = (Number(buyingProcess) + Number(vehicleSelection) + Number(levelOfServices)) / 3;
      const roundedRating = Math.round(averageRating * 10) / 10; // Round to one decimal place
  
      // Create new review
      const newReview = await Review.create({
        user: userId,
        dealer: dealerId,
        rating: roundedRating,
        content,
        buyingProcess,
        vehicleSelection,
        levelOfServices
      });
  
      // Update dealer's review count
      await User.findByIdAndUpdate(dealerId, { $inc: { reviewCount: 1 } });
  
      // Calculate new average rating for dealer
      const reviews = await Review.find({ dealer: dealerId });
      const dealerAverageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
      const roundedDealerRating = Math.round(dealerAverageRating * 10) / 10; // Round to one decimal place
      await User.findByIdAndUpdate(dealerId, { rating: roundedDealerRating });
  
      return responses.created(res, 'Review created successfully', newReview);
    } catch (error) {
      console.error('Error creating review:', error);
      return responses.serverError(res, 'An error occurred while creating the review');
    }
  });

// Get reviews for a dealer
export const getDealerReviews = asyncHandler(async (req, res) => {
  const { dealerId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const reviews = await Review.find({ dealer: dealerId })
    .populate('user', 'fullName profileImage')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Review.countDocuments({ dealer: dealerId });

  res.json({
    reviews,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalReviews: total
  });
});

// Add a comment to a review
export const addComment = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const { content } = req.body;
  const userId = req.user._id;

  const review = await Review.findById(reviewId);
  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  review.comments.push({ user: userId, content });
  await review.save();

  res.status(201).json(review.comments[review.comments.length - 1]);
});

// Like or dislike a review
export const likeDislikeReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const { action } = req.body; // 'like' or 'dislike'
  const userId = req.user._id;

  const review = await Review.findById(reviewId);
  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  const likeIndex = review.likes.indexOf(userId);
  const dislikeIndex = review.dislikes.indexOf(userId);

  if (action === 'like') {
    if (likeIndex === -1) {
      // Add like if not already liked
      review.likes.push(userId);
      // Remove dislike if exists
      if (dislikeIndex !== -1) {
        review.dislikes.splice(dislikeIndex, 1);
      }
    } else {
      // Remove like if already liked (toggle)
      review.likes.splice(likeIndex, 1);
    }
  } else if (action === 'dislike') {
    if (dislikeIndex === -1) {
      // Add dislike if not already disliked
      review.dislikes.push(userId);
      // Remove like if exists
      if (likeIndex !== -1) {
        review.likes.splice(likeIndex, 1);
      }
    } else {
      // Remove dislike if already disliked (toggle)
      review.dislikes.splice(dislikeIndex, 1);
    }
  }

  await review.save();
  res.json({ 
    likes: review.likes.length, 
    dislikes: review.dislikes.length,
    hasLiked: review.likes.includes(userId),
    hasDisliked: review.dislikes.includes(userId)
  });
});