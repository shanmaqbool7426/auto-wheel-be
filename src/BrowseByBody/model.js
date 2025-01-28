import mongoose from 'mongoose';

const BrowesBodySchema = mongoose.Schema(
    {
        bodyImage: { type: String },
        title: { type: String, required: true },
        slug: { type: String, required: true }, 
        type: {
            type: String,
            enum: ['car', 'bike', 'truck'],
            required: true,
          },
    },
    { timestamps: true }
);

const BrowesByBody= mongoose.model('BrowesByBody', BrowesBodySchema)
export default BrowesByBody