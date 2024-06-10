const { default: mongoose } = require("mongoose");

module.exports =  {
    mutipleMongooseToObject: function (mongoose){          //mot list product
        return  mongoose.map ( mongoose  => mongoose.toObject());
    },
    mongooseToObject: function (mongoose) {                 //1 product
        return  mongoose ? mongoose.toObject() : mongoose;
    }
};
