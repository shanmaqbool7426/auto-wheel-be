import asyncHandler from 'express-async-handler';
import Message from './model.js';
import User from '../User/model.js';
import responses from '../Utils/response.js';

const sendMessage = asyncHandler(async (req, res) => {
  const { receiverId, content } = req.body;
  const senderId = req.user._id;

  const receiver = await User.findById(receiverId);
  if (!receiver) {
    return responses.notFound(res, 'Receiver not found');
  }

  const message = await Message.create({
    sender: senderId,
    receiver: receiverId,
    content
  });

  return responses.created(res, 'Message sent successfully', message);
});

const getConversation = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const currentUserId = req.user._id;

  const messages = await Message.find({
    $or: [
      { sender: currentUserId, receiver: userId },
      { sender: userId, receiver: currentUserId }
    ]
  }).sort({ createdAt: 1 });

  return responses.ok(res, 'Conversation retrieved successfully', messages);
});

const getConversationList = asyncHandler(async (req, res) => {
  const currentUserId = req.user._id;

  const conversations = await Message.aggregate([
    {
      $match: {
        $or: [{ sender: currentUserId }, { receiver: currentUserId }]
      }
    },
    {
      $sort: { createdAt: -1 }
    },
    {
      $group: {
        _id: {
          $cond: [
            { $eq: ['$sender', currentUserId] },
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
        as: 'user'
      }
    },
    {
      $unwind: '$user'
    },
    {
      $project: {
        _id: 1,
        'user.fullName': 1,
        'user.email': 1,
        'lastMessage.content': 1,
        'lastMessage.createdAt': 1,
        'lastMessage.read': 1
      }
    }
  ]);

  return responses.ok(res, 'Conversation list retrieved successfully', conversations);
});

export { sendMessage, getConversation, getConversationList };