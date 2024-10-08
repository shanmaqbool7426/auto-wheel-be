import express from 'express';
import { createVideo, getVideos, getVideoById, updateVideo, deleteVideo,browseVideos } from "./controller.js"
const router = express.Router();

router.post('/', createVideo);
router.get('/video-listing/*', getVideos);
router.get('/browse-videos', browseVideos);
router.get('/:id', getVideoById);
router.put('/:id', updateVideo);
router.delete('/:id', deleteVideo);

export default router;
