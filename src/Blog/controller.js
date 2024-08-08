import Blog from  "./model.js"
import asyncHandler from "express-async-handler"
import responses from "../Utils/response.js"


const createBlog = asyncHandler(async (req, res) => {
  const { title, content, imageUrl, author } = req.body;

  if (!title || !content || !imageUrl || !author) {
    return responses.badRequest(res, 'All fields are required');
  }

  const blog = new Blog({ title, content, imageUrl, author });
  await blog.save();

  responses.created(res, 'Blog post created successfully', blog);
});


const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find().sort({ datePublished: -1 });
  responses.ok(res, 'Blog posts fetched successfully', blogs);
});


const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return responses.notFound(res, 'Blog post not found');
  }

  responses.ok(res, 'Blog post fetched successfully', blog);
});


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
