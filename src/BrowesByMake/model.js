import mongoose from 'mongoose';

const BrowesByMakeSchema = mongoose.Schema(
    {
        companyImage: { type: String },
        name: { type: String, required: true }
    },
    { timestamps: true }
);

const BrowesByMake= mongoose.model('BrowesByMake', BrowesByMakeSchema)
export default BrowesByMake
