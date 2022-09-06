const mongoose = require("mongoose")

const authorModel = new mongoose.Schema({

    fname: {
        type: String,
        required: "First Name is required",
        trim : true
    },
    lname: {
        type: String,
        required: "Last Name is required",
        trim : true
    },
    title: {
        type: String,
        required: "Title is required",
        enum: ["Mr", "Mrs", "Miss"],
        trim : true
    },
    email: {
        type: String,
        required: "Email ID is required",
        unique: true,
        trim : true
    },
    password: {
        type: String,
        required: "Password is required",
        trim : true

    }
}, { timestamps: true })


module.exports = mongoose.model("Newauthor", authorModel)




