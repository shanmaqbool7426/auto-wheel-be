import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: true,
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'spam', 'trash'],
    default: 'pending',
  },
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
