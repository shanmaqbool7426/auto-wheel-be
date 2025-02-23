import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const modelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Add ID for models
  variants: []
});


const BrowesByMakeSchema = new mongoose.Schema(
  {
    companyImage: { type: String },
    name: { type: String, required: true },
    slug: { type: String },
    description: { type: String },
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
