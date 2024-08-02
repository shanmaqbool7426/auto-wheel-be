    import mongoose from 'mongoose';

    const vehicleSchema = new mongoose.Schema({
        type: {
            type: String,
            enum: ['car', 'bike', 'truck'],
            required: true,
            index: true // Index on type field
          },
          name: {
            type: String,
            required: true,
            index: true // Index on name field
          },
          price: {
            type: Number,
            required: true,
            index: true // Index on price field
          },
          model: {
            type: String,
            required: true,
            index: true // Index on model field
          },
          year: {
            type: Number,
            required: true,
            index: true // Index on year field
          },
          condition: {
            type: String,
            required: true,
          },
          description: {
            type: String,
          },
          specifications: {
            stockId: { type: String, index: true }, // Index on stockId field
            bodyType: { type: String, index: true }, // Index on bodyType field
            fuelType: { type: String, index: true }, // Index on fuelType field
            engine: String,
            mileage: { type: Number, index: true }, // Index on mileage field
            transmission: { type: String, index: true }, // Index on transmission field
            drive: String,
            vin: { type: String, index: true }, // Index on vin field
            exteriorColor: String,
            interiorColor: String,
            doors: Number,
            seats: Number,
            engineCapacity: Number, // Specific to bikes
            payloadCapacity: Number, // Specific to trucks
          },
          features: {
            type: [String]
          },
          sellerNotes: {
            type: String
          },
          images: {
            type: [String]
          },
    seller: {
        name: String,
        rating: Number,
        reviews: Number,
        location: String,
        contact: {
        type: Map,
        of: String
        }
    }
    }, { timestamps: true });

    module.exports = mongoose.model('Vehicle', vehicleSchema);