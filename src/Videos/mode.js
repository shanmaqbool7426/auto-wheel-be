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

const Video= mongoose.model('Video', videoSchema);
export default Video;
