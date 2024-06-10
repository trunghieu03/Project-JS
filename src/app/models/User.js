const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        maxLength: 255
    },
    password: {
        type: String,
        required: true,
        // minLength: 6,
    },
    email: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 50,
        unique: true
    },
    phone: {
        type: String, 
        maxLength: 11
    },
    createdAt:{type: Date , default:Date.now},
    updatedAt:{type: Date , default:Date.now},
    role: {
        type: String,
        default: 'user',
    }
}, { timestamps: true }); // Thêm timestamps để tự động thêm createdAt và updatedAt
module.exports = mongoose.model('User', UserSchema);

