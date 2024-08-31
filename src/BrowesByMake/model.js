import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

const modelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  variants: []
});

const BrowesByMakeSchema = new mongoose.Schema(
  {
    companyImage: { type: String },
    name: { type: String, required: true },
    type: {
      type: String,
     
      required: true
    },
    models: [modelSchema]
  },
  { timestamps: true }
);

const BrowesByMake = mongoose.model('BrowesByMake', BrowesByMakeSchema);
export default BrowesByMake;
