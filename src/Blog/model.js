import mongoose from "mongoose";
import slugify from "slugify";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true
  },
  slug: {
    type: String,
    unique: true,
    index:true,
  },
  content: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }],
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag',
  }],
  isSticky: {
    type: Boolean,
    default: false
  },
  visibility: {
    type: String,
    enum: ['Public', 'Private', 'Draft', 'Scheduled'],
    default: 'Public'
  },
  publishDate: {
    type: Date,
    default: Date.now
  },
  scheduledAt: {
    type: Date,
    default: null
  },
  isDeleted:{
    type: Boolean,
    default: false
  },
  deletedAt:{
    type: Date,
    default: null
  },
  viewCount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });


blogSchema.pre('save', function(next) {
  if (!this.slug || this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

   // Handle scheduled posts
   if (this.visibility === 'Scheduled' && this.scheduledAt) {
    const now = new Date();
    if (this.scheduledAt <= now) {
      this.visibility = 'Public';
      this.publishDate = now;
    }
  }
  next();
});

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
