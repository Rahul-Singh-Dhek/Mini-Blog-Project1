const blogsModels = require("../Models/blogsModels.js");
const authorModels = require("../Models/authorModels");


// ==========================================CreateBlogs===========================================//


let createBlogs = async function (req, res) {

    try {

        let data = req.body

        //=================================== Start Validation =================================================//

        if (Object.keys(data).length == 0) {
            return res.send({ msg: "Blog details is must be present", status: false })
        }
        if (typeof data.title !== "string") {
            return res.send({ msg: "title is required", status: false })
        }
        if (data.title.length == 0) {
            return res.send({ msg: "Title must be present", status: false })
        }
        if (typeof data.body !== "string") {
            return res.send({ msg: "body is required", status: false })
        }
        if (data.body.length == 0) {
            return res.send({ msg: "body must be present", status: false })
        }
        if (typeof data.authorId !== "string") {
            return res.send({ msg: "authorId is required", status: false })
        }
        if (data.authorId.length == 0) {
            return res.send({ msg: "authorId must be present", status: false })
        }
        if (!mongoose.Types.ObjectId.isValid(data.authorId)) {
            return res.send({ msg: "authorId is is invalid", status: false })
        }

        let author = await authorModels.findById(data.authorId)

        if (!author) {
            return res.send({ msg: "athorId is not from author collection", status: false })
        }
        if (typeof data.category !== "string") {
            return res.send({ msg: "category is required", status: false })
        }
        if (data.category.length == 0) {
            return res.send({ msg: "category must be present", status: false })
        }
        if (data.tags) {

            if (!Array.isArray(data.tags)) {
                return res.send({ msg: "Tags must be Array", status: false })
            }
        }
        if (data.subcategory) {

            if (!Array.isArray(data.subcategory)) {
                return res.send({ msg: "subcategory must be Array", status: false })
            }
        }

        //================================== End Validation =========================================//

        if (data.isPublished == true) {
            data.publishedAt = Date.now();     //getting published date
        }
        let result = await blogsModels.create(data);
        res.send({ data: result, status: true })
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }
}

let getBlogs = async function (req, res) {

    let filter = { isDeleted: false, isPublished: true }
    if (req.query["author Id"]) {
        filter["authorId"] = req.query["author Id"]
    }
    if (req.query["category"]) {
        filter["category"] = req.query["category"]
    }
    if (req.query["tag"]) {
        filter["tags"] = req.query["tag"]
    }
    if (req.query["subcategory"]) {
        filter["subcategory"] = req.query["subcategory"]
    }
    let data = await blogsModels.find(filter)
    if (data.length == 0) {
        return res.status(404).send({ status: false, msg: "No document found" })
    }
    res.send({ data: data })
}


// ===========================================DELETE BY BLOGS-ID=============================


const deleteBlogsById = async function (req, res) {
    try {
        let blogId = req.params.blogId;
        let result = await blogsModels.findOne({ _id: blogId, isDeleted: false });
        if (!result) return res.status(404).send({ status: false, msg: "Blog is already deleted" })
        else {
            let updated = await blogsModels.findByIdAndUpdate(
                { _id: blogId, isDeleted: false },
                { isDeleted: true },
                { new: true })

            return res.status(200).send({ status: true, data: updated });
        }


    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }

};


module.exports.createBlogs = createBlogs
module.exports.getBlogs = getBlogs
module.exports.deleteBlogsById = deleteBlogsById
