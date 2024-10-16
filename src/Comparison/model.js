import mongoose from 'mongoose';

const comparisonSchema = new mongoose.Schema({
  vehicles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NewVehicle',
      required: true
    }
  ],
  comparisonCount: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const Comparison = mongoose.model('Comparison', comparisonSchema);

export default Comparison;
