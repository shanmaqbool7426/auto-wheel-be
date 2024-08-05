import mongoose from 'mongoose';

const BrowesBodySchema = mongoose.Schema(
    {
        bodyImage: { type: String },
        name: { type: String, required: true }
    },
    { timestamps: true }
);

const BrowesByBody= mongoose.model('BrowesByBody', BrowesBodySchema)
export default BrowesByBody