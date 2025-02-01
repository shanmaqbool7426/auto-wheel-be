import asyncHandler from 'express-async-handler';

import Comparison from './model.js';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import response from '../Utils/response.js';
import { NewVehicle } from '../NewVehicle/model.js';
import Review from '../Review/model.js';

// Create a comparison set
export const createCompareSet = asyncHandler(async (req, res) => {
  try {
    const { vehicles, type } = req.body;

    if (!vehicles || !Array.isArray(vehicles) || vehicles.length < 2) {
      return response.badRequest(res, 'At least two vehicles are required');
    }

    if (!type || !['car', 'bike', 'truck'].includes(type)) {
      return response.badRequest(res, 'Valid vehicle type is required');
    }

    // Find vehicle IDs using the vehicle objects directly
    const vehicleIds = await Promise.all(
      vehicles.map(async (vehicle) => {
        const query = {
          type,
          make: { $regex: new RegExp(`^${vehicle.make}$`, 'i') },
          model: { $regex: new RegExp(`^${vehicle.model}$`, 'i') }
        };

        if (vehicle.variant) {
          query.variant = { $regex: new RegExp(`^${vehicle.variant}$`, 'i') };
        }

        const foundVehicle = await NewVehicle.findOne(query);
        
        if (!foundVehicle) {
          throw new Error(`Vehicle not found: ${vehicle.make} ${vehicle.model} ${vehicle.variant || ''}`);
        }
        
        return foundVehicle._id;
      })
    );

    const compareSet = await Comparison.create({
      vehicles: vehicleIds,
      type,
      compareSetId: uuidv4()
    });

    response.created(res, 'Comparison set created successfully', {
      compareSetId: compareSet.compareSetId,
    });

  } catch (error) {
    console.error('Error creating comparison set:', error);
    return response.serverError(res, error.message || 'Error creating comparison set');
  }
});
// Get comparison set by ID
export const getCompareSet = asyncHandler(async (req, res) => {
  try {
    const { compareSetId } = req.params;

    const compareSet = await Comparison.findOne({ compareSetId });

    if (!compareSet) {
      return response.notFound(res, 'Comparison set not found');
    }

    // Get detailed vehicle information with reviews
    const vehicles = await NewVehicle.aggregate([
      {
        $match: {
          _id: { $in: compareSet.vehicles }
        }
      },
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'vehicleId',
          as: 'reviews',
          pipeline: [
            {
              $project: {
                _id: 1,
                ratings: 1,
                title: 1,
                comment: 1,
                overAllRating: 1,
                reviewBy: 1,
                createdAt: 1
              }
            },
            { $sort: { createdAt: -1 } }
          ]
        }
      },
      {
        $addFields: {
          averageRatings: {
            mileage: { $avg: '$reviews.ratings.mileage' },
            maintenance: { $avg: '$reviews.ratings.maintenance' },
            safety: { $avg: '$reviews.ratings.safety' },
            comfort: { $avg: '$reviews.ratings.comfort' },
            features: { $avg: '$reviews.ratings.features' },
            performance: { $avg: '$reviews.ratings.performance' }
          },
          overallAverageRating: {
            $cond: {
              if: { $gt: [{ $size: '$reviews' }, 0] },
              then: { $round: [{ $avg: '$reviews.overAllRating' }, 1] },
              else: null
            }
          },
          reviewCount: { $size: '$reviews' }
        }
      },
      {
        $project: {
          _id: 1,
          make: 1,
          model: 1,
          variant: 1,
          type: 1,
          year: 1,
          minPrice: 1,
          maxPrice: 1,
          defaultImage: 1,
          reviews: 1,
          averageRatings: 1,
          overallAverageRating: 1,
          reviewCount: 1,
          Info: 1,
          bodyType: 1,
          colors: 1,
          description: 1,
          pros: 1,
          cons: 1
        }
      }
    ]);

    const comparisonData = {
      compareSetId: compareSet.compareSetId,
      type: compareSet.type,
      vehicles,
      createdAt: compareSet.createdAt
    };

    response.ok(res, 'Comparison set retrieved successfully', comparisonData);

  } catch (error) {
    console.error('Error retrieving comparison set:', error);
    return response.serverError(res, 'Error retrieving comparison set');
  }
});

