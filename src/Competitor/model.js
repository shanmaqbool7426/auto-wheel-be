import mongoose from 'mongoose';

const competitorSchema = new mongoose.Schema({
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NewVehicle',
    required: true
  },
  competitors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NewVehicle',
    required: true
  }],
  type: {
    type: String,
    enum: ['car', 'bike', 'truck'],
    required: true
  },
  competitorSetId: {
    type: String,
    unique: true,
    required: true
  },  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Competitor = mongoose.model('Competitor', competitorSchema);
export default Competitor;