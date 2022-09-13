const mongoose = require("mongoose")

const authorModel = new mongoose.Schema({

    fname: {
        type: String,
        required: "First Name is mandatory",
        trim : true
    },
    lname: {
        type: String,
        required: "Last Name is mandatory",
        trim : true
    },
    title: {
        type: String,
        required: "Title is mandatory",
        enum: ["Mr", "Mrs", "Miss"],
        trim : true
    },
    email: {
        type: String,
        required: "Email is mandatory",
        unique: true,
        trim : true
    },
    password: {
        type: String,
        required: "Password is mandatory",
        trim : true
    }
}, { timestamps: true })


module.exports = mongoose.model("Newauthor", authorModel)




