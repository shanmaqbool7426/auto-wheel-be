import mongoose from 'mongoose';

const BrowesBodySchema = mongoose.Schema(
    {
        bodyImage: { type: String, required: true },
        name: { type: String, required: true }
    },
    { timestamps: true }
);

mongoose.model('BrowesByBody', BrowesBodySchema)