const mongoose = require("mongoose");

const transmissionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      lowercase: true
    },
    vehicleType: {
      type: String,
      enum: ['car', 'bike', 'truck'],
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transmission", transmissionSchema);
