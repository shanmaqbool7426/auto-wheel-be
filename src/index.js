import express from "express"
import dotenv from 'dotenv';
import helmet from 'helmet';
import http from 'http';
import { Server } from 'socket.io';
// const rateLimit = require('express-rate-limit');
import cors from 'cors';
// const compression = require('compression');
import { connectDB } from './Utils/connectDB.js';
import authRoutes from './User/route.js'
import browesByMakeRoutes from './BrowesByMake/route.js'
import browesByBodyRoutes from './BrowseByBody/route.js'
import vehicleRoutes from './Vehicle/route.js'
import categoryRoutes from './Category/route.js'
import commentRoutes from './Comment/route.js'
import tagRoutes from './Tag/route.js'
import blogRoutes from './Blog/route.js'
import videoRoutes from './Videos/route.js'
import newVehicleRoutes from './NewVehicle/route.js'
import comparisonRoutes from './Comparison/route.js'
import reviewRoutes from './Review/route.js'
import userReviewRoutes from './UserReviews/route.js'
import { errorHandler } from "./Middleware/errorHandler.js"
import { uploadOnCloudinary } from "./Utils/cloudinary.js";
import morgan from "morgan"
import responses from "./Utils/response.js";
import { upload } from "./Middleware/multer.js";
import { ChatMessage } from "./Messages/model.js";
import mongoose from "mongoose";
import User from "./User/model.js";
// const { errorHandler, notFound } = require('./middleware/errorMiddleware');

dotenv.config();
connectDB();
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"], // Add your frontend URL
    methods: ["GET", "POST"],
    credentials: true
  }
});
app.use(helmet());

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
//   message: 'Too many requests from this IP, please try again after 15 minutes'
// });
// app.use('/api/', limiter);

const corsOptions = {
  "/": {
    origin: ["http://localhost:5000", "http://localhost:3000"],
    credentials: true,
  }
}
app.use(cors(corsOptions));

// app.use(compression());
app.use(morgan('combined'))

app.use(express.json());
app.use(express.urlencoded({ limit: '50mb' }));

app.use('/api/user', authRoutes);
app.use('/api/browes-by-make', browesByMakeRoutes);
app.use('/api/browes-by-body', browesByBodyRoutes);
app.use('/api/vehicle', vehicleRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/tag', tagRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/user-reviews', userReviewRoutes);
app.use('/api/video', videoRoutes);
app.use('/api/new-vehicles', newVehicleRoutes);
app.use('/api/comparison', comparisonRoutes);

app.use('/upload-image', upload.array('images', 10), async (req, res) => {
  try {
    const files = req.files; // This will contain all uploaded images
    const urls = await Promise.all(files.map(async (file) => {
      const result = await uploadOnCloudinary(file.path);
      return result.secure_url; // Return only the secure_url
    }));

    return responses.created(res, 'Images received', urls); // Return the list of uploaded URLs
  } catch (error) {
    return responses.badRequest(res, 'Image upload failed');
  }
});


// Add this function outside the io.on('connection', ...) block
async function getMessagesForConversation(userId, otherUserId) {
  try {
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const otherUserObjectId = new mongoose.Types.ObjectId(otherUserId);
    
    const messages = await ChatMessage.find({
      $or: [
        { sender: userObjectId, receiver: otherUserObjectId },
        { sender: otherUserObjectId, receiver: userObjectId }
      ]
    }).sort({ createdAt: 1 });

    return messages.map(message => ({
      id: message._id,
      content: message.content,
      sender: message.sender.toString(),
      receiver: message.receiver.toString(),
      createdAt: message.createdAt
    }));
  } catch (error) {
    console.error('Error fetching messages for conversation:', error);
    throw error;
  }
}

const connectedUsers = new Map();
const userConversations = new Map();

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('authenticate', (userId) => {
    console.log('UseFr authenticated:', userId,socket.id);
    connectedUsers.set(userId, socket.id);
    socket.userId = userId;
  });

  socket.on('get_conversations', async () => {
      try {
        const conversations = await getConversationsForUser('670b78ae88faa5acc2bbd0e4');
        socket.emit('conversations_list', conversations);
      } catch (error) { 
        socket.emit('error', { message: 'Failed to fetch conversations' });
    }
  });

  
  socket.on('send_message', async ({ sender, receiver, content }) => {
    console.log('Sending message:', { sender, receiver, content });
    try {
      const message = await ChatMessage.create({
        sender: sender,
        receiver:receiver,
        content
      });

      const messageData = {
        id: message._id,
        sender: sender,
        receiver: receiver,
        content: message.content,
        createdAt: message.createdAt
      };
      console.log('connectedUsers.get(sender)',connectedUsers.get(sender))

      // Emit to both sender and receiver
      io.emit('new_message', messageData);

      // Update conversations for both users
      const updatedConversation = await getUpdatedConversation(sender, receiver, message);
      io.to(connectedUsers.get(sender)).emit('conversation_update', updatedConversation);
      io.to(connectedUsers.get(receiver)).emit('conversation_update', updatedConversation);

    } catch (error) {
      console.error('Error sending message:', error);
      socket.emit('error', { message: 'Failed to send message' });
    }
  });


  // Add this new event handler in your io.on('connection', ...) block
socket.on('get_messages', async ({ userId, otherUserId }) => {
  try {
    console.log('get_messages')
    const messages = await getMessagesForConversation(userId, otherUserId);
    socket.emit('conversation_messages', messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    socket.emit('error', { message: 'Failed to fetch messages' });
  }
});

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    if (socket.userId) {
      connectedUsers.delete(socket.userId);
    }
  });
});
async function getConversationsForUser(userId) {
  try {
    const objectId = new mongoose.Types.ObjectId(userId);    const messages = await ChatMessage.aggregate([
      {
        $match: {
          $or: [{ sender: objectId }, { receiver: objectId }]
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ['$sender', objectId] },
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
      },
      {
        $project: {
          otherUser: {
            _id: 1,
            fullName: 1,
            email: 1
          },
          lastMessage: {
            _id: 1,
            content: 1,
            sender: 1,
            receiver: 1,
            createdAt: 1
          }
        }
      }
    ]);
    console.log('messages11',messages)
     messages.map(m => ({
      id: m._id,
      otherUser: {
        id: m.otherUser._id,
        fullName: m.otherUser.fullName,
        email: m.otherUser.email
      },
      lastMessage: {
        id: m.lastMessage._id,
        content: m.lastMessage.content,
        sender: m.lastMessage.sender,
        receiver: m.lastMessage.receiver,
        createdAt: m.lastMessage.createdAt
      }
    }));
    console.log('messages',messages)

    return messages
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }
}
async function getUpdatedConversation(senderId, receiverId, message) {
  const otherUserId = senderId === message.sender.toString() ? message.receiver : message.sender;

  console.log('otherUserId',otherUserId)
  const otherUser = await User.findById(otherUserId);
  
  return {
    id: otherUserId,
    otherUser: {
      id: otherUser._id,
      fullName: otherUser.fullName,
      email: otherUser.email
    },
    lastMessage: {
      id: message._id,
      content: message.content,
      sender: message.sender,
      receiver: message.receiver,
      createdAt: message.createdAt
    }
  };
}

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
