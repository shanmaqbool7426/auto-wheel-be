import mongoose from "mongoose"
import slugify from "slugify";
const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true
  },
  currentVideo: {
    type: Boolean,
    default: false
  },
  url: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true,
    index:true,
  },
  category: {
    type: String,
    required: true
  },
  categorySlug: {
    type: String,
    index: true,
  },
  thumbnail: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, { timestamps: true });

videoSchema.pre('save', function(next) {
  if (!this.slug || this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  if (!this.categorySlug || this.isModified('category')) {
    this.categorySlug = slugify(this.category, { lower: true, strict: true });
  }
  next();
});
const Video= mongoose.model('Video', videoSchema);
export default Video;
