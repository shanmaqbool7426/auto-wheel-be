import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dealer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  buyingProcess: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  vehicleSelection: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  levelOfServices: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  dislikes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, { timestamps: true });

const Review = mongoose.model('userReview', reviewSchema);
export default Review;