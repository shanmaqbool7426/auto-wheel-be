import express from "express"
import multer from "multer";

import { createBlog, getBlogs,browseBlogs, getBlogById, updateBlog, deleteBlog, bulkDeleteBlogs, searchBlogs, duplicateBlog, duplicateBlogs, getStatusCounts, getTopPerformingPosts, getLatestPosts } from "./controller.js"
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.get('/top-performing', getTopPerformingPosts);
router.get('/latest', getLatestPosts);
router.get('/status-counts', getStatusCounts);
router.post('/',upload.single("imageUrl"),createBlog);
router.get('/blog-listing/*', getBlogs);
// router.get('/blog-listing/*', getBlogs);
router.get('/browse-blogs', browseBlogs);
router.delete('/bulk-delete', bulkDeleteBlogs);
router.get('/search', searchBlogs);
router.get('/:id', getBlogById);
router.post('/duplicate/:id', duplicateBlog);
router.post('/duplicate', duplicateBlogs);
router.put('/:id',upload.single("imageUrl"), updateBlog);
router.delete('/:id', deleteBlog);

export default router;
