import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
    maxlength: 150
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
    maxlength: 150
  },
  description: {
    type: String,
    default:'',
    maxlength: 500
  }
}, { timestamps: true });

const Tag = mongoose.model('Tag', tagSchema);
export default Tag;
