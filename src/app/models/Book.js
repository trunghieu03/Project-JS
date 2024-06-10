const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosedelete = require('mongoose-delete')
const BookSchema = new Schema({
    name: {
        type: String,
    },
    price: {
        type: Number
    },
    productImage: {
        type: String,
    },
    productDescription: {
        type: String, 
    },
    createdAt:{type: Date , default:Date.now},
    updatedAt:{type: Date , default:Date.now},
}, { timestamps: true }); // Thêm timestamps để tự động thêm createdAt và updatedAt
BookSchema.plugin(mongoosedelete,{deletedAt:true, overrideMethods : true});
module.exports = mongoose.model('Book', BookSchema);

