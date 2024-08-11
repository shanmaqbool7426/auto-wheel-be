    import mongoose from 'mongoose';

    const vehicleSchema = new mongoose.Schema({
        type: {
            type: String,
            enum: ['car', 'bike', 'truck'],
            required: true,
            index: true
          },
          name: {
            type: String,
            required: true,
            index: true 
          },
          price: {
            type: Number,
            required: true,
            index: true 
          },
          model: {
            type: String,
            required: true,
            index: true 
          },
          year: {
            type: Number,
            required: true,
            index: true 
          },
          condition: {
            type: String,
            required: true,
          },
          description: {
            type: String,
          },
          specifications: {
            stockId: { type: String, index: true }, 
            bodyType: { type: String, index: true }, 
            fuelType: { type: String, index: true },
            engine: String,
            mileage: { type: Number, index: true }, 
            transmission: { type: String, index: true }, 
            drive: String,
            vin: { type: String, index: true }, 
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
          defaultImage:{
            type: String,
            default: 'https://via.placeholder.com/300x200'
          },
          images: {
            type: [String]
          },
    seller: {
        name: String,
        rating: Number,
        reviews: Number,
        location: String,
        type: Map,
        of: String
    }
    }, { timestamps: true });

    const Vehicle = mongoose.model('Vehicle', vehicleSchema);

    export default Vehicle;