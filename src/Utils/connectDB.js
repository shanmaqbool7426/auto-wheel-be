import mongoose from 'mongoose';
// let Uri="mongodb+srv://s-booking-app:S-booking-app@booking-app.xb4efkw.mongodb.net"
let Uri="mongodb+srv://auto-wheel-apps:AutoWheels123@auto-wheels.m4wrf.mongodb.net"
// let Uri='mongodb://127.0.0.1:27017/auto-wheels'

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    await mongoose.connect(Uri);
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err);
    
    process.exit(1);
  }
};



export   {connectDB};