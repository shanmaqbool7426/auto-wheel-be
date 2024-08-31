import mongoose from "mongoose"

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true
  },
  url: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, { timestamps: true });


videoSchema.pre('save', function(next) {
  if (!this.isModified('slug')) {
    const baseSlug = `${this.title}`.toLowerCase().replace(/ /g, '-');
    this.slug = `${baseSlug}-${this._id}`;
    next();
  }
  next();
});

const Video= mongoose.model('Video', videoSchema);
export default Video;