// Delete comparison set
export const deleteCompareSet = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Comparison.findOneAndDelete({ _id: id });

    if (!result) {
      return response.notFound(res, 'Comparison set not found');
    }

    response.ok(res, 'Comparison set deleted successfully');

  } catch (error) {
    console.error('Error deleting comparison set:', error);
    return response.serverError(res, 'Error deleting comparison set');
  }
});


// ... existing imports and code ...

// Get top comparisons (most viewed/recent)
export const getTopComparisons = asyncHandler(async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6; // Default to 6 items
    // Get the most recent comparisons
    const comparisons = await Comparison.find({type: req.query.type})
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    // Get all vehicle IDs from all comparisons
    const vehicleIds = comparisons.reduce((ids, comp) => {
      return [...ids, ...comp.vehicles];
    }, []);

    // Get all vehicles
    const vehicles = await NewVehicle.find({ 
      _id: { $in: vehicleIds } 
    }).lean();

    // Get all reviews for these vehicles
    const reviews = await Review.find({ 
      vehicleId: { $in: vehicleIds } 
    }).lean();

    // Process vehicles to add review data
    const vehiclesWithReviews = vehicles.map(vehicle => {
      const vehicleReviews = reviews.filter(r => 
        r.vehicleId.toString() === vehicle._id.toString()
      );

      const reviewCount = vehicleReviews.length;
      let averageRating = null;

      if (reviewCount > 0) {
        const totalRating = vehicleReviews.reduce((sum, review) => {
          return sum + Number(review.overAllRating);
        }, 0);
        averageRating = Number((totalRating / reviewCount).toFixed(1));
      }

      return {
        _id: vehicle._id,
        make: vehicle.make,
        model: vehicle.model,
        variant: vehicle.variant,
        type: vehicle.type,
        year: vehicle.year,
        minPrice: vehicle.minPrice,
        maxPrice: vehicle.maxPrice,
        defaultImage: vehicle.defaultImage,
        views: vehicle.views || 0,
        slug: vehicle.slug,
        averageRating,
        reviewCount
      };
    });

    // Create vehicle pairs from comparisons
    const vehiclePairs = comparisons.map(comparison => {
      const vehicleArray = comparison.vehicles.map(vehicleId => 
        vehiclesWithReviews.find(v => v._id.toString() === vehicleId.toString())
      ).filter(Boolean);

      return {
        vehicle1: vehicleArray[0] || null,
        vehicle2: vehicleArray[1] || null
      };
    }).filter(pair => pair.vehicle1 && pair.vehicle2);

    response.ok(res, 'Vehicle pairs for comparison retrieved successfully', vehiclePairs);
  } catch (error) {
    console.error('Error retrieving top comparisons:', error);
    return response.serverError(res, 'Error retrieving top comparisons');
  }
});

