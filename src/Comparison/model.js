import mongoose from 'mongoose';

const compareSetSchema = new mongoose.Schema({
  vehicles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NewVehicle',
    required: true
  }],
  type: {
    type: String,
    enum: ['car', 'bike', 'truck'],
    required: true
  },
  compareSetId: {
    type: String,
    unique: true,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 7 * 24 * 60 * 60 // Documents will be automatically deleted after 7 days
  }
});

const CompareSet = mongoose.model('Comparison', compareSetSchema);
export default CompareSet;