import asyncHandler from 'express-async-handler';

import Comparison from './model.js';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import response from '../Utils/response.js';
import { NewVehicle } from '../NewVehicle/model.js';

// Create a comparison set
export const createCompareSet = asyncHandler(async (req, res) => {
  try {
    const { vehicles, type } = req.body;

    console.log('vehicles>>>',req.body)
    if (!vehicles || !Array.isArray(vehicles) || vehicles.length < 2) {
      return response.badRequest(res, 'At least two vehicles are required');
    }

    if (!type || !['car', 'bike', 'truck'].includes(type)) {
      return response.badRequest(res, 'Valid vehicle type is required');
    }

    // Find vehicle IDs based on Info field
    const vehicleIds = await Promise.all(
      vehicles.map(async (vehicle) => {
        const query = {
          type: type,
          'Info.make': { $regex: new RegExp(`^${vehicle.make}$`, 'i') },
          'Info.model': { $regex: new RegExp(`^${vehicle.model}$`, 'i') },
        };

        // Add variant to query if provided
        if (vehicle.variant) {
          query['Info.variant'] = { $regex: new RegExp(`^${vehicle.variant}$`, 'i') };
        }

        const foundVehicle = await NewVehicle.findOne(query);
        
        if (!foundVehicle) {
          throw new Error(`Vehicle not found: ${vehicle.make} ${vehicle.model} ${vehicle.variant || ''}`);
        }

        return foundVehicle._id;
      })
    );

    // Create a unique comparison set ID
    const compareSetId = uuidv4();

    // Create the comparison set
    const compareSet = await Comparison.create({
      vehicles: vehicleIds,
      type,
      compareSetId
    });

    // // Get full vehicle details for response
    // const populatedVehicles = await NewVehicle.aggregate([
    //   { $match: { _id: { $in: vehicleIds } } },
    //   {
    //     $lookup: {
    //       from: 'reviews',
    //       localField: '_id',
    //       foreignField: 'vehicle',
    //       as: 'reviews'
    //     }
    //   },
    //   {
    //     $addFields: {
    //       averageRating: {
    //         $cond: {
    //           if: { $gt: [{ $size: '$reviews' }, 0] },
    //           then: { $round: [{ $avg: '$reviews.overAllRating' }, 1] },
    //           else: null
    //         }
    //       },
    //       reviewCount: { $size: '$reviews' }
    //     }
    //   },
    //   {
    //     $project: {
    //       _id: 1,
    //       Info: 1,  // Include Info field
    //       type: 1,
    //       year: 1,
    //       minPrice: 1,
    //       maxPrice: 1,
    //       defaultImage: 1,
    //       averageRating: 1,
    //       reviewCount: 1
    //     }
    //   }
    // ]);

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
          foreignField: 'vehicle',
          as: 'reviews'
        }
      },
      {
        $addFields: {
          averageRating: {
            $cond: {
              if: { $gt: [{ $size: '$reviews' }, 0] },
              then: { $round: [{ $avg: '$reviews.overAllRating' }, 1] },
              else: null
            }
          },
          reviewCount: { $size: '$reviews' }
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
    const { compareSetId } = req.params;

    const result = await Comparison.findOneAndDelete({ compareSetId });

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

    // Get comparison sets with populated vehicle data and view counts
    const topComparisons = await Comparison.aggregate([
      {
        $sort: { createdAt: -1 } // Sort by newest first
      },
      {
        $limit: limit
      },
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
          let: { vehicleIds: '$vehicles._id' },
          pipeline: [
            {
              $match: {
                $expr: { $in: ['$vehicle', '$$vehicleIds'] }
              }
            }
          ],
          as: 'allReviews'
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
                    reviews: {
                      $filter: {
                        input: '$allReviews',
                        as: 'review',
                        cond: { $eq: ['$$review.vehicle', '$$vehicle._id'] }
                      }
                    },
                    averageRating: {
                      $round: [
                        {
                          $avg: {
                            $map: {
                              input: {
                                $filter: {
                                  input: '$allReviews',
                                  as: 'review',
                                  cond: { $eq: ['$$review.vehicle', '$$vehicle._id'] }
                                }
                              },
                              as: 'review',
                              in: '$$review.overAllRating'
                            }
                          }
                        },
                        1
                      ]
                    },
                    reviewCount: {
                      $size: {
                        $filter: {
                          input: '$allReviews',
                          as: 'review',
                          cond: { $eq: ['$$review.vehicle', '$$vehicle._id'] }
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
          vehicles: {
            _id: 1,
            make: 1,
            model: 1,
            variant: 1,
            year: 1,
            defaultImage: 1,
            averageRating: 1,
            reviewCount: 1
          },
          createdAt: 1
        }
      }
    ]);

    response.ok(res, 'Top comparisons retrieved successfully', topComparisons);
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
    const type = req.query.type; // Optional filter by vehicle type

    // Build query conditions
    const conditions = {};
    if (type) {
      conditions.type = type;
    }

    // Get total count for pagination
    const total = await Comparison.countDocuments(conditions);

    // Get comparison sets with pagination
    const comparisons = await Comparison.aggregate([
      {
        $match: conditions
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $skip: skip
      },
      {
        $limit: limit
      },
      {
        $lookup: {
          from: 'comparisons',
          localField: 'NewVehicle',
          foreignField: '_id',
          as: 'vehicles'
        }
      },
      {
        $lookup: {
          from: 'reviews',
          let: { vehicleIds: '$vehicles._id' },
          pipeline: [
            {
              $match: {
                $expr: { $in: ['$vehicle', '$$vehicleIds'] }
              }
            }
          ],
          as: 'allReviews'
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
                    averageRating: {
                      $round: [
                        {
                          $avg: {
                            $map: {
                              input: {
                                $filter: {
                                  input: '$allReviews',
                                  as: 'review',
                                  cond: { $eq: ['$$review.vehicle', '$$vehicle._id'] }
                                }
                              },
                              as: 'review',
                              in: '$$review.overAllRating'
                            }
                          }
                        },
                        1
                      ]
                    },
                    reviewCount: {
                      $size: {
                        $filter: {
                          input: '$allReviews',
                          as: 'review',
                          cond: { $eq: ['$$review.vehicle', '$$vehicle._id'] }
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
          vehicles: {
            _id: 1,
            make: 1,
            model: 1,
            variant: 1,
            year: 1,
            defaultImage: 1,
            averageRating: 1,
            reviewCount: 1
          },
          createdAt: 1
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


// Get all comparison sets with populated vehicle data
export const getComparisonSets = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const type = req.query.type;
    
    const skip = (page - 1) * limit;
    
    // Build query conditions
    const conditions = {};
    if (type) {
      conditions.type = type;
    }

    // Get total count for pagination
    const total = await Comparison.countDocuments(conditions);

    // Get comparison sets with populated vehicle data
    const comparisons = await Comparison.find(conditions)
      .populate({
        path: 'vehicles',
        select: 'make model variant year type minPrice maxPrice defaultImage'
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    response.ok(res, 'Comparison sets retrieved successfully', {
      comparisons,
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

// ... existing code ...