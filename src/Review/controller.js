import Review from './model.js';
import { NewVehicle } from '../NewVehicle/model.js';
import asyncHandler from 'express-async-handler';
import responses from "../Utils/response.js";

// Helper function to standardize vehicle names
const standardizeVehicleName = (make, model) => {
  return `${make} ${model}`.toLowerCase().replace(/\s+/g, '-');
};

const submitReview = asyncHandler(async (req, res) => {
  const { vehicle, ratings, reviewText, reviewTitle, type ,reviewBy} = req.body;
  
  if (!ratings) {
    return res.status(400).json({ message: 'Ratings are required' });
  }

  const { mileage, safety, comfort, maintenance, performance, features } = ratings;
  
  const totalRatings = mileage + safety + comfort + maintenance + performance + features;
  const overAllRating = totalRatings / 6;

  // Extract make, model, and variant from the vehicle string
  const parts = vehicle.split(' ');
  const make = parts[0];
  const model = parts[1];
  const variant = parts.slice(2).join(' ');

  // Search for the vehicle in NewVehicle collection
  const vehicleIdget = await NewVehicle.findOne({
    'Info.make': { $regex: new RegExp('^' + make, 'i') },
    'Info.model': { $regex: new RegExp('^' + model, 'i') },
    'Info.variant': { $regex: new RegExp('^' + variant, 'i') }
  });
  console.log('vehicleIdget',vehicleIdget)
  if (!vehicleIdget) {
    return res.status(404).json({ message: 'Vehicle not found' });
  }

  const newReview = await Review.create({
    vehicle:vehicle ,
    user: '66dae685642c653018958b73', 
    ratings: {
      mileage,
      safety,
      comfort,
      maintenance,
      performance,
      features,
    },
    vehicleId: vehicleIdget._id,
    overAllRating,   
    comment: reviewText,   
    title: reviewTitle,     
    type: type,
    reviewBy:reviewBy
  });

  return responses.ok(res, 'Review submitted successfully', newReview);
});




const getAllReviewsbyVehicle = asyncHandler(async (req, res) => {
  console.log('req.params', req.params);
  const { makeModel } = req.params;

  if (!makeModel) {
    return responses.badRequest(res, 'Make and model are required');
  }

  // Helper function to extract make and model from standardized slug
  const extractMakeAndModel = (slug) => {
    const parts = slug.split('-');
    const make = parts[0];
    const model = parts.slice(1).join(' ');
    return { make, model };
  };

  const { make, model } = extractMakeAndModel(makeModel);

  if (!make || !model) {
    return responses.badRequest(res, 'Invalid make and model format');
  }

  const vehicleRegex = new RegExp(`^${make} ${model}`, 'i');
  
  const reviews = await Review.find({ vehicle: vehicleRegex })
    .populate({
      path: 'vehicleId',
      select: 'make model variant defaultImage year'
    })
    .sort({ createdAt: -1 });

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



const getOverallRatings = asyncHandler(async (req, res) => {
  const { makeModel } = req.params;

  if (!makeModel) {
    return responses.badRequest(res, 'Make and model are required');
  }

  // Helper function to extract make and model from standardized slug
  const extractMakeAndModel = (slug) => {
    const parts = slug.split('-');
    const make = parts[0];
    const model = parts.slice(1).join(' ');
    return { make, model };
  };

  const { make, model } = extractMakeAndModel(makeModel);

  if (!make || !model) {
    return responses.badRequest(res, 'Invalid make and model format');
  }

  const vehicleRegex = new RegExp(`^${make} ${model}`, 'i');

  const overallRatings = await Review.aggregate([
    {
      $match: {
        vehicle: { $regex: vehicleRegex }
      }
    },
    {
      $group: {
        _id: null,
        mileageAvg: { $avg: '$ratings.mileage' },
        maintenanceAvg: { $avg: '$ratings.maintenance' },
        safetyAvg: { $avg: '$ratings.safety' },
        comfortAvg: { $avg: '$ratings.comfort' },
        performanceAvg: { $avg: '$ratings.performance' },
        featuresAvg: { $avg: '$ratings.features' },
        totalReviews: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        mileage: { $round: ['$mileageAvg', 1] },
        comfort: { $round: ['$comfortAvg', 1] },
        maintenance: { $round: ['$maintenanceAvg', 1] },
        safety: { $round: ['$safetyAvg', 1] },
        performance: { $round: ['$performanceAvg', 1] },
        features: { $round: ['$featuresAvg', 1] },
        totalReviews: 1,
        overallAverage: {
          $round: [
            {
              $avg: [
                '$mileageAvg',
                '$maintenanceAvg',
                '$safetyAvg',
                '$performanceAvg',
                '$featuresAvg',
                '$comfortAvg'
              ]
            },
            1
          ]
        }
      }
    }
  ]);

  if (overallRatings.length === 0) {
    return responses.notFound(res, 'No reviews found for this make and model');
  }

  return responses.ok(res, 'Overall ratings fetched successfully', overallRatings[0]);
});


export { submitReview, getAllReviews, getAllReviewsbyVehicle, getOverallRatings };
