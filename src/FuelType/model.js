import mongoose from 'mongoose';

const fuelTypeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'FuelType title is required'],
    trim: true
  },
  type: {
    type: String,
    enum: ['car', 'bike', 'truck'],
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
fuelTypeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const FuelType = mongoose.model('FuelType', fuelTypeSchema);
export default FuelType;