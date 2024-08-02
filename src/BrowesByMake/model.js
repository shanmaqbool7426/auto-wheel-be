import mongoose from 'mongoose';

const BrowesByMakeSchema = mongoose.Schema(
    {
        companyImage: { type: String, required: true },
        name: { type: String, required: true }
    },
    { timestamps: true }
);

mongoose.model('BrowesByMake', BrowesByMakeSchema)