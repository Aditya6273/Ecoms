const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
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
    addresses: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Address'
    },
    order_history:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'order'
    },
    is_active: {
        type: Boolean,
        default: true
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
const userCollection = require("user",userSchema)

module.exports = userCollection