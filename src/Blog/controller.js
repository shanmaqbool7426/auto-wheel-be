import Blog from "./model.js";
import asyncHandler from "express-async-handler";
import responses from "../Utils/response.js";
import { uploadOnCloudinary } from '../Utils/cloudinary.js';
import Category from '../Category/model.js';
import Tag from '../Tag/model.js';


const createBlog = asyncHandler(async (req, res) => {
  const { title, content, author, categories, tags, isSticky, visibility, publishDate } = req.body;

  const bodyImageURL = await uploadOnCloudinary(req.file?.path)
  
  if (!title || !content  || !author || !categories) {
    return responses.badRequest(res, 'Title, content, image URL, author, and categories are required');
  }
  const categoryIds = JSON.parse(categories);
  const tagIds = tags ? JSON.parse(tags):[];
  const blog = new Blog({
    title,
    content,
    imageUrl:bodyImageURL.url,
    author,
    categories: categoryIds,
    tags: tagIds,
    isSticky: isSticky || false,
    visibility: visibility || 'Public',
    publishDate: publishDate || Date.now(),
  });

  await blog.save();

  responses.created(res, 'Blog post created successfully', blog);
});


const getBlogs = asyncHandler(async (req, res) => {
  const { 0: routePath } = req.params;
  const parts = routePath ? routePath.split('/').filter(Boolean) : [];

  // Default pagination settings
  const limit = 5;
  let currentPage = 1;

  if (parts.length === 2 && parts[0] === 'page') {
    currentPage = parseInt(parts[1]);
  }

  const skip = (currentPage - 1) * limit;

  // Helper function to handle pagination
  const paginateQuery = (query) => {
    return query.skip(skip).limit(limit).lean();
  };

  // Parallel queries for default/root route
  if (parts.length === 0 || (parts.length === 2 && parts[0] === 'page')) {
    const [featurePosts, categoryBlogs] = await Promise.all([
      Blog.find({ isSticky: true })
        .populate('categories', 'name slug')
        .populate('tags', 'name slug')
        .sort({ publishDate: -1 })
        .limit(5)
        .lean(),
      
      Blog.aggregate([
        { $unwind: "$categories" },
        {
          $lookup: {
            from: 'categories',
            localField: 'categories',
            foreignField: '_id',
            as: 'categoryDetails'
          }
        },
        { $unwind: "$categoryDetails" },
        { $sort: { publishDate: -1 } },
        {
          $group: {
            _id: "$categoryDetails._id",
            category: { $first: "$categoryDetails.name" },
            slug: { $first: "$categoryDetails.slug" },
            blogs: { $push: "$$ROOT" }
          }
        },
        {
          $project: {
            _id: 0,
            category: 1,
            slug: 1,
            blogs: { $slice: ["$blogs", 7] }
          }
        }
      ])
    ]);

    const allCategoryIds = categoryBlogs.map(category => category._id);
    
    const blogsQuery = Blog.find({ categories: { $nin: allCategoryIds } })
      .populate('categories', 'name slug')
      .populate('tags', 'name slug')
      .sort({ publishDate: -1 });

    const [blogs, totalBlogs] = await Promise.all([
      paginateQuery(blogsQuery),
      Blog.countDocuments({ categories: { $nin: allCategoryIds } })
    ]);

    const totalPages = Math.ceil(totalBlogs / limit);

    return responses.ok(res, 'Blog posts fetched successfully', {
      featurePosts,
      categories: categoryBlogs,
      blogs,
      count: totalBlogs,
      totalPages,
      currentPage,
      type: 'blogs'
    });
  }

  // Category route handling
  if (parts.length === 1 || (parts.length === 3 && parts[1] === 'page')) {
    const categorySlug = parts[0];
    if (parts.length === 3) {
      currentPage = parseInt(parts[2]);
    }

    const category = await Category.findOne({ slug: categorySlug }).lean();
    if (category) {
      const categoryBlogsQuery = Blog.find({ categories: category._id })
        .populate('categories', 'name slug description')
        .populate('tags', 'name slug')
        .sort({ publishDate: -1 });

      const [categoryBlogs, totalBlogs] = await Promise.all([
        paginateQuery(categoryBlogsQuery),
        Blog.countDocuments({ categories: category._id })
      ]);

      return responses.ok(res, 'Category blogs fetched successfully', {
        category: category.name,
        slug: category.slug,
        description:category.description,
        blogs: categoryBlogs,
        count: totalBlogs,
        totalPages: Math.ceil(totalBlogs / limit),
        currentPage,
        type: 'category'
      });
    }
  }

  // Tag route handling
  if (parts.length >= 2 && parts[0] === 'tag') {
    const tagSlug = parts[1];
    if (parts.length === 4 && parts[2] === 'page') {
      currentPage = parseInt(parts[3]);
    }

    const tag = await Tag.findOne({ slug: tagSlug }).lean();
    if (tag) {
      const tagBlogsQuery = Blog.find({ tags: tag._id })
        .populate('categories', 'name slug')
        .populate('tags', 'name slug description')
        .sort({ publishDate: -1 });

      const [tagBlogs, totalBlogs] = await Promise.all([
        paginateQuery(tagBlogsQuery),
        Blog.countDocuments({ tags: tag._id })
      ]);

      return responses.ok(res, 'Tag blogs fetched successfully', {
        tag: tag.name,
        slug: tag.slug,
        blogs: tagBlogs,
        count: totalBlogs,
        totalPages: Math.ceil(totalBlogs / limit),
        currentPage,
        type: 'tag'
      });
    }
  }

  // Single blog post route handling
  if (parts.length === 1) {
    const blogSlug = parts[0];
    const blog = await Blog.findOne({ slug: blogSlug })
      .populate('categories', 'name slug')
      .populate('tags', 'name slug')
      .lean();

    if (blog) {
      return responses.ok(res, 'Blog post fetched successfully', { blog, type: 'blog' });
    }
  }

  // If no matches, return not found
  return responses.notFound(res, 'Requested content not found');
});

const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id)
    .populate('categories', 'name')
    .populate('tags', 'name');

  if (!blog) {
    return responses.notFound(res, 'Blog post not found');
  }

  responses.ok(res, 'Blog post fetched successfully', blog);
});

const updateBlog = asyncHandler(async (req, res) => {
  const { title, content, imageUrl, author, categories, tags, isSticky, visibility, publishDate } = req.body;

  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return responses.notFound(res, 'Blog post not found');
  }
  const categoryIds = categories ?JSON.parse(categories):[];
  const tagIds = tags ? JSON.parse(tags):[];

  blog.title = title || blog.title;
  blog.content = content || blog.content;
  // blog.imageUrl = imageUrl || blog.imageUrl;
  blog.imageUrl = blog.imageUrl;
  blog.author = author || blog.author;
  blog.categories = categoryIds || blog.categories;
  blog.tags = tagIds || blog.tags;
  blog.isSticky = isSticky !== undefined ? isSticky : blog.isSticky;
  blog.visibility = visibility || blog.visibility;
  blog.publishDate = publishDate || blog.publishDate;

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
