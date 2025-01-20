import mongoose from 'mongoose';
const reviewSchema = new mongoose.Schema({
  vehicle: {
    type: String
  },
  vehicleId: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NewVehicle"
    }
  ,
  username: { type: String },
  makeAndModel: { type: String },
  ratings: {
    mileage: { type: Number },
    maintenance: { type: Number },
    safety: { type: Number },
    comfort: { type: Number },
    features: { type: Number },
    performance: { type: Number },
  },
  title: { type: String },
  reviewBy: { type: String },
  comment: { type: String },
  overAllRating: {
    type: Number,
    required: true,
    set: v => parseFloat(v).toFixed(1),
    get: v => parseFloat(v).toFixed(1)
  },
  type: { type: String }
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review
