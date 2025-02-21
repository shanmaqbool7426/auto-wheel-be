import asyncHandler from 'express-async-handler';
import responses from '../Utils/response.js';
import ChatMessage from './model.js';
import mongoose from 'mongoose';

export const getConversationsList = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  
  const conversations = await ChatMessage.aggregate([
    {
      $match: {
        $or: [{ sender: userId }, { receiver: userId }]
      }
    },
    {
      $sort: { createdAt: -1 }
    },
    {
      $group: {
        _id: {
          $cond: [
            { $eq: ['$sender', userId] },
            '$receiver',
            '$sender'
          ]
        },
        lastMessage: { $first: '$$ROOT' }
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'otherUser'
      }
    },
    {
      $unwind: '$otherUser'
    }
  ]);

  return responses.ok(res, 'Conversations fetched successfully', conversations);
});

export const getMessages = asyncHandler(async (req, res) => {
  console.log('getMessages')
  const { otherUserId } = req.params;
  const userId = req.user._id;
console.log(`getMessages`, userId, otherUserId)

  const messages = await ChatMessage.find({
    $or: [
      { sender: userId, receiver: otherUserId },
      { sender: otherUserId, receiver: userId }
    ]
  })
  .sort({ createdAt: 1 })
  .populate('sender receiver', 'fullName email');

  return responses.ok(res, 'Messages fetched successfully', messages);
});

export const markMessagesAsRead = asyncHandler(async (req, res) => {
  const { otherUserId } = req.params;
  const userId = req.user._id;

  await ChatMessage.updateMany(
    {
      sender: otherUserId,
      receiver: userId,
      read: false
    },
    {
      $set: { read: true }
    }
  );

  return responses.ok(res, 'Messages marked as read');
});