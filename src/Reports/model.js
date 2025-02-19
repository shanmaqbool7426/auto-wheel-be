import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({

    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle'
    },
    vehicleOwnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reportType: {
        type: String,
        enum: [
            'DUPLICATE',
            'SPAM',
            'WRONG_CONTACT_INFO',
            'SOLD_ALREADY',
            'FAKE_ADS',
            'WRONG_CATEGORY',
            'PROHIBITED_CONTENT',
            'OTHER'
        ]
    },
    description: {
        type: String,
        required: false
    },
    status: {
        type: String,
        default: 'PENDING',
        enum: ['PENDING', 'UNDER_REVIEW', 'RESOLVED', 'REJECTED']
    },
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{ timestamps: true});

// Add index for better querying
reportSchema.index({ vehicleId: 1, status: 1 });

export default mongoose.model('Report', reportSchema);
