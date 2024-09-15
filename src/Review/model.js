import mongoose from 'mongoose';
const reviewSchema = new mongoose.Schema({
  vehicle: {    
    type: mongoose.Schema.Types.ObjectId,
    ref: "NewVehicle"

  },
  username: { type: String },
  ratings: {
    mileage: { type: Number},
    maintenance: { type: Number },
    safety: { type: Number },
    comfort: { type: Number },
    features: { type: Number },
    performance: { type: Number },
  },
  title: { type: String},
  comment: { type: String },
  overAllRating: { type: String },
type:{type: String}
},{timestamps: true});

const Review= mongoose.model('Review', reviewSchema);

export default Review
