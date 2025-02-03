import mongoose from 'mongoose';

const footerSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true
  },
  section: {
    type: String,
    trim: true
  },
  vehicleType:{
    type: String,
    trim: true
  },
  url: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    trim: true
  },
  order: {
    type: Number,
    default: 0
  },
  status: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Add index for order within each category
footerSchema.index({ category: 1, order: 1 });

const Footer = mongoose.model('Footer', footerSchema);

export default Footer;
