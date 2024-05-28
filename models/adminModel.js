const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        trim: true
    },
    last_name: {
        type: String,
        trim: true
    },
    phone_number: {
        type: String,
        trim: true
    },
    is_active: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ['admin', 'super_admin', 'manager'],
        default: 'admin'
    },
    permissions: {
        type: [String],
        default: []
    },
    last_login: {
        type: Date
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

const adminCollection = mongoose.model("admin",adminSchema)

module.exports = adminCollection