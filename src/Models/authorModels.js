const mongoose = require("mongoose")

const authorModel = new mongoose.Schema({

    fname: {
        type: String,
        required: "First Name is required",
    },
    lname: {
        type: String,
        required: "Last Name is required"
    },
    title: {
        type: String,
        required: "Title is required",
        enum: ["Mr", "Mrs", "Miss"],
    },
    email: {
        type: String,
        required: "Email ID is required",
        unique: true
    },
    password: {
        type: String,
        required: "Password is required"

    }
}, { timestamps: true })


module.exports = mongoose.model("Newauthor", authorModel)




