const blogsModels = require("../Models/blogsModels.js");
const authorModels = require("../Models/authorModels");
<<<<<<< HEAD


// ===========================================CreatingBlog=================================================================

=======
>>>>>>> b152b9ab1e115c314b5d6f23358fc7df0a2a977d
let createBlogs = async function (req, res) {

    try {

        let data = req.body
        if (Object.keys(data).length == 0) {
            return res.send({ msg: "Blog details is must be present", status: false })
<<<<<<< HEAD
=======
        }
        if (data.isPublished == true) {
            data.publishedAt = Date.now();
>>>>>>> b152b9ab1e115c314b5d6f23358fc7df0a2a977d
        }
        let author = await authorModels.findById(data.authorId)
        if (!author) {
            return res.send({ msg: "athorId is not valid", status: false })
        }
        if (!Array.isArray(data.tags)) {
<<<<<<< HEAD
            return res.send({ msg: "Tags must be Array", status: false })           //validating tags must be array
        }
        if (!Array.isArray(data.category)) {
            return res.send({ msg: "Category must be Array", status: false })       //validating category must be array
        }
        if (!Array.isArray(data.subcategory)) {
            return res.send({ msg: "subcategory must be Array", status: false })    //validating subcategory must be array
=======
            return res.send({ msg: "Tags must be Array", status: false })
        }
        if (!Array.isArray(data.subcategory)) {
            return res.send({ msg: "subcategory must be Array", status: false })
>>>>>>> b152b9ab1e115c314b5d6f23358fc7df0a2a977d
        }
        let result = await blogsModels.create(data);
        res.send({ data: result, status: true })
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }
}
module.exports.createBlogs = createBlogs



