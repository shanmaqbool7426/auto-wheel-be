import Review from './model.js';
import asyncHandler from 'express-async-handler';
import responses from "../Utils/response.js";

const submitReview = asyncHandler(async (req, res) => {
  const { vehicle, ratings, reviewText, reviewTitle,type } = req.body;
  
  // Ensure ratings are provided
  if (!ratings) {
    return res.status(400).json({ message: 'Ratings are required' });
  }

  const { mileage, safety, comfort, maintenance, performance, features } = ratings;

  const totalRatings = mileage + safety + comfort + maintenance + performance + features;
  const overAllRating = totalRatings / 6;

  const newReview = await Review.create({
    vehicle,
    user: '66dae685642c653018958b73', 
    ratings: {
      mileage,
      safety,
      comfort,
      maintenance,
      performance,
      features,
    },
    overAllRating,   
    comment: reviewText,   
    title: reviewTitle,     
    type: type
  });

  return responses.ok(res, 'Review submitted successfully', newReview);
});



const getAllReviewsbyVehicle = asyncHandler(async (req, res) => {
  const { vehicle } = req.params;  // Assuming you are passing the vehicleId in the URL params
  
  const reviews = await Review.find({ vehicle: vehicle }).sort({ createdAt: -1 });  // Sort by latest reviews

  if (!reviews.length) {
    return responses.ok(res, 'No reviews found for this vehicle', []);
  }

  return responses.ok(res, 'Reviews fetched successfully', reviews);
});


const getAllReviews = asyncHandler(async (req, res) => {
  const { filterType } = req.query; // Assuming filterType is passed in query, like 'service', 'mileage', 'looks'
  
  // Define the allowed filter types
  const validFilters = ['service', 'mileage', 'looks', 'comfort', 'space', 'power'];

  // Check if filterType is valid
  if (!validFilters.includes(filterType) && filterType !== 'all') {
    return res.status(400).json({ message: 'Invalid filter type' });
  }

  let filter = {};
  if (filterType && filterType !== 'all') {
    filter[`ratings.${filterType}`] = { $exists: true };
  }

  const reviews = await Review.find(filter);

  // Get counts for each rating type
  const counts = await Review.aggregate([
    {
      $group: {
        _id: null,
        service: { $sum: { $cond: [{ $ifNull: ['$ratings.service', false] }, 1, 0] } },
        mileage: { $sum: { $cond: [{ $ifNull: ['$ratings.mileage', false] }, 1, 0] } },
        looks: { $sum: { $cond: [{ $ifNull: ['$ratings.looks', false] }, 1, 0] } },
        comfort: { $sum: { $cond: [{ $ifNull: ['$ratings.comfort', false] }, 1, 0] } },
        space: { $sum: { $cond: [{ $ifNull: ['$ratings.space', false] }, 1, 0] } },
        power: { $sum: { $cond: [{ $ifNull: ['$ratings.power', false] }, 1, 0] } },
        total: { $sum: 1 }
      }
    }
  ]);
  return responses.ok(res, 'Review fetched successfully', {reviews, counts: counts[0] });
});

export {submitReview,getAllReviews,getAllReviewsbyVehicle}
