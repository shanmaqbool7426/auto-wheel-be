import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['PROVINCE', 'CITY', 'SUBURB']
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    default: null
  }
}, {
  timestamps: true
});

const Location = mongoose.model('Location', locationSchema);
export default Location;