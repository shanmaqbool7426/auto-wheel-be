import Blog from "./model.js";
import asyncHandler from "express-async-handler";
import responses from "../Utils/response.js";
import { uploadOnCloudinary } from '../Utils/cloudinary.js';
import Category from '../Category/model.js';
import Tag from '../Tag/model.js';
import Comment from "../Comment/model.js";


// Update the create blog function
const createBlog = asyncHandler(async (req, res) => {
  const { 
    title, 
    content, 
    author, 
    categories, 
    tags, 
    isSticky, 
    visibility, 
    publishDate,
    scheduledAt // New field
  } = req.body;

  const bodyImageURL = await uploadOnCloudinary(req.file?.path);
  
  if (!title || !content || !author || !categories) {
    return responses.badRequest(res, 'Title, content, image URL, author, and categories are required');
  }

  // Validate scheduled post
  if (visibility === 'Scheduled' && !scheduledAt) {
    return responses.badRequest(res, 'Scheduled posts require a scheduledAt date');
  }

  if (scheduledAt && new Date(scheduledAt) <= new Date()) {
    return responses.badRequest(res, 'Scheduled date must be in the future');
  }

  const categoryIds = JSON.parse(categories);
  const tagIds = tags ? JSON.parse(tags) : [];
  
  const blog = new Blog({
    title,
    content,
    imageUrl: bodyImageURL.url,
    author,
    categories: categoryIds,
    tags: tagIds,
    isSticky: isSticky || false,
    visibility,
    scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
    publishDate: (visibility === 'Public') ? (publishDate || Date.now()) : null,
  });

  await blog.save();
  responses.created(res, 'Blog post created successfully', blog);
});

const browseBlogs = asyncHandler(async (req, res) => {
  const { page = 1, limit = 5 } = req.query;

  const blogs = await Blog.find()
    .populate('categories', 'name')
    .populate('tags', 'name')
    .skip((page - 1) * limit)
    .limit(limit)
    return responses.ok(res, 'blogs fetched successfully', blogs);
})

// const getBlogs = asyncHandler(async (req, res) => {
//   const { 0: routePath } = req.params;
//   const parts = routePath ? routePath.split('/').filter(Boolean) : [];

//   // Default pagination settings
//   const limit = 5;
//   let currentPage = 1;

//   if (parts.length === 2 && parts[0] === 'page') {
//     currentPage = parseInt(parts[1]);
//   }

//   const skip = (currentPage - 1) * limit;

//   // Helper function to handle pagination
//   const paginateQuery = (query) => {
//     return query.skip(skip).limit(limit).lean();
//   };

//   // Parallel queries for default/root route
//   if (parts.length === 0 || (parts.length === 2 && parts[0] === 'page')) {
//     const [featurePosts, categoryBlogs] = await Promise.all([
//       Blog.find({ isSticky: true })
//         .populate('categories', 'name slug')
//         .populate('tags', 'name slug')
//         .sort({ publishDate: -1 })
//         .limit(5)
//         .lean(),
      
//       Blog.aggregate([
//         { $unwind: "$categories" },
//         {
//           $lookup: {
//             from: 'categories',
//             localField: 'categories',
//             foreignField: '_id',
//             as: 'categoryDetails'
//           }
//         },
//         { $unwind: "$categoryDetails" },
//         { $sort: { publishDate: -1 } },
//         {
//           $group: {
//             _id: "$categoryDetails._id",
//             category: { $first: "$categoryDetails.name" },
//             slug: { $first: "$categoryDetails.slug" },
//             blogs: { $push: "$$ROOT" }
//           }
//         },
//         {
//           $project: {
//             _id: 0,
//             category: 1,
//             slug: 1,
//             blogs: { $slice: ["$blogs", 7] }
//           }
//         }
//       ])
//     ]);

//     const allCategoryIds = categoryBlogs.map(category => category._id);
    
//     const blogsQuery = Blog.find({ categories: { $nin: allCategoryIds } })
//       .populate('categories', 'name slug')
//       .populate('tags', 'name slug')
//       .sort({ publishDate: -1 });

//     const [blogs, totalBlogs] = await Promise.all([
//       paginateQuery(blogsQuery),
//       Blog.countDocuments({ categories: { $nin: allCategoryIds } })
//     ]);

//     const totalPages = Math.ceil(totalBlogs / limit);

//     return responses.ok(res, 'Blog posts fetched successfully', {
//       featurePosts,
//       categories: categoryBlogs,
//       blogs,
//       count: totalBlogs,
//       totalPages,
//       currentPage,
//       type: 'blogs'
//     });
//   }

//   // Category route handling
//   if (parts.length === 1 || (parts.length === 3 && parts[1] === 'page')) {
//     const categorySlug = parts[0];
//     if (parts.length === 3) {
//       currentPage = parseInt(parts[2]);
//     }

//     const category = await Category.findOne({ slug: categorySlug }).lean();
//     if (category) {
//       const categoryBlogsQuery = Blog.find({ categories: category._id })
//         .populate('categories', 'name slug description')
//         .populate('tags', 'name slug')
//         .sort({ publishDate: -1 });

