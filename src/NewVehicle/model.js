import mongoose from 'mongoose';
import slugify from "slugify";

const newVehicleSchema = new mongoose.Schema({
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
  varient: {
    type: String,
    required: true,
    index: true
  },
  Info:{
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
     required: true,
   }
 },
 type: {
    type: String,
    enum: ['car', 'bike', 'truck'],
    required: true,
    index: true
  },
 releaseDate: {
    type: Date,
    default: new Date()
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear() + 1,
    index: true
  },
  minPrice: {
    type: Number,
    required: true,
    min: 0
  },
  maxPrice: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true,
  },
  defaultImage: {
    type: String,
    default: 'https://via.placeholder.com/300x200'
  },
  images: {
    type: [String]
  },
  dimensions: {
    overallLength: { type: String },  // e.g., "12′ 7″"
    overallWidth: { type: String },   // e.g., "5′ 8″"
    overallHeight: { type: String },  // e.g., "64′ 12″"
    wheelBase: { type: String },      // e.g., "8′ 0″"
    groundClearance: { type: String },// e.g., "6″"
    kerbWeight: { type: String },     // e.g., "895 Kg"
    bootSpace: { type: String },      // e.g., "265 L"
    seatingCapacity: { type: Number },// e.g., 5
    doors: { type: Number }           // e.g., 4
  },
  mileage: {
    city: { type: String },  // e.g., "12 Km/l"
    highway: { type: String }  // e.g., "15 Km/l"
  },
  engine: {
    type: { type: String, required: true },  // e.g., "Petrol"
    displacement: { type: Number, required: true },  // e.g., "1197 cc"
    horsepower: { type: String },  // e.g., "81.8hp @ 6000 RPM"
    torque: { type: String },  // e.g., "113 Nm @ 4200 RPM"
    maxSpeed: { type: String },  // e.g., "220 Km/h"
    cylinderConfiguration: { type: String },  // e.g., "In Line"
    compressionRatio: { type: String },  // e.g., "11:1"
    valvesPerCylinder: { type: Number },  // e.g., 4
    valveMechanism: { type: String },  // e.g., "16-valve DOHC"
    batteryType: { type: String },  // Electrical (Optional)
    batteryCapacity: { type: String },  // e.g., "45 Ah"
    chargingTime: { type: String },  // Electrical (Optional)
    range: { type: String }  // Electrical (Optional)
  },
  transmission: {
    type: { type: String, default: 'Automatic' },  // e.g., "Automatic"
    cvt: { type: Boolean, default: false }
  },
  suspensionSteeringBrakes: {
    steeringType: { type: String },  // e.g., "Rack and Pinion"
    powerAssisted: { type: String },  // e.g., "Electric Power Steering"
    minimumTurningRadius: { type: Number },  // e.g., "4.8"
    frontBrakes: { type: String },  // e.g., "Ventilated Disc"
    rearBrakes: { type: String }  // e.g., "Drum"
  },
  wheelsAndTyres: {
    wheelType: { type: String },  // e.g., "Rack and Pinion"
    wheelSize: { type: String },  // e.g., "16″"
    tyreSize: { type: String },  // e.g., "175/65/R15"
    spareTyre: { type: String },  // Optional
    spareTyreSize: { type: String }  // Optional
  },
  fuelConsumption: {
    mileageCity: { type: String },  // e.g., "12 km/l"
    mileageHighway: { type: String },  // e.g., "15 km/l"
    tankCapacity: { type: Number }  // e.g., "37 L"
  },
  safety: {
    airbags: { type: Number, default: 0 },  // e.g., 6
    seatBelts: { type: Number },  // e.g., 5
    immobilizer: { type: Boolean, default: false },
    childLock: { type: Boolean, default: false },
    abs: { type: Boolean, default: false },  // Anti-Lock Braking System
    tractionControl: { type: Boolean, default: false },
    vehicleStabilityControl: { type: Boolean, default: false },
    hillAssist: { type: Boolean, default: false },
    downHillAssist: { type: Boolean, default: false },
    isofixAnchors: { type: Boolean, default: false }  // ISOFIX Child Seat Anchors
  },
  exterior: {
    alloyWheels: { type: Boolean, default: false },
    coloredOutsideDoorHandles: { type: Boolean, default: false },
    sideMirrorsWithIndicators: { type: Boolean, default: false },
    rearSpoiler: { type: Boolean, default: false },
    adjustableHeadlights: { type: Boolean, default: false },
    fogLights: { type: Boolean, default: false },
    sunRoof: { type: Boolean, default: false },
    moonRoof: { type: Boolean, default: false },
    colorsAvailable: { type: [String] }  // Available colors for the vehicle
  },
  entertainment: {
    tachometer: { type: Boolean, default: false },
    multiInfo: { type: Boolean, default: false },
    cdDvdPlayer: { type: Boolean, default: false },
    usbAndAux: { type: Boolean, default: false },
    displaySize: { type: String },  // e.g., "9″"
    frontSpeakers: { type: Boolean, default: false },
    rearSeatEntertainment: { type: Boolean, default: false }
  },
  comfort: {
    ac: { type: Boolean, default: false },
    climateControl: { type: Boolean, default: false },
    rearAcVents: { type: Boolean, default: false },
    heater: { type: Boolean, default: false },
    heatedSeats: { type: Boolean, default: false },
    defogger: { type: Boolean, default: false },
    coolBox: { type: Boolean, default: false },
    navigation: { type: Boolean, default: false },
    frontCamera: { type: Boolean, default: false },
    rearCamera: { type: Boolean, default: false },
    rearFoldingSeat: { type: Boolean, default: false },
    rearHeadrest: { type: Boolean, default: false },
    rearWiper: { type: Boolean, default: false },
    seatMaterialType: { type: String },  // e.g., "Fabric with manual adjustment"
    steeringAdjustment: { type: Boolean, default: false },
    steeringSwitches: { type: Boolean, default: false },
    cruiseControl: { type: Boolean, default: false },
    drivingModes: { type: Boolean, default: false },
    keyType: { type: String, default: 'Smart entry' },  // e.g., "Smart entry"
    keylessEntry: { type: Boolean, default: false },
    pushStart: { type: Boolean, default: false },
    centralLocking: { type: Boolean, default: false },
    powerDoorLocks: { type: Boolean, default: false },
    powerSteering: { type: Boolean, default: false },
    powerWindows: { type: Boolean, default: false },
    powerMirrors: { type: Boolean, default: false },
    cupHolders: { type: Boolean, default: false },
    armRest: { type: Boolean, default: false },
    handbrake: { type: String, default: 'Center Lever' },
    interiorLighting: { type: Boolean, default: false },
    frontPowerOutlet: { type: Boolean, default: false }
  },
  brochureLink: {
    type: String,
    default: 'https://example.com/brochure.pdf'
  },
  views: {
    type: Number,
    default: 0
  },
  slug: {
    type: String,
    unique: true,
    index: true
  }
}, { timestamps: true });

newVehicleSchema.pre('save', function(next) {
    if (!this.slug || this.isModified('make') || this.isModified('model') || this.isModified('variant') || this.isModified('year')) {
      this.slug = slugify(`${this.make}-${this.model}-${this.varient}-${this.year}`, { lower: true, strict: true });
    }
    next();
  });

const NewVehicle = mongoose.model('NewVehicle', newVehicleSchema);

export default NewVehicle;
