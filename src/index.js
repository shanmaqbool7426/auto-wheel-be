import express from "express"
import dotenv from 'dotenv';
import helmet from 'helmet';
import http from 'http';
import { Server } from 'socket.io';
const upload = multer({ storage: multer.memoryStorage() });
// const rateLimit = require('express-rate-limit');
import cors from 'cors';
// const compression = require('compression');
import { connectDB } from './Utils/connectDB.js';
import authRoutes from './User/route.js'
import browesByMakeRoutes from './BrowesByMake/route.js'
import browesByBodyRoutes from './BrowseByBody/route.js'
import chatRoutes from './Chat/route.js'
import vehicleRoutes from './Vehicle/route.js'
import categoryRoutes from './Category/route.js'
import bannerRoutes from './Banner/route.js';
import nearByLocationRoutes from './NearByLocation/route.js';
import faqRoutes from './Faq/route.js';
import footerRoutes from './Footer/route.js';
import commentRoutes from './Comment/route.js'
import tagRoutes from './Tag/route.js'
import blogRoutes from './Blog/route.js'
import videoRoutes from './Videos/route.js'
import newVehicleRoutes from './NewVehicle/route.js'
import comparisonRoutes from './Comparison/route.js'
import competitorRoutes from './Competitor/route.js'
import driveRoutes from "./Drive/route.js";
import fuelTypeRoutes from './FuelType/route.js';
import colorRoutes from './Color/route.js';
import transmissionRoutes from './Transmission/route.js';
import reviewRoutes from './Review/route.js'
import userReviewRoutes from './UserReviews/route.js'
import roleRoutes from './Roles/route.js'
import locationRoutes from './Location/route.js'
import { errorHandler } from "./Middleware/errorHandler.js"
import morgan from "morgan"
import responses from "./Utils/response.js";
// import { upload } from "./Middleware/multer.js";
import ChatMessage from "./Chat/model.js";
import mongoose from "mongoose";
import User from "./User/model.js";
import { uploadToS3 } from './Utils/s3Upload.js';
import multer from "multer";
// const { errorHandler, notFound } = require('./middleware/errorMiddleware');

dotenv.config();
connectDB();
const app = express();

const server = http.createServer(app);

// Update Socket.IO configuration with proper CORS settings
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "https://admin-auto-wheel.vercel.app",
      "https://auto-wheel-be.vercel.app",
      "https://new-auto-wheel.netlify.app",
      "https://admin-auto-wheel.vercel.app",
      "https://auto-wheel-be.vercel.app",
      "https://new-auto-wheel.netlify.app",
      "https://8111-2400-adc5-11b-d00-95c3-9ddf-7d12-1d2e.ngrok-free.app",
      "https://037a-144-48-132-249.ngrok-free.app"
    ],
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

// Update Express CORS settings to match Socket.IO
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "https://admin-auto-wheel.vercel.app",
    "https://auto-wheel-be.vercel.app",
    "https://new-auto-wheel.netlify.app",
    "https://admin-auto-wheel.vercel.app",
    "https://auto-wheel-be.vercel.app",
    "https://new-auto-wheel.netlify.app",
    "https://8111-2400-adc5-11b-d00-95c3-9ddf-7d12-1d2e.ngrok-free.app",
    "https://037a-144-48-132-249.ngrok-free.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

// app.use(compression());
app.use(morgan('combined'))

app.use(express.json());
app.use(express.urlencoded({ limit: '50mb' }));

app.use('/api/user', authRoutes);
app.use('/api/location', locationRoutes);
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
app.use('/api/roles', roleRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/near-by-location', nearByLocationRoutes);
app.use('/api/faq', faqRoutes);
app.use('/api/drive', driveRoutes);
app.use('/api/fuel-type', fuelTypeRoutes);
app.use('/api/color', colorRoutes);
app.use('/api/transmission', transmissionRoutes);
app.use('/api/competitor', competitorRoutes);
// for footer
app.use('/api/footer', footerRoutes);
// app.use('/api/upload-image', upload.array('images', 10), async (req, res) => {
//   try {
//       const files = req.files;
//       if (!files || files.length === 0) {
//           return responses.badRequest(res, 'No files were uploaded');
//       }

//       const urls = await Promise.all(files.map(async (file) => {
//           try {
//               const url = await uploadToS3(file.buffer, file.mimetype);
//               if (!url) {
//                   throw new Error('Failed to upload to S3');
//               }
//               return url;
//           } catch (uploadError) {
//               console.error(`Error uploading file: ${file.originalname}`, uploadError);
//               throw uploadError;
//           }
//       }));

//       return responses.created(res, 'Images uploaded successfully', urls);
//   } catch (error) {
//       console.error('Image upload error:', error);
//       return responses.serverError(res, 'Failed to upload images', error.message);
//   }
// });
app.post('/api/upload-image', upload.array('images', 10), async (req, res) => {
  try {
      const files = req.files;
      if (!files || files.length === 0) {
          return responses.badRequest(res, 'No files were uploaded');
      }

      const uploadPromises = files.map(file => 
          uploadToS3(file.buffer, file.originalname)
      );

      const urls = await Promise.all(uploadPromises);

      // Filter out any failed uploads
      const successfulUrls = urls.filter(url => url);

      if (successfulUrls.length === 0) {
          return responses.serverError(res, 'Failed to upload any images');
      }

      return responses.created(res, 'Images uploaded successfully', successfulUrls);

  } catch (error) {
      if (error instanceof multer.MulterError) {
          return responses.badRequest(res, 'File upload error', error.message);
      }
      console.error('Image upload error:', error);
      return responses.serverError(res, 'Failed to upload images', error.message);
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
  socket.on('authenticate', (userId) => {
    socket.userId = userId;
    socket.join(userId);
  });

  socket.on('send_message', async ({ sender, receiver, content }) => {
    try {
      const message = await ChatMessage.create({
        sender,
        receiver,
        content
      });

      const populatedMessage = await message.populate('sender receiver');
      
      // Emit to both sender and receiver
      io.to(receiver).emit('new_message', populatedMessage);
      socket.emit('new_message', populatedMessage);

    } catch (error) {
      socket.emit('error', 'Failed to send message');
    }
  });

  socket.on('disconnect', () => {
    if (socket.userId) {
      socket.leave(socket.userId);
    }
  });
});
async function getConversationsForUser(userId) {

  console.log('userId',userId)
  try {
    const objectId = new mongoose.Types.ObjectId(userId);  
      const messages = await ChatMessage.aggregate([
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