//       const [categoryBlogs, totalBlogs] = await Promise.all([
//         paginateQuery(categoryBlogsQuery),
//         Blog.countDocuments({ categories: category._id })
//       ]);

//       return responses.ok(res, 'Category blogs fetched successfully', {
//         category: category.name,
//         slug: category.slug,
//         description:category.description,
//         blogs: categoryBlogs,
//         count: totalBlogs,
//         totalPages: Math.ceil(totalBlogs / limit),
//         currentPage,
//         type: 'category'
//       });
//     }
//   }

//   // Tag route handling
//   if (parts.length >= 2 && parts[0] === 'tag') {
//     const tagSlug = parts[1];
//     if (parts.length === 4 && parts[2] === 'page') {
//       currentPage = parseInt(parts[3]);
//     }

//     const tag = await Tag.findOne({ slug: tagSlug }).lean();
//     if (tag) {
//       const tagBlogsQuery = Blog.find({ tags: tag._id })
//         .populate('categories', 'name slug')
//         .populate('tags', 'name slug description')
//         .sort({ publishDate: -1 });

//       const [tagBlogs, totalBlogs] = await Promise.all([
//         paginateQuery(tagBlogsQuery),
//         Blog.countDocuments({ tags: tag._id })
//       ]);

//       return responses.ok(res, 'Tag blogs fetched successfully', {
//         tag: tag.name,
//         slug: tag.slug,
//         blogs: tagBlogs,
//         count: totalBlogs,
//         totalPages: Math.ceil(totalBlogs / limit),
//         currentPage,
//         type: 'tag'
//       });
//     }
//   }

//   // Single blog post route handling
//   if (parts.length === 1) {
//     const blogSlug = parts[0];
//     const blog = await Blog.findOne({ slug: blogSlug })
//       .populate('categories', 'name slug')
//       .populate('tags', 'name slug')
//       .lean();

//     if (blog) {
//       // Fetch the latest 5 blogs excluding the current blog
//       const blogs = await Blog.find({ _id: { $ne: blog._id } })
//         .populate('categories', 'name slug')
//         .populate('tags', 'name slug')
//         .sort({ publishDate: -1 })
//         .limit(5)
//         .lean();

//       return responses.ok(res, 'Blog post fetched successfully', {
//         blog,
//         blogs,
//         type: 'blog'
//       });
//     }
//   }

//   // If no matches, return not found
//   return responses.notFound(res, 'Requested content not found');
// });

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

    // Fetch comment counts for featured posts and blogs
    const blogIds = [...blogs.map(blog => blog._id), ...featurePosts.map(blog => blog._id)];
    const commentCounts = await Comment.aggregate([
      { $match: { postId: { $in: blogIds }, status: 'approved' } },
      {
        $group: {
          _id: "$postId",
          count: { $sum: 1 }
        }
      }
    ]);

    const commentCountMap = commentCounts.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    blogs.forEach(blog => {
      blog.commentCount = commentCountMap[blog._id] || 0;
    });

    featurePosts.forEach(blog => {
      blog.commentCount = commentCountMap[blog._id] || 0;
    });

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

      // Fetch comment counts for category blogs
      const categoryBlogIds = categoryBlogs.map(blog => blog._id);
      const categoryCommentCounts = await Comment.aggregate([
        { $match: { postId: { $in: categoryBlogIds }, status: 'approved' } },
        {
          $group: {
            _id: "$postId",
            count: { $sum: 1 }
          }
        }
      ]);

      const categoryCommentCountMap = categoryCommentCounts.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {});

      categoryBlogs.forEach(blog => {
        blog.commentCount = categoryCommentCountMap[blog._id] || 0;
      });

      return responses.ok(res, 'Category blogs fetched successfully', {
        category: category.name,
        slug: category.slug,
        description: category.description,
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
  
      // Extract the blog IDs from the tagBlogs result
      const blogIds = tagBlogs.map(blog => blog._id);
  
      // Aggregate the comment counts for these blogs
      const commentCounts = await Comment.aggregate([
        { $match: { postId: { $in: blogIds }, status: 'approved' } },
        {
          $group: {
            _id: "$postId",
            count: { $sum: 1 }
          }
        }
      ]);
  
      // Create a map of comment counts for quick lookup
      const commentCountMap = commentCounts.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {});
  
      // Add commentCount to each blog
      tagBlogs.forEach(blog => {
        blog.commentCount = commentCountMap[blog._id] || 0;
      });
  
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
      // Fetch approved comments for this blog
      const comments = await Comment.find({ postId: blog._id, status: 'approved' }).sort({ createdAt: -1 }).lean();
      const commentCount = comments.length;

      // Fetch the latest 5 blogs excluding the current blog
      const blogs = await Blog.find({ _id: { $ne: blog._id } })
        .populate('categories', 'name slug')
        .populate('tags', 'name slug')
        .sort({ publishDate: -1 })
        .limit(5)
        .lean();

      // Adding comment count to the latest 5 blogs
      const relatedBlogIds = blogs.map(b => b._id);
      const relatedCommentCounts = await Comment.aggregate([
        { $match: { postId: { $in: relatedBlogIds }, status: 'approved' } },
        {
          $group: {
            _id: "$postId",
            count: { $sum: 1 }
          }
        }
      ]);

      const relatedCommentCountMap = relatedCommentCounts.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {});

      blogs.forEach(blog => {
        blog.commentCount = relatedCommentCountMap[blog._id] || 0;
      });
    // Increment the views for the main vehicle
      await Blog.findOneAndUpdate({ blogSlug }, { $inc: { viewCount: 1 } });
      return responses.ok(res, 'Blog post fetched successfully', {
        blog,
        comments,
        commentCount,
        blogs,
        type: 'blog'
      });
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


