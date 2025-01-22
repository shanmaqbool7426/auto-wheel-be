import Video from "./model.js";
import asyncHandler from 'express-async-handler';
import responses from "../Utils/response.js";


const createVideo = asyncHandler(async (req, res) => {
  const { title, url, thumbnail, category, description } = req.body;
  if (!title || !url || !thumbnail || !description || !category) {
    return responses.badRequest(res, 'All fields are required');
  }

  const video = new Video({ title, url, thumbnail, description, category });
  await video.save();

  responses.created(res, 'Video created successfully', video);
});


const browseVideos = asyncHandler(async (req, res) => {
  const { slug, search } = req.query;

  try {
    let currentVideo = null;
    let suggestions = [];

    if (slug) {
      // Fetch the video by slug and related videos from the same category
      currentVideo = await Video.findOne({ slug });

      if (!currentVideo) {
        return responses.notFound(res, 'Video not found');
      }

      // Fetch related videos in the same category (excluding the current video)
      suggestions = await Video.find({
        category: currentVideo.category,
        _id: { $ne: currentVideo._id },
      }).limit(4);
    } else if (search) {
      // Fetch videos by search query
      const videos = await Video.find({ title: new RegExp(search, 'i') }).sort({ dateUploaded: -1 });

      if (videos.length === 0) {
        return responses.notFound(res, 'No videos found for the search query');
      }

      // Set the first video from the search results as the current video
      currentVideo = videos[0];

      // Fetch related videos in the same category (excluding the current video)
      suggestions = await Video.find({
        category: currentVideo.category,
        _id: { $ne: currentVideo._id },
      }).limit(4);
    } else {
      // Fetch the latest video
      currentVideo = await Video.findOne().sort({ createdAt: -1 });

      if (!currentVideo) {
        return responses.notFound(res, 'No videos found');
      }

      // Fetch related videos in the same category (excluding the current video)
      suggestions = await Video.find({
        category: currentVideo.category,
        _id: { $ne: currentVideo._id },
      }).limit(4);
    }

    return responses.ok(res, 'Video and suggestions fetched successfully', {
      currentVideo,
      suggestions,
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return responses.serverError(res, 'An error occurred while fetching videos');
  }
});
const getVideos = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search?.trim() || '';
    const category = req.query.category?.trim() || '';

    // Build search condition
    const condition = {};
    
    // Improved search condition for partial matches
    if (search) {
      // Split search terms and create a regex pattern that matches any word
      const searchTerms = search.split(' ').filter(term => term.length > 0);
      const searchPattern = searchTerms
        .map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        .join('|');
      
      condition.$or = [
        { title: { $regex: searchPattern, $options: 'i' } },
        { description: { $regex: searchPattern, $options: 'i' } },
        { categorySlug: { $regex: searchPattern, $options: 'i' } }    
      ];
    }

    // Add category filter if provided
    if (category) {
      condition.categorySlug = { $regex: new RegExp(category, 'i') }; // Case-insensitive match for category
    }


    console.log("category>", condition.category);  
    // Calculate skip for pagination
    const skip = (page - 1) * limit;

    // Get videos and total count
    const [videos, totalVideos] = await Promise.all([
      Video.find(condition)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Video.countDocuments(condition)
    ]);

    // Log for debugging
    console.log('Search Query:', search);
    console.log('Category Filter:', category);
    console.log('Search Condition:', condition);
    console.log('Found Videos:', videos.length);

    return responses.ok(res, 'Videos fetched successfully', {
      data: videos,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalVideos / limit),
        totalItems: totalVideos,
        limit
      }
    });

  } catch (error) {
    console.error('Error fetching videos:', error);
    return responses.serverError(res, 'Error fetching videos');
  }
});

const getVideoById = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (!video) {
    return responses.notFound(res, 'Video not found');
  }

  responses.ok(res, 'Video fetched successfully', video);
});


const updateVideo = asyncHandler(async (req, res) => {
  const { title, url, thumbnail, description } = req.body;

  const video = await Video.findById(req.params.id);

  if (!video) {
    return responses.notFound(res, 'Video not found');
  }

  video.title = title || video.title;
  video.url = url || video.url;
  video.thumbnail = thumbnail || video.thumbnail;
  video.description = description || video.description;

  await video.save();

  responses.ok(res, 'Video updated successfully', video);
});


const deleteVideo = asyncHandler(async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return responses.notFound(res, 'Video not found');
    }

    // Use findByIdAndDelete instead of remove() as it's deprecated
    await Video.findByIdAndDelete(req.params.id);

    return responses.ok(res, 'Video deleted successfully');
  } catch (error) {
    console.error('Error deleting video:', error);
    
    if (error.name === 'CastError') {
      return responses.badRequest(res, 'Invalid video ID format');
    }

    return responses.serverError(res, 'Error occurred while deleting video');
  }
});

export {
  createVideo,
  getVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  browseVideos
};
