import express from 'express';
import { createVideo, getVideos, getVideoById, updateVideo, deleteVideo } from "./controller"
const router = express.Router();

router.post('/', createVideo);
router.get('/', getVideos);
router.get('/:id', getVideoById);
router.put('/:id', updateVideo);
router.delete('/:id', deleteVideo);

export default router;
