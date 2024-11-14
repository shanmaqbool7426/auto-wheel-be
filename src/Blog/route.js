import express from "express"
import { createBlog, getBlogs,browseBlogs, getBlogById, updateBlog, deleteBlog, bulkDeleteBlogs, searchBlogs } from "./controller.js"
import {upload} from "../Middleware/multer.js"

const router = express.Router();

router.post('/',upload.single("imageUrl"),createBlog);
router.get('/blog-listing/*', getBlogs);
// router.get('/blog-listing/*', getBlogs);
router.get('/browse-blogs', browseBlogs);
router.delete('/bulk-delete', bulkDeleteBlogs);
router.get('/search', searchBlogs);
router.get('/:id', getBlogById);
router.put('/:id',upload.single("imageUrl"), updateBlog);
router.delete('/:id', deleteBlog);

export default router;
