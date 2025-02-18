import mongoose from 'mongoose';

const driveSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Drive title is required'],
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
driveSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Drive = mongoose.model('Drive', driveSchema);
export default Drive;