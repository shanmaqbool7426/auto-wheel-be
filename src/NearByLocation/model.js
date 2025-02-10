import mongoose from 'mongoose';
import slugify from "slugify";
const nearByLocationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Nearby location title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  slug: {
    type: String,
    trim: true,
    unique: true
  },
  image: {
    type: String,
    required: [true, 'Nearby location image URL is required']
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

nearByLocationSchema.pre('save', function(next) {
    if (!this.slug || this.isModified('title')) {
      this.slug = slugify(this.title, { lower: true, strict: true });
    }
    this.updatedAt = Date.now();
    next();
  });

const NearByLocation = mongoose.model('NearByLocation', nearByLocationSchema);
export default NearByLocation;
