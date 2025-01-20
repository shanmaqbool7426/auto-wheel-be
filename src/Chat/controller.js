import asyncHandler from 'express-async-handler';
import User from '../User/model.js';
import responses from '../Utils/response.js';
import ChatMessage from './model.js';
import mongoose from 'mongoose';

const sendMessage = asyncHandler(async (req, res) => {
  const { receiverId, content } = req.body;
  const senderId = req.user._id;

  
  const receiver = await User.findById(receiverId);
  if (!receiver) {
    return responses.notFound(res, 'Receiver not found');
  }

  
  const message = await ChatMessage.create({
    sender: senderId,
    receiver: receiverId,
    content
  });

  return responses.created(res, 'Message sent successfully', message);
});

const getConversation = asyncHandler(async (req, res) => {
  const { userId, currentUserId } = req.body;
  const { conversationId } = req.params;
  
  // Use currentUserId if available, otherwise use conversationId
  const participantId = currentUserId || conversationId;
  
  const messages = await ChatMessage.find({
    $or: [
      { 
        sender: new mongoose.Types.ObjectId(participantId), 
        receiver: new mongoose.Types.ObjectId(userId) 
      },
      { 
        sender: new mongoose.Types.ObjectId(userId), 
        receiver: new mongoose.Types.ObjectId(participantId) 
      }
    ]
  })
  .sort({ createdAt: 1 })
  .populate('sender', 'fullName email')
  .populate('receiver', 'fullName email');

  if (!messages || messages.length === 0) {
    return responses.ok(res, 'No messages found', []);
  }

  return responses.ok(res, 'Conversation retrieved successfully', messages);
});
const getConversationList = asyncHandler(async (req, res) => {
  const currentUserId = req.params.userId;

  const conversations = await ChatMessage.aggregate([
    {
      $match: {
        $or: [{ sender: new mongoose.Types.ObjectId(currentUserId) }, { receiver: new mongoose.Types.ObjectId(currentUserId) }]
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