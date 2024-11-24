import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        enum: ['superAdmin', 'admin', 'moderator', 'dealer', 'user']
    },
    permissions: [{
        resource: {
            type: String,
            required: true,
            enum: ['users', 'vehicles', 'blogs', 'locations', 'reports']
        },
        actions: [{
            type: String,
            enum: ['create', 'read', 'update', 'delete', 'manage']
        }]
    }],
    description: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Role = mongoose.model('Role', roleSchema);
export default Role;