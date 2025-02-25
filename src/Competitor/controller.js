import Competitor from './model.js';
import { v4 as uuidv4 } from 'uuid';
import {NewVehicle} from '../NewVehicle/model.js';
import asyncHandler from 'express-async-handler';
import response from '../Utils/response.js';
import Review from '../Review/model.js';

// Create competitor
export const createCompetitor = asyncHandler(async (req, res) => {
  try {
    const { vehicle, competitors, type } = req.body;

    if (!vehicle || !competitors || !Array.isArray(competitors)) {
      return response.badRequest(res, 'Vehicle and competitors array are required');
    }

    if (!type || !['car', 'bike', 'truck'].includes(type)) {
      return response.badRequest(res, 'Valid vehicle type is required');
    }

    // Find main vehicle ID
    const mainVehicleQuery = {
      type,
      make: { $regex: new RegExp(`^${vehicle.make}$`, 'i') },
      model: { $regex: new RegExp(`^${vehicle.model}$`, 'i') }
    };

    if (vehicle.variant) {
      mainVehicleQuery.variant = { $regex: new RegExp(`^${vehicle.variant}$`, 'i') };
    }

    const mainVehicle = await NewVehicle.findOne(mainVehicleQuery);
    if (!mainVehicle) {
      throw new Error(`Vehicle not found: ${vehicle.make} ${vehicle.model} ${vehicle.variant || ''}`);
    }

    // Find competitor IDs
    const competitorIds = await Promise.all(
      competitors.map(async (competitor) => {
        const query = {
          type,
          make: { $regex: new RegExp(`^${competitor.make}$`, 'i') },
          model: { $regex: new RegExp(`^${competitor.model}$`, 'i') }
        };

        if (competitor.variant) {
          query.variant = { $regex: new RegExp(`^${competitor.variant}$`, 'i') };
        }

        const foundVehicle = await NewVehicle.findOne(query);
        
        if (!foundVehicle) {
          throw new Error(`Competitor not found: ${competitor.make} ${competitor.model} ${competitor.variant || ''}`);
        }
        
        return foundVehicle._id;
      })
    );
    console.log(uuidv4(),"uuidv4");
    const competitor = await Competitor.create({
      vehicle: mainVehicle._id,
      competitors: competitorIds,
      type,
      competitorSetId: uuidv4()
    });

    const populatedSet = await Competitor.findById(competitor._id)
      .populate('vehicle', 'make model variant year defaultImage price')
      .populate('competitors', 'make model variant year defaultImage price');

    response.created(res, 'Competitor set created successfully', {
      competitorSetId: competitor.competitorSetId,
      data: populatedSet
    });

  } catch (error) {
    console.error('Error creating competitor set:', error);
    return response.serverError(res, error.message || 'Error creating competitor set');
  }
});

// Get competitor by ID
export const getCompetitor = asyncHandler(async (req, res) => {
  try {
    const { competitorSetId } = req.params;

    const competitor = await Competitor.findOne({ competitorSetId })
      .populate('vehicle')
      .populate('competitors');

    if (!competitor) {
      return response.notFound(res, 'Competitor not found');
    }

    // Get reviews for all vehicles
    const allVehicleIds = [
      competitor.vehicle._id,
      ...competitor.competitors.map(c => c._id)
    ];

    const reviews = await Review.aggregate([
      {
        $match: { vehicleId: { $in: allVehicleIds } }
      },
      {
        $group: {
          _id: '$vehicleId',
          averageRating: { $avg: '$overAllRating' },
          reviewCount: { $sum: 1 }
        }
      }
    ]);

    const reviewsMap = new Map(reviews.map(r => [r._id.toString(), r]));

    const response = {
      vehicle: {
        ...competitor.vehicle.toObject(),
        ...getReviewData(competitor.vehicle._id, reviewsMap)
      },
      competitors: competitor.competitors.map(competitor => ({
        ...competitor.toObject(),
        ...getReviewData(competitor._id, reviewsMap)
      })),
      type: competitor.type,
      competitorSetId: competitor.competitorSetId,
      createdAt: competitor.createdAt
    };

    return response.ok(res, 'Competitor retrieved successfully', response);
  } catch (error) {
    console.error('Error retrieving competitor:', error);
    response.serverError(res, 'Error retrieving competitor');
  }
});

// Helper function to get review data
const getReviewData = (vehicleId, reviewsMap) => {
  const review = reviewsMap.get(vehicleId.toString()) || { averageRating: 0, reviewCount: 0 };
  return {
    averageRating: review.averageRating,
    reviewCount: review.reviewCount
  };
};

