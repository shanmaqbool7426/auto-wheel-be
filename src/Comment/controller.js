import asyncHandler from 'express-async-handler';
import Comment from './model.js';

import responses from '../Utils/response.js';

export const createComment = asyncHandler(async (req, res) => {
  const { name, email, content, postId, parentComment } = req.body;

  const comment = new Comment({
    name,
    email,
    content,
    postId,
    parentComment: parentComment || null,
  });

  await comment.save();
  return responses.created(res, 'Comment created successfully', comment);
});

export const getAllComments = asyncHandler(async (req, res) => {
  const { status } = req.query; 
  const filter = status ? { status } : {};

  const comments = await Comment.find(filter)
    .populate('postId', 'title')
    .populate('parentComment', 'content');

  return responses.ok(res, 'Comments fetched successfully', comments);
});

export const getCommentStats = asyncHandler(async (req, res) => {
  const stats = await Promise.all([
    Comment.countDocuments({}),
    Comment.countDocuments({ status: 'mine' }),
    Comment.countDocuments({ status: 'pending' }),
    Comment.countDocuments({ status: 'approved' }),
    Comment.countDocuments({ status: 'spam' }),
    Comment.countDocuments({ status: 'trash' })
  ]);

  return responses.ok(res, 'Stats retrieved successfully', {
    all: stats[0],
    mine: stats[1],
    pending: stats[2],
    approved: stats[3],
    spam: stats[4],
    trash: stats[5]
  });
});

export const bulkUpdateStatus = asyncHandler(async (req, res) => {
  const { commentIds, status } = req.body;

  if (!Array.isArray(commentIds) || !status) {
    return responses.badRequest(res, 'Invalid request parameters');
  }

  const result = await Comment.updateMany(
    { _id: { $in: commentIds } },
    { $set: { status } }
  );

  return responses.ok(res, 'Comments updated successfully', result);
});

export const replyToComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { replyMessage } = req.body;

  const comment = await Comment.findById(id);

  if (!comment) {
    return responses.notFound(res, 'Comment not found');
  }

  comment.replyMessage = replyMessage;
  await comment.save();

  return responses.ok(res, 'Reply added successfully', comment);
});

export const getFilteredComments = asyncHandler(async (req, res) => {
  const {
    status,
    page = 1,
    limit = 30,
    sortBy = 'submittedOn',
    sortOrder = 'desc',
    search,
    startDate,
    endDate
  } = req.query;

  // Build query object
  const query = { isDeleted: false };

  // Status filter
  if (status && status !== 'all') {
    query.status = status;
  }

  // Search filter (searches in content, author name, and email)
  if (search) {
    query.$or = [
      { content: { $regex: search, $options: 'i' } },
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }

  // Date range filter
  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) {
      query.createdAt.$gte = new Date(startDate);
    }
    if (endDate) {
      query.createdAt.$lte = new Date(endDate + 'T23:59:59.999Z');
    }
  }

  const skip = (page - 1) * limit;
  const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

  try {
    const [comments, total] = await Promise.all([
      Comment.find(query)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .populate('parentComment', 'content')
        .populate('postId', 'title'),
      Comment.countDocuments(query)
    ]);

    return responses.ok(res, 'Comments retrieved successfully', {
      comments,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      },
      filters: {
        status,
        search,
        dateRange: startDate || endDate ? { startDate, endDate } : null
      }
    });
  } catch (error) {
    // Log the error for debugging
    console.error('Filter query error:', error);
    return responses.error(res, 'Error retrieving comments', error);
  }
});



export const bulkSoftDelete = asyncHandler(async (req, res) => {
  const { commentIds } = req.body;

  // Validate input
  if (!Array.isArray(commentIds) || commentIds.length === 0) {
    return responses.badRequest(res, 'Please provide valid comment IDs');
  }

  try {
    // Perform bulk soft delete
    const result = await Comment.updateMany(
      { _id: { $in: commentIds } },
      {
        $set: {
          isDeleted: true,
          deletedAt: new Date(),
          status: 'trash'
        }
      }
    );

    return responses.ok(res, 'Comments deleted successfully', {
      deletedCount: result.modifiedCount,
      totalRequested: commentIds.length
    });

  } catch (error) {
    console.error('Bulk delete error:', error);
    return responses.error(res, 'Error performing bulk delete');
  }
});
export const getCommentById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const comment = await Comment.findById(id)
    .populate('postId', 'title')
    .populate('parentComment', 'content');

  if (!comment) {
    return responses.notFound(res, 'Comment not found');
  }

  return responses.ok(res, 'Comment fetched successfully', comment);
});

export const updateComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const comment = await Comment.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  if (!comment) {
    return responses.notFound(res, 'Comment not found');
  }

  return responses.ok(res, 'Comment updated successfully', comment);
});

export const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const comment = await Comment.findByIdAndDelete(id);

  if (!comment) {
    return responses.notFound(res, 'Comment not found');
  }

  return responses.ok(res, 'Comment deleted successfully', comment);
});
