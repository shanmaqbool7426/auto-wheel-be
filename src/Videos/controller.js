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
const getVideosForAdmin = asyncHandler(async (req, res) => {
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


const getVideos = asyncHandler(async (req, res) => {
  const { 0: routePath } = req.params;
  const parts = routePath ? routePath.split('/').filter(Boolean) : [];

  // Default pagination settings
  const limit = 10;
  let currentPage = 1;

  if (parts.length === 3 && parts[1] === 'page') {
    currentPage = parseInt(parts[2], 10);
  }
  if (parts[0] === 'search' && parts.length === 4 && parts[2] === 'page') {
    currentPage = parseInt(parts[3], 10);
  }

  const skip = (currentPage - 1) * limit;

  // Helper function to handle pagination
  const paginateQuery = (query) => {
    return query.skip(skip).limit(limit).lean();
  };
  // Search route handling (e.g., /videos/search/{query} or /videos/search/{query}/page/{pageNumber})
  if (parts.length >= 2 && parts[0] === 'search') {
    const searchQuery = parts[1];

    // Handle pagination for search (e.g., /videos/search/{query}/page/{pageNumber})
    if (parts.length === 4 && parts[2] === 'page') {
      currentPage = parseInt(parts[3], 10);
    }

    // Search condition (title or description matches the query)
    const searchCondition = {
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } },
      ],
    };

    const searchVideosQuery = Video.find(searchCondition).sort({ dateUploaded: -1 });

    const [searchVideos, totalSearchVideos] = await Promise.all([
      paginateQuery(searchVideosQuery),
      Video.countDocuments(searchCondition),
    ]);

    const breadcrumb = [
      {
        title: `Search results for "${searchQuery}"`,
        href: `/videos/search/${searchQuery}`,
      },
    ];

    return responses.ok(res, 'Search results fetched successfully', {
      type: 'search',
      breadcrumb,
      videos: searchVideos,
      count: totalSearchVideos,
      totalPages: Math.ceil(totalSearchVideos / limit),
      currentPage,
    });
  }
  // Root or paginated root route (e.g., /videos)
  if (parts.length === 0) {
    const videosByCategory = await Video.aggregate([
      {
        $sort: { dateUploaded: -1 }, // Sort before grouping
      },
      {
        $group: {
          _id: "$category",
          categorySlug: { $first: "$categorySlug" },
          videos: { $push: "$$ROOT" }, // Group videos by category
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          categorySlug: 1,
          videos: { $slice: ["$videos", 8] }, // Limit to 8 videos per category
        },
      },
    ]);

    const totalVideos = await Video.countDocuments();

    return responses.ok(res, 'Videos fetched successfully', {
      type: 'videos',
      categories: videosByCategory,
      count: totalVideos, // Changed from totalCount to count
    });
  }

  // Category-specific route handling (e.g., /videos/owners-reviews or /videos/owners-reviews/page/2)
  if (parts.length === 1 || (parts.length === 3 && parts[1] === 'page')) {
    const categorySlug = parts[0];
    if (parts.length === 3) {
      currentPage = parseInt(parts[2], 10);
    }

    const categoryVideosQuery = Video.find({ categorySlug })
      .sort({ dateUploaded: -1 });
    const [categoryVideos, totalCategoryVideos] = await Promise.all([
      paginateQuery(categoryVideosQuery),
      Video.countDocuments({ categorySlug }),
    ]);
    const breadcrumb = [
      {
        title: categoryVideos[0]?.category,
        href: `/videos/${categorySlug}`,
      },
    ];
    return responses.ok(res, 'Category videos fetched successfully', {
      type: 'category',
      breadcrumb,
      videos: categoryVideos,
      count: totalCategoryVideos, // Changed from totalCount to count
      totalPages: Math.ceil(totalCategoryVideos / limit),
      currentPage,
    });
  }

  // Single video page route handling (e.g., /videos/owners-reviews/some-video-slug)
  if (parts.length === 2) {
    const categorySlug = parts[0];
    const videoSlug = parts[1];
    const video = await Video.findOne({ slug: videoSlug })
      .populate('category', 'name slug')
      .lean();

    if (video) {
      const breadcrumb = [
        {
          title: video?.category,
          href: `/videos/${categorySlug}`,
        },
        {
          title: video.title,
          href: `/videos/${categorySlug}/${videoSlug}`,
        },
      ];
      return responses.ok(res, 'Video fetched successfully', { video, type: 'video', breadcrumb });
    }
  }

  // If no matches, return not found
  return responses.notFound(res, 'Requested content not found');
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
  getVideosForAdmin,
  getVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  browseVideos
};
