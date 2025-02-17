import express from 'express';
import { createVideo, getVideos, getVideoById, updateVideo, deleteVideo,browseVideos, getVideosForAdmin } from "./controller.js"
const router = express.Router();

router.get('/video-listing/*', getVideos);
router.get('/listing', getVideosForAdmin);
router.post('/', createVideo);
router.get('/browse-videos', browseVideos);
router.get('/:id', getVideoById);
router.put('/:id', updateVideo);
router.delete('/:id', deleteVideo);

export default router;
