const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({


    firstName: {
        type: String
    },
    lastName: {
        type: String,

    },
    email: {
        type: String
    },
    gender: {
        type: String
    },
    contactNum: {
        type: String,
    },
    stateId:{
        type:Schema.Types.ObjectId,
        ref:"state"
    },

    cityId:{
        type:Schema.Types.ObjectId,
        ref:"city"
    },
    status: {
        type: String,
    },
    password: {
        type: String,
    },
    confirmPassword: {
        type: String,
    }

})

module.exports = mongoose.model("users", userSchema)