// Update competitor
export const updateCompetitor = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { vehicle, competitors, type } = req.body;

    if (!vehicle || !competitors || !Array.isArray(competitors)) {
      return response.badRequest(res, 'Vehicle and competitors array are required');
    }

    if (!type || !['car', 'bike', 'truck'].includes(type)) {
      return response.badRequest(res, 'Valid vehicle type is required');
    }

    // Check if competitor exists
    const existingCompetitor = await Competitor.findById(id);
    if (!existingCompetitor) {
      return response.notFound(res, 'Competitor not found');
    }

    // Find main vehicle ID
    const mainVehicleQuery = {
      type,
      make: { $regex: new RegExp(`^${vehicle.make}$`, 'i') },
      model: { $regex: new RegExp(`^${vehicle.model}$`, 'i') }
    };

    if (vehicle.variant) {
      mainVehicleQuery.variant = { $regex: new RegExp(`^${vehicle.variant}$`, 'i') };
    }

    const mainVehicle = await NewVehicle.findOne(mainVehicleQuery);
    if (!mainVehicle) {
      throw new Error(`Vehicle not found: ${vehicle.make} ${vehicle.model} ${vehicle.variant || ''}`);
    }

    // Find competitor IDs
    const competitorIds = await Promise.all(
      competitors.map(async (competitor) => {
        const query = {
          type,
          make: { $regex: new RegExp(`^${competitor.make}$`, 'i') },
          model: { $regex: new RegExp(`^${competitor.model}$`, 'i') }
        };

        if (competitor.variant) {
          query.variant = { $regex: new RegExp(`^${competitor.variant}$`, 'i') };
        }

        const foundVehicle = await NewVehicle.findOne(query);
        
        if (!foundVehicle) {
          throw new Error(`Competitor not found: ${competitor.make} ${competitor.model} ${competitor.variant || ''}`);
        }
        
        return foundVehicle._id;
      })
    );

    // Check if main vehicle is in competitors list
    if (competitorIds.some(compId => compId.toString() === mainVehicle._id.toString())) {
      return response.badRequest(res, 'Main vehicle cannot be in competitors list');
    }

    // Update the competitor
    const updatedCompetitor = await Competitor.findByIdAndUpdate(
      id,
      {
        vehicle: mainVehicle._id,
        competitors: competitorIds,
        type
      },
      { new: true }
    );

    // Get populated data
    const populatedSet = await Competitor.findById(updatedCompetitor._id)
      .populate('vehicle', 'make model variant year defaultImage price')
      .populate('competitors', 'make model variant year defaultImage price');

    response.ok(res, 'Competitor updated successfully', {
      competitorSetId: populatedSet.competitorSetId,
      data: populatedSet
    });

  } catch (error) {
    console.error('Error updating competitor:', error);
    return response.serverError(res, error.message || 'Error updating competitor');
  }
});

// Delete competitor
export const deleteCompetitor = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    
    const competitor = await Competitor.findOneAndDelete({ 
      $or: [
        { _id: id },
        { competitorSetId: id }
      ]
    });

    if (!competitor) {
      return response.notFound(res, 'Competitor not found');
    }

    response.ok(res, 'Competitor deleted successfully');
  } catch (error) {
    console.error('Error deleting competitor:', error);
    response.serverError(res, 'Error deleting competitor');
  }
});

// Get top competitors
export const getTopCompetitors = asyncHandler(async (req, res) => {
  try {
    const { type = 'car', limit = 5 } = req.query;

    const topCompetitors = await Competitor.find({ type })
      .populate('vehicle', 'make model variant year defaultImage price')
      .populate('competitors', 'make model variant year defaultImage price')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    response.ok(res, 'Top competitors retrieved successfully', topCompetitors);
  } catch (error) {
    console.error('Error retrieving top competitors:', error);
    response.serverError(res, 'Error retrieving top competitors');
  }
});

// Get list of all competitors
export const getCompetitorsList = asyncHandler(async (req, res) => {
  try {
    const { type } = req.query;
    const query = type ? { type } : {};

    const competitors = await Competitor.find(query)
      .populate('vehicle', 'make model variant')
      .populate('competitors', 'make model variant')
      .select('vehicle competitors type createdAt')
      .sort({ createdAt: -1 });

    response.ok(res, 'Competitors list retrieved successfully', competitors);
  } catch (error) {
    console.error('Error retrieving competitors list:', error);
    response.serverError(res, 'Error retrieving competitors list');
  }
});

// Get all competitor (with pagination)
export const getCompetitors = asyncHandler(async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      type = 'all',
      search = ''
    } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const query = type !== 'all' ? { type } : {};
    if (search) {
      // First, find vehicle IDs that match the search criteria
      const matchingVehicles = await NewVehicle.find({
        $or: [
          { make: { $regex: search, $options: 'i' } },
          { model: { $regex: search, $options: 'i' } }
        ]
      }).distinct('_id');

      // Add search conditions to the main query
      query.$or = [
        { vehicle: { $in: matchingVehicles } },
        { competitors: { $in: matchingVehicles } }
      ];
    }
    const totalItems = await Competitor.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limitNumber);

    const competitors = await Competitor.find(query)
      .populate('vehicle', 'make model variant year defaultImage price')
      .populate('competitors', 'make model variant year defaultImage price')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);

    response.ok(res, 'Competitors retrieved successfully', {
      competitors,
      pagination: {
        totalItems,
        totalPages,
        currentPage: pageNumber,
        itemsPerPage: limitNumber,
        hasNextPage: pageNumber < totalPages,
        hasPrevPage: pageNumber > 1
      }
    });
  } catch (error) {
    console.error('Error retrieving competitors:', error);
    response.serverError(res, 'Error retrieving competitors');
  }
});
