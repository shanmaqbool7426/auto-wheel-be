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
    origin:["http://localhost:5000"], 
    credentials: true,
  }}
app.use(cors(corsOptions));

// app.use(compression());

app.use(express.json());
app.use(express.urlencoded({limit: '50mb'}));

app.use('/api/user', authRoutes);
app.use('/api/browes-by-make', browesByMakeRoutes);
app.use('/api/browes-by-body', browesByBodyRoutes);
app.use('/api/vehicle', vehicleRoutes);

// app.use(notFound); 

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
