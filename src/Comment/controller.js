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