// Get list of all comparisons with pagination
export const getComparisonsList = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const type = req.query.type;

    const conditions = {};
    if (type) conditions.type = type;

    const total = await Comparison.countDocuments(conditions);

    const comparisons = await Comparison.aggregate([
      { $match: conditions },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: 'newvehicles',
          localField: 'vehicles',
          foreignField: '_id',
          as: 'vehicles'
        }
      },
      {
        $lookup: {
          from: 'reviews',
          localField: 'vehicles._id',
          foreignField: 'vehicleId',
          as: 'reviews'
        }
      },
      {
        $addFields: {
          vehicles: {
            $map: {
              input: '$vehicles',
              as: 'vehicle',
              in: {
                $mergeObjects: [
                  '$$vehicle',
                  {
                    reviewCount: {
                      $size: {
                        $filter: {
                          input: '$reviews',
                          as: 'review',
                          cond: { $eq: ['$$review.vehicleId', '$$vehicle._id'] }
                        }
                      }
                    },
                    averageRating: {
                      $let: {
                        vars: {
                          vehicleReviews: {
                            $filter: {
                              input: '$reviews',
                              as: 'review',
                              cond: { $eq: ['$$review.vehicleId', '$$vehicle._id'] }
                            }
                          }
                        },
                        in: {
                          $cond: {
                            if: { $gt: [{ $size: '$$vehicleReviews' }, 0] },
                            then: {
                              $round: [
                                { $avg: '$$vehicleReviews.overAllRating' },
                                1
                              ]
                            },
                            else: 0
                          }
                        }
                      }
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        $project: {
          compareSetId: 1,
          type: 1,
          createdAt: 1,
          vehicles: {
            _id: 1,
            make: 1,
            model: 1,
            variant: 1,
            year: 1,
            defaultImage: 1,
            averageRating: 1,
            reviewCount: 1,
            minPrice: 1,
            maxPrice: 1
          }
        }
      }
    ]);

    response.ok(res, 'Comparisons list retrieved successfully', {
      comparisons,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit
      }
    });
  } catch (error) {
    console.error('Error retrieving comparisons list:', error);
    return response.serverError(res, 'Error retrieving comparisons list');
  }
});

export const getComparisonSets = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const type = req.query.type;
    const skip = (page - 1) * limit;
    
    const conditions = {};
    if (type) conditions.type = type;

    // Get total count
    const total = await Comparison.countDocuments(conditions);

    // Get base comparisons with pagination
    const comparisons = await Comparison.find(conditions)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get all vehicle IDs
    const vehicleIds = comparisons.reduce((ids, comp) => {
      return [...ids, ...comp.vehicles];
    }, []);

    // Get all vehicles and reviews in parallel
    const [vehicles, reviews] = await Promise.all([
      NewVehicle.find({ _id: { $in: vehicleIds } }).lean(),
      Review.find({ vehicleId: { $in: vehicleIds } }).lean()
    ]);

    // Process vehicles with reviews
    const vehiclesWithReviews = vehicles.map(vehicle => {
      const vehicleReviews = reviews.filter(r => 
        r.vehicleId.toString() === vehicle._id.toString()
      );

      const reviewCount = vehicleReviews.length;
      let averageRating = 0;

      if (reviewCount > 0) {
        const totalRating = vehicleReviews.reduce((sum, review) => 
          sum + Number(review.overAllRating), 0
        );
        averageRating = Number((totalRating / reviewCount).toFixed(1));
      }

      return {
        _id: vehicle._id,
        make: vehicle.make,
        model: vehicle.model,
        variant: vehicle.variant,
        type: vehicle.type,
        year: vehicle.year,
        minPrice: vehicle.minPrice,
        maxPrice: vehicle.maxPrice,
        defaultImage: vehicle.defaultImage,
        averageRating,
        reviewCount
      };
    });

    // Map comparisons to include processed vehicles
    const processedComparisons = comparisons.map(comparison => ({
      ...comparison,
      vehicles: comparison.vehicles.map(vehicleId =>
        vehiclesWithReviews.find(v => v._id.toString() === vehicleId.toString())
      ).filter(Boolean)
    }));

    response.ok(res, 'Comparison sets retrieved successfully', {
      comparisons: processedComparisons,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit
      }
    });
  } catch (error) {
    console.error('Error retrieving comparison sets:', error);
    return response.serverError(res, 'Error retrieving comparison sets');
  }
});

// Update a comparison set
export const updateCompareSet = asyncHandler(async (req, res) => {
  try {
    const { data } = req.body;
    const {id} = req.params
    const result = await Comparison.findByIdAndUpdate(id, data, { new: true });
    response.ok(res, 'Comparison set updated successfully', result);
  } catch (error) {
    console.error('Error updating comparison set:', error);
    return response.serverError(res, 'Error updating comparison set');
  }
});

// ... existing code ...