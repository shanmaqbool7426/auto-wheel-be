import mongoose from 'mongoose';
// mongodb+srv://s-booking-app:S-booking-app@booking-app.xb4efkw.mongodb.net

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    await mongoose.connect('mongodb://127.0.0.1:27017/auto-wheels');
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export   {connectDB};
