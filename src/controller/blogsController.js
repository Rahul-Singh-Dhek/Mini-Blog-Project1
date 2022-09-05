const blogsModels = require("../Models/blogsModels.js");
const authorModels = require("../Models/authorModels");
let createBlogs = async function (req, res) {

    try {

        let data = req.body
        if (Object.keys(data).length == 0) {
            return res.send({ msg: "Blog details is must be present", status: false })
        }
        if (data.isPublished == true) {
            data.publishedAt = Date.now();
        }
        let author = await authorModels.findById(data.authorId)
        if (!author) {
            return res.send({ msg: "athorId is not valid", status: false })
        }
        if (!Array.isArray(data.tags)) {
            return res.send({ msg: "Tags must be Array", status: false })
        }
        if (!Array.isArray(data.subcategory)) {
            return res.send({ msg: "subcategory must be Array", status: false })
        }
        let result = await blogsModels.create(data);
        res.send({ data: result, status: true })
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }
}
module.exports.createBlogs = createBlogs



