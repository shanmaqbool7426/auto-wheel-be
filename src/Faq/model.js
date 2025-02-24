import mongoose from 'mongoose';

const VEHICLE_TYPES = ['car', 'bike', 'truck'];

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true
  },
  answer: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: VEHICLE_TYPES,
    trim: true
  },    
  status: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

faqSchema.index({ type: 1, question: 1 });

const Faq = mongoose.model('Faq', faqSchema);
export default Faq;