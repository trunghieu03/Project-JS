const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://trunghieuphung03:GaLiEpIIlNZryk6T@ShopBook.tq3d8ff.mongodb.net/', {
        });
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = { connect };