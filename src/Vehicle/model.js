import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({

  make: {
    type: String,
    required: true,
    index: true
  },
  model: {
    type: String,
    required: true,
    index: true
  },
  carInfo:{
     make: {
      type: String,
      required: true,
    
    },
    model: {
      type: String,
         required: true,
    },
    variant: {
      type: String,
    }
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear() + 1,
    index: true,  // for faster searching
  },
  type: {
    type: String,
    enum: ['car', 'bike', 'truck'],
    required: true,
    index: true
  },
  condition: {
    type: String,
    enum: ['used', 'new', 'certified'],
    required: true,
    index: true
  },
  city: {
    type: String,
    required: true,
    index: true,
  },
  cityArea: {
    type: String,
    required: true,
    index: true,
  },
  registeredIn: {
    type: String,
    enum: ['Registered', 'Un-Registered',"punjab","Sindh","karachi"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
  },

 specifications: {
    stockId: { type: String, index: true },
    bodyType: { type: String, index: true },
    fuelType: { type: String, index: true },
    engine: { type: String, index: true },
    mileage: { type: Number, index: true },
    transmission: { type: String, index: true },
    drive: { type: String, index: true },
    vin: { type: String, index: true },
    exteriorColor: { type: String, index: true },
    interiorColor: { type: String, index: true },
    doors: { type: Number, min: 2, max: 5 },
    seats: { type: Number, min: 1, max: 9 },
    engineCapacity: { type: Number, min: 50, max: 1500 },
    payloadCapacity: { type: Number, min: 500, max: 50000 },
    engineType: { type: String },
    assembly: { type: String },
  },
  features: {
    type: [String],
    index: true,
  },
  sellerNotes: {
    type: String
  },
  defaultImage: {
    type: String,
    default: 'https://via.placeholder.com/300x200'
  },
  images: {
    type: [String]
  },

  views: {
    type: Number,
    default: 0,
  },
  slug: {
    type: String,
    unique: true,
    index: true,
  },
  releaseDate: {
    type: Date,

  },
  startPrice:{
    type: Number,
    required: true,
    min: 0,
  },
  endPrice:{
    type: Number,
    required: true,
    min: 0,
  },
  contactInfo: {
    mobileNumber: {
      type: String,
      required: true,
      match: /^[0-9]{11}$/
    },
    secondaryNumber: {
      type: String,
      match: /^[0-9]{11}$/
    },
    allowWhatsAppContact: {
      type: Boolean,
      default: false
    }
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
}, { timestamps: true });
vehicleSchema.pre('save', function (next) {
  if (!this.isModified('slug')) {
    const baseSlug = `${this.carInfo.make}-${this.carInfo.model}-${this.year}`.toLowerCase().replace(/ /g, '-');
    this.slug = `${baseSlug}-${this._id}`;
    next();
  }
});


vehicleSchema.index({ city: 1, carInfo: 1, 'specifications.fuelType': 1 });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;
