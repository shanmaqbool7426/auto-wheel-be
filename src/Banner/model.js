import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Banner title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Banner description is required'],
    trim: true
  },
  link: {
    type: String,
    required: [true, 'Banner link is required'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Banner image URL is required']
  },
  status: {
    type: Boolean,
    default: true
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
bannerSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Banner = mongoose.model('Banner', bannerSchema);
export default Banner;
