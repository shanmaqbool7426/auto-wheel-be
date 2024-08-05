import Video from "./Video.js";
const asyncHandler = require('express-async-handler');
import responses from "Utils/responses"

// @desc Create a new video
// @route POST /api/videos
// @access Public
const createVideo = asyncHandler(async (req, res) => {
  const { title, url, thumbnail, description } = req.body;

  if (!title || !url || !thumbnail || !description) {
    return responses.badRequest(res, 'All fields are required');
  }

  const video = new Video({ title, url, thumbnail, description });
  await video.save();

  responses.created(res, 'Video created successfully', video);
});

// @desc Get all videos
// @route GET /api/videos
// @access Public
const getVideos = asyncHandler(async (req, res) => {
  const videos = await Video.find().sort({ dateUploaded: -1 });
  responses.ok(res, 'Videos fetched successfully', videos);
});

// @desc Get video by ID
// @route GET /api/videos/:id
// @access Public
const getVideoById = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (!video) {
    return responses.notFound(res, 'Video not found');
  }

  responses.ok(res, 'Video fetched successfully', video);
});

// @desc Update video
// @route PUT /api/videos/:id
// @access Public
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

// @desc Delete video
// @route DELETE /api/videos/:id
// @access Public
const deleteVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (!video) {
    return responses.notFound(res, 'Video not found');
  }

  await video.remove();

  responses.ok(res, 'Video deleted successfully');
});

export  {
  createVideo,
  getVideos,
  getVideoById,
  updateVideo,
  deleteVideo
};