const bulkDeleteBlogs = asyncHandler(async (req, res) => {
  const { ids } = req.body;
  
  if (!Array.isArray(ids) || ids.length === 0) {
    return responses.badRequest(res, 'Please provide valid blog IDs');
  }

  // Update documents to mark them as deleted instead of removing them
  const result = await Blog.updateMany(
    { _id: { $in: ids } },
    { 
      $set: { 
        isDeleted: true,
        deletedAt: new Date()
      } 
    }
  );
  
  responses.ok(res, `Successfully marked ${result.modifiedCount} blogs as deleted`);
});
// Add search functionality
const searchBlogs = asyncHandler(async (req, res) => {
  const { 
    query = '', 
    page = 1, 
    limit = 10,
    visibility,
    sortBy = 'publishDate',
    sortOrder = 'desc',
    categories,
    tags,
    author
  } = req.query;
  
  // Validate visibility
  if (visibility && !['Public', 'Private', 'Draft'].includes(visibility)) {
    return responses.badRequest(res, 'Invalid visibility value. Must be Public, Private, or Draft');
  }

  // Validate sortBy (add all valid fields you want to allow sorting on)
  const validSortFields = ['publishDate', 'title', 'viewCount', 'createdAt', 'updatedAt'];
  if (sortBy && !validSortFields.includes(sortBy)) {
    return responses.badRequest(res, `Invalid sortBy value. Must be one of: ${validSortFields.join(', ')}`);
  }

  // Validate sortOrder
  if (sortOrder && !['asc', 'desc'].includes(sortOrder.toLowerCase())) {
    return responses.badRequest(res, 'Invalid sortOrder value. Must be asc or desc');
  }

  // Build search query object
  let searchQuery = {};
  // searchQuery.isDeleted = false;

  // Text search if query exists
  if (query?.trim()) {
    searchQuery.$or = [
      { title: { $regex: String(query), $options: 'i' } },
      { content: { $regex: String(query), $options: 'i' } }
    ];
  }

  // Add visibility filter (only if valid)
  if (visibility) {
    searchQuery.visibility = visibility;
  }

  // Add categories filter with partial text search
  if (categories?.trim()) {
    const categoryDocs = await Category.find({
      name: { $regex: categories, $options: 'i' }
    }).select('_id');
    const categoryIds = categoryDocs.map(cat => cat._id);
    searchQuery.categories = { $in: categoryIds };
  }

  // Add tags filter with partial text search
  if (tags?.trim()) {
    const tagDocs = await Tag.find({
      name: { $regex: tags, $options: 'i' }
    }).select('_id');
    const tagIds = tagDocs.map(tag => tag._id);
    searchQuery.tags = { $in: tagIds };
  }

  // Add author filter with partial text search
  if (author?.trim()) {
    searchQuery.author = { $regex: author, $options: 'i' };
  }

  // Build sort object (using validated values)
  const sortObject = {};
  sortObject[validSortFields.includes(sortBy) ? sortBy : 'publishDate'] = 
    sortOrder?.toLowerCase() === 'asc' ? 1 : -1;

  try {
    const [blogs, totalCount] = await Promise.all([
      Blog.find(searchQuery)
        .populate('categories', 'name slug')
        .populate('tags', 'name slug')
        .skip((parseInt(page) - 1) * parseInt(limit))
        .limit(parseInt(limit))
        .sort(sortObject)
        .lean(),
      Blog.countDocuments(searchQuery)
    ]);

    responses.ok(res, 'Search results fetched successfully', {
      blogs,
      total: totalCount,
      totalPages: Math.ceil(totalCount / parseInt(limit)),
      currentPage: parseInt(page),
      filters: {
        visibility,
        categories,
        tags,
        author
      },
      sorting: {
        sortBy: validSortFields.includes(sortBy) ? sortBy : 'publishDate',
        sortOrder: sortOrder?.toLowerCase() === 'asc' ? 'asc' : 'desc'
      }
    });
  } catch (error) {
    responses.serverError(res, 'Error while searching blogs', error);
  }
});
export {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  browseBlogs,
  bulkDeleteBlogs,
  searchBlogs
};
