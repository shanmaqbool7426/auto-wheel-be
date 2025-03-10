import mongoose from 'mongoose';
import slugify from "slugify";

const newVehicleSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
    index: true
  },
  reviewsIds: [],
  model: {
    type: String,
    required: true,
    index: true
  },
  variant: {
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
  price:{
    type: Number,
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
  bodyType: {
    type: String,
    required: true
  },
  pros: [{ type: String }],
  cons: [{ type: String }],
  // faqs: [
  //   {
  //     question: {
  //       type: String,
  //       required: true
  //     },
  //     answer: {
  //       type: String,
  //       required: true
  //     }
  //   }
  // ],
  views: {
    type: Number,
    default: 0
  },
  colorsAvailable: {
    type: [String],
    default: []
  },
  slug: {
    type: String,
    unique: true,
    index: true
  }
}, { timestamps: true });

newVehicleSchema.pre('save', function(next) {
    if (!this.slug || this.isModified('make') || this.isModified('model') || this.isModified('variant') || this.isModified('year')) {
      this.slug = slugify(`${this.make}-${this.model}-${this.variant}-${this.year}`, { lower: true, strict: true });
    }
    next();
  });

const NewVehicle = mongoose.model('NewVehicle', newVehicleSchema);

const bikeSchema = new mongoose.Schema({
    engine: {
        type: {
          type: String,  // Engine type (e.g., "4 Stroke OHC Air Cooled")
          required: true
        },
        displacement: {
          type: Number,  // Engine displacement (e.g., 124 cc)
          required: true
        },
        horsepower: {
          type: String,  // Horsepower with RPM (e.g., "10.7 HP @ 7500.0 RPM")
          required: true
        },
        torque: {
          type: String,  // Torque with RPM (e.g., "10.4 Nm @ 6500.0 RPM")
          required: true
        },
        boreStroke: {
          type: String,  // Bore & Stroke (e.g., "54.0 x 54.0 mm")
          required: true
        },
        compressionRatio: {
          type: String,  // Compression ratio (e.g., "10.0:1")
          required: true
        },
        clutch: {
          type: String,  // Clutch type (e.g., "Wet Type Multi-Plate")
          required: true
        }
      },
      transmission: {
        type: String,  // Transmission type (e.g., "5-speed")
        required: true
      },

      fuelCapacity: {
        type: Number,  // Fuel tank capacity (e.g., 13L)
        required: true
      },
      fuelAverage: {
        type: String,  // Fuel average (e.g., "45.0 KM/L")
        required: true
      },
      starting: {
        type: String,  // Starting system (e.g., "Kick & Electric Start")
        required: true
      },
      topSpeed: {
        type: String,  // Top speed (e.g., "100 KM/H")
        required: true
      },
      dimensions: {
        length: {
          type: String,  // Overall length (e.g., "1975 mm")
          required: true
        },
        width: {
          type: String,  // Overall width (e.g., "745 mm")
          required: true
        },
        height: {
          type: String,  // Overall height (e.g., "1080 mm")
          required: true
        }
      },
      dryWeight: {
        type: Number,  // Dry weight (e.g., "114 KG")
        required: true
      },
      frame: {
        type: String,  // Frame type (e.g., "Backbone Type")
        required: true
      },
      groundClearance: {
        type: String,  // Ground clearance (e.g., "145 mm")
        required: true
      },
      wheelSize: {
        type: String,  // Wheel size (e.g., "18 in")
        required: true
      },
      tyres: {
        front: {
          type: String,  // Front tyre size (e.g., "2.75 - 2.75")
          required: true
        },
        back: {
          type: String,  // Back tyre size (e.g., "3.50 - 18")
          required: true
        }
      },
      colorsAvailable: { type: [String] }
})
const carSchema = new mongoose.Schema({
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
      drive: {
        type: String,
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
        rearSpeakers: { type: Boolean, default: false },
        navigation: { type: Boolean, default: false },
        amfmRadio: { type: Boolean, default: false },
        cassettePlayer: { type: Boolean, default: false },
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
})
const truckSchema = new mongoose.Schema({
    dimensions: {
        overallLength: { type: String },     // Critical for truck size
        overallWidth: { type: String },      // Critical for road regulations
        overallHeight: { type: String },     // Important for bridge clearance
        wheelBase: { type: String },         // Important for turning radius
        groundClearance: { type: String },   // Important for off-road/loading
        kerbWeight: { type: String },        // Important for weight regulations
    },
    
    engine: {
        type: { type: String, required: true },          // Diesel/Petrol/CNG
        displacement: { type: Number, required: true },  // Engine size
        horsepower: { type: String },                   // Power output
        torque: { type: String },                       // Important for hauling
    },

    transmission: {
        type: { type: String },              // Manual/Automatic/AMT
        powerTakeOff: { type: Boolean },     // Important for truck operations
    },

    cargo: {
        loadCapacity: { type: String },      // Critical for hauling
        cargoLength: { type: String },       // Important for cargo space
        cargoWidth: { type: String },        // Important for cargo space
        cargoHeight: { type: String },       // Important for cargo space
        cargoType: { type: [String] }        // Type of cargo it can carry
    },

    axleConfiguration: {
        numberOfAxles: { type: Number },     // Important for weight distribution
        wheelConfiguration: { type: String }, // e.g., "6x4", "4x2"
        maxAxleLoad: { type: String }        // Important for weight regulations
    },

    chassis: {
        frameType: { type: String },         // Type of chassis
        suspensionType: {
            front: { type: String },         // Front suspension type
            rear: { type: String }           // Rear suspension type
        },
        airBrakeSystem: { type: Boolean }    // Important safety feature
    },

    cabin: {
        type: { type: String },              // Day Cab/Sleeper Cab
        sleepingBerths: { type: Number },    // Important for long-haul trucks
    },

    fuel: {
        tankCapacity: { type: Number },      // Fuel tank size
        adBlueCapacity: { type: Number },    // Important for emissions
    },

    safety: {
        abs: { type: Boolean },              // Anti-lock braking
        hillAssist: { type: Boolean },       // Hill start assist
        trailerStabilityControl: { type: Boolean }, // Important for trailer safety
    },

    warranty: {
        vehicle: { type: String },           // Overall warranty
        engine: { type: String },            // Engine warranty
    },

    certification: {
        emissionStandard: { type: String },  // Important for regulations
    }
});

const Car = NewVehicle.discriminator('Car', carSchema);
const Bike = NewVehicle.discriminator('Bike', bikeSchema);
const Truck = NewVehicle.discriminator('Truck', truckSchema);

export { NewVehicle, Car, Bike, Truck };
