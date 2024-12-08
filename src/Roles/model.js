import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        enum: ['superAdmin', 'admin', 'moderator', 'dealer', 'user']
    },
    permissions: {
        dashboard: {
            read: { type: Boolean, default: false },
            access: { type: Boolean, default: false },
            edit: { type: Boolean, default: false }
        },
        blog: {
            read: { type: Boolean, default: false },
            access: { type: Boolean, default: false },
            edit: { type: Boolean, default: false }
        },
        comments: {
            read: { type: Boolean, default: false },
            access: { type: Boolean, default: false },
            edit: { type: Boolean, default: false }
        },
        location: {
            read: { type: Boolean, default: false },
            access: { type: Boolean, default: false },
            edit: { type: Boolean, default: false }
        },
        userManagement: {
            read: { type: Boolean, default: false },
            access: { type: Boolean, default: false },
            edit: { type: Boolean, default: false }
        },
        chat: {
            read: { type: Boolean, default: false },
            access: { type: Boolean, default: false },
            edit: { type: Boolean, default: false }
        },
        email: {
            read: { type: Boolean, default: false },
            access: { type: Boolean, default: false },
            edit: { type: Boolean, default: false }
        },
        fileManager: {
            read: { type: Boolean, default: false },
            access: { type: Boolean, default: false },
            edit: { type: Boolean, default: false }
        }
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Role = mongoose.model('Role', roleSchema);
export default Role;