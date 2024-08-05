import Blog from  "./model.js"
import asyncHandler from "express-async-handler"
import responses from "../Utils/response.js"

// @desc Create a new blog post
// @route POST /api/blogs
// @access Public
const createBlog = asyncHandler(async (req, res) => {
  const { title, content, imageUrl, author } = req.body;

  if (!title || !content || !imageUrl || !author) {
    return responses.badRequest(res, 'All fields are required');
  }

  const blog = new Blog({ title, content, imageUrl, author });
  await blog.save();

  responses.created(res, 'Blog post created successfully', blog);
});

// @desc Get all blog posts
// @route GET /api/blogs
// @access Public
const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find().sort({ datePublished: -1 });
  responses.ok(res, 'Blog posts fetched successfully', blogs);
});

// @desc Get blog post by ID
// @route GET /api/blogs/:id
// @access Public
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return responses.notFound(res, 'Blog post not found');
  }

  responses.ok(res, 'Blog post fetched successfully', blog);
});

// @desc Update blog post
// @route PUT /api/blogs/:id
// @access Public
const updateBlog = asyncHandler(async (req, res) => {
  const { title, content, imageUrl, author } = req.body;

  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return responses.notFound(res, 'Blog post not found');
  }

  blog.title = title || blog.title;
  blog.content = content || blog.content;
  blog.imageUrl = imageUrl || blog.imageUrl;
  blog.author = author || blog.author;

  await blog.save();

  responses.ok(res, 'Blog post updated successfully', blog);
});

// @desc Delete blog post
// @route DELETE /api/blogs/:id
// @access Public
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return responses.notFound(res, 'Blog post not found');
  }

  await blog.remove();

  responses.ok(res, 'Blog post deleted successfully');
});

export {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog
};
