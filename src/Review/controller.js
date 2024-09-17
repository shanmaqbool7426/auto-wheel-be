import Review from './model.js';
import asyncHandler from 'express-async-handler';
import responses from "../Utils/response.js";

const submitReview = asyncHandler(async (req, res) => {
  const { vehicle, ratings, reviewText, reviewTitle,type,makeAndModel } = req.body;
  
  // Ensure ratings are provided
  if (!ratings) {
    return res.status(400).json({ message: 'Ratings are required' });
  }

  const { mileage, safety, comfort, maintenance, performance, features } = ratings;
console.log('Ratings',mileage, safety, comfort, maintenance, performance, features)
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
  const { filterType } = req.query; // Not using makeAndModel since you won't provide it

  const validFilters = ['service', 'mileage', 'looks', 'comfort', 'space', 'power'];

  // Check if filterType is valid
  if (filterType && !validFilters.includes(filterType) && filterType !== 'all') {
    return res.status(400).json({ message: 'Invalid filter type' });
  }

  // Initialize the filter object
  let filter = {};

  // If a filterType is provided, add the corresponding filter for the rating type
  if (filterType && filterType !== 'all') {
    filter[`ratings.${filterType}`] = { $exists: true };
  }

  // Fetch the most recent review
  const lastReview = await Review.findOne(filter).sort({ createdAt: -1 });

  if (!lastReview) {
    return res.status(200).json({ message: 'No reviews found' });
  }

  // Get the vehicle identifier from the last review (adjust according to your schema)
  const vehicleIdentifier = lastReview.vehicle || lastReview.makeAndModel;

  // Now, fetch all reviews for this vehicle
  filter['vehicle'] = vehicleIdentifier;

  const reviews = await Review.find(filter).sort({ createdAt: -1 });

  // Get counts and overall average rating for this vehicle
  const stats = await Review.aggregate([
    { $match: filter },
    {
      $group: {
        _id: null,
        // Counts for each rating type
        service: { $sum: { $cond: [{ $ifNull: ['$ratings.service', false] }, 1, 0] } },
        mileage: { $sum: { $cond: [{ $ifNull: ['$ratings.mileage', false] }, 1, 0] } },
        looks: { $sum: { $cond: [{ $ifNull: ['$ratings.looks', false] }, 1, 0] } },
        comfort: { $sum: { $cond: [{ $ifNull: ['$ratings.comfort', false] }, 1, 0] } },
        space: { $sum: { $cond: [{ $ifNull: ['$ratings.space', false] }, 1, 0] } },
        power: { $sum: { $cond: [{ $ifNull: ['$ratings.power', false] }, 1, 0] } },
        total: { $sum: 1 },
        // Sum of overall ratings
        totalRating: {
          $sum: {
            $toDouble: '$overAllRating' // Convert overAllRating to a number
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        service: 1,
        mileage: 1,
        looks: 1,
        comfort: 1,
        space: 1,
        power: 1,
        total: 1,
        // Calculate average rating and round to one decimal place
        averageRating: {
          $cond: [
            { $gt: ['$total', 0] },
            { $round: [{ $divide: ['$totalRating', '$total'] }, 1] }, // Rounds to 1 decimal place
            null
          ]
        }
      }
    }
  ]);

  return responses.ok(res, 'Reviews fetched successfully', { reviews, stats: stats[0] });
});



export {submitReview,getAllReviews,getAllReviewsbyVehicle}
