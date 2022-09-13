const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const blogsSchema = new mongoose.Schema({

    title: {
        type: String,
        required: "Title is mandatory",
        trim: true
    },
    body: {
        type: String,
        required: "Body is mandatory",
        trim: true
    },
    authorId: {
        type: ObjectId,
        required: "AuthorId is mandatory",
        ref: "Newauthor",
        trim: true
    },
    tags: {
        type:  [{ type: String, trim: true }]
    },
    category: {
        type: String,
        required: "category is mandatory",
        trim: true
    },
    subcategory: [{ type: String, trim: true }],

    deletedAt: Date,

    isDeleted: {
        type: Boolean,
        default: false
    },
    publishedAt: Date,

    isPublished: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })


module.exports = mongoose.model("NewBlog", blogsSchema)