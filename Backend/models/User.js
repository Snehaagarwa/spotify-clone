const mongoose = require("mongoose");
const User = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    password:{
        type:String,
        required:true,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },

});

const UserModel = mongoose.model("User",User);

module.exports = UserModel;