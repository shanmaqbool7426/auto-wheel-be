import express from "express"
import dotenv from 'dotenv';
import helmet from 'helmet';
// const rateLimit = require('express-rate-limit');
import cors from 'cors';
// const compression = require('compression');
import {connectDB} from './Utils/connectDB.js';
import authRoutes from './User/route.js'
import browesByMakeRoutes from './BrowesByMake/route.js'
import browesByBodyRoutes from './BrowseByBody/route.js'
import vehicleRoutes from './Vehicle/route.js'
import categoryRoutes from './Category/route.js'
import commentRoutes from './Comment/route.js'
import tagRoutes from './Tag/route.js'
import blogRoutes from './Blog/route.js'
import videoRoutes from './Videos/route.js'
import reviewRoutes from './Review/route.js'
import {errorHandler} from "./Middleware/errorHandler.js"
import { uploadOnCloudinary } from "./Utils/cloudinary.js";
import morgan from "morgan"
import responses from "./Utils/response.js";
import { upload } from "./Middleware/multer.js";
// const { errorHandler, notFound } = require('./middleware/errorMiddleware');

dotenv.config();
connectDB();
const app = express();
app.use(helmet());

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
//   message: 'Too many requests from this IP, please try again after 15 minutes'
// });
// app.use('/api/', limiter);

const corsOptions = {
  "/": {
    origin:["http://localhost:5000","http://localhost:3000"], 
    credentials: true,
  }}
app.use(cors(corsOptions));

// app.use(compression());
app.use(morgan('combined'))

app.use(express.json());
app.use(express.urlencoded({limit: '50mb'}));

app.use('/api/user', authRoutes);
app.use('/api/browes-by-make', browesByMakeRoutes);
app.use('/api/browes-by-body', browesByBodyRoutes);
app.use('/api/vehicle', vehicleRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/tag', tagRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/video', videoRoutes);

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


app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
