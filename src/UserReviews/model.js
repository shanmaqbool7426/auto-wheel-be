import mongoose from 'mongoose';

const userReviewSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    review: { type: String, required: true },
    rating: {
      buyingProcess: { type: Number, required: true },
      vehicleSelection: { type: Number, required: true },
      levelOfServices: { type: Number, required: true },
    },
    recommend: { type: Boolean, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dealer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const UserReview = mongoose.model('UserReview', userReviewSchema);

export default UserReview;