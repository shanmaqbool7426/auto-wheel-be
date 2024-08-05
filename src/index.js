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
import {errorHandler} from "./Middleware/errorHandler.js"
// const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware for securing HTTP headers

app.use(helmet());

// Middleware for rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
//   message: 'Too many requests from this IP, please try again after 15 minutes'
// });
// app.use('/api/', limiter);

// Enable CORS
const corsOptions = {
  "/": {
    origin:["http://localhost:5000"], // Allowed origins for the /user route
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  }}
app.use(cors(corsOptions));

// app.use(compression());

// Middleware for parsing JSON requests
app.use(express.json());
app.use(express.urlencoded({limit: '50mb'}));

// Route handlers
app.use('/api/auth', authRoutes);
app.use('/api/browes-by-make', browesByMakeRoutes);
app.use('/api/browes-by-body', browesByBodyRoutes);
app.use('/api/vehicle', vehicleRoutes);

// Middleware for handling 404 errors
// app.use(notFound);

// Middleware for handling errors
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
