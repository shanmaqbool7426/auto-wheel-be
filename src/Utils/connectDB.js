import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    await mongoose.connect('mongodb+srv://s-booking-app:S-booking-app@booking-app.xb4efkw.mongodb.net');
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export   {connectDB};
