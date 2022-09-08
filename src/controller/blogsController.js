const blogsModels = require("../Models/blogsModels");
const authorModels = require("../Models/authorModels");
const mongoose = require('mongoose')


// ==========================================CreateBlogs===========================================//


let createBlogs = async function (req, res) {

    try {

        let data = req.body

        //=================================== Start Validation =================================================//

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ msg: "Blog details is must be present", status: false })
        }
        if (!data.title) {
            return res.status(400).send({ msg: "Title must be present", status: false })
        }
        if (typeof data.title !== "string") {
            return res.status(400).send({ msg: "title name must be in String", status: false })
        }
        if (!data.body) {
            return res.status(400).send({ msg: "body must be present", status: false })
        }
        if (typeof data.body !== "string") {
            return res.status(400).send({ msg: "body is required", status: false })
        }
        if (!data.authorId) {
            return res.status(400).send({ msg: "authorId must be present", status: false })
        }
        
        if (typeof data.authorId !== "string") {
            return res.status(400).send({ msg: "authorId is required", status: false })
        }
        
        if (!mongoose.Types.ObjectId.isValid(data.authorId)) {
            return res.status(400).send({ msg: "authorId is is invalid", status: false })
        }

        let author = await authorModels.findById(data.authorId)

        if (!author) {
            return res.status(400).send({ msg: "athorId is not from author collection", status: false })
        }
        if (!data.category) {
            return res.status(400).send({ msg: "category must be present", status: false })
        }
        if (typeof data.category !== "string") { 
            return res.status(400).send({ msg: "category is required", status: false })
        }
        
        if (data.tags) {

            if (!Array.isArray(data.tags)) {
                return res.status(400).send({ msg: "Tags must be Array", status: false })
            }
        }
        if (data.subcategory) {

            if (!Array.isArray(data.subcategory)) {
                return res.status(400).send({ msg: "subcategory must be Array", status: false })
            }
        }

        //================================== End Validation =========================================//

        if (data.isPublished == true) {
            data.publishedAt = Date.now();     //getting published date
        }
        let result = await blogsModels.create(data);
        return res.status(201).send({ data: result, status: true })
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

//------------------------------------------------------Get Api-------------------------------------------------

let getBlogs = async function (req, res) {

    try {

        let filter = { isDeleted: false, isPublished: true }
        let queryValue = req.query

    //======================================= Start Validation===============================================//

        if (queryValue["authorId"]) {

            if (!mongoose.Types.ObjectId.isValid(queryValue["authorId"])) {
                return res.status(400).send({ msg: "authorId is invalid", status: false })
            }
            let author = await authorModels.findById(queryValue["authorId"])
            if (!author) {
                return res.status(400).send({ msg: "athorId is not from author collection", status: false })
            }

            filter["authorId"] = queryValue["authorId"]
        }
        if (queryValue["category"]) {

            filter["category"] = queryValue["category"]
        }
        if (queryValue["tags"]) {

            filter["tags"] = queryValue["tags"]
        }
        if (queryValue["subcategory"]) {

            filter["subcategory"] = queryValue["subcategory"]
        }

        // console.log(filter)

        let data = await blogsModels.find(filter)

        if (data.length == 0) {

            return res.status(404).send({ status: false, msg: "No document found" })
        }

        return res.status(200).send({ data: data , status : true })

    } catch (err) {

        return res.status(500).send({ status: false, msg: err.message })
    }
}

//-------------------------------------------------------put-Api------------------------------------------------------------------

const updateBlogs = async function (req, res) {

    try {

        let blogId = req.params.blogId
        let bodyData = req.body
        let updateValue = { "$set":{isPublished: true, publishedAt: Date.now()} }

        //======================================= Start Validation===============================================//

        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(400).send({ msg: `${blogId} is invalid`, status: false })
        }

        const blogExist = await blogsModels.findOne({ _id: blogId, isDeleted: false })

        if (!blogExist) {
            return res.status(400).send({ msg: "No document exist", status: false })
        }

        if (Object.keys(bodyData).length == 0) {
            return res.status(400).send({ msg: "User not update anything", data: blogExist, status: true })
        }
        if (bodyData.title) {
            if (typeof bodyData.title !== "string") {
                return res.status(400).send({ msg: "title must be in String", status: false })
            }
            updateValue["$set"]["title"] = bodyData.title
        }

        if (bodyData.body) {
            if (typeof bodyData.body !== "string") {
                return res.status(400).send({ msg: "body is must be in String", status: false })
            }
            updateValue["$set"]["body"] = bodyData.body
        }
        if (bodyData.tags) {
            // if (!Array.isArray(bodyData.tags)) {
            //     return res.status(400).send({ msg: "Tags must be Array", status: false })
            // }

            updateValue["$push"] = {}
            updateValue["$push"]["tags"] = bodyData.tags
        }
        if (bodyData.subcategory) {
            // if (!Array.isArray(bodyData.subcategory)) {
            //     return res.status(400).send({ msg: "subcategory must be Array", status: false })
            // }
            if (!updateValue["$push"]) {
                updateValue["$push"] = {}
            }
            updateValue["$push"]["subcategory"] = bodyData.subcategory
        }
        console.log(updateValue)

        const updateDocument = await blogsModels.findByIdAndUpdate({ _id: blogId }, updateValue, { new: true })

       return res.status(200).send({ msg: "blog update successfully", data: updateDocument, status: true })

    } catch (err) {
        return res.status(500).send({ msg: err.message, status: false })
    }
}

//--------------------------------------------------------------delete-Api----------------------------------------------------------

let delBlogs = async function (req, res) {

    try {

        let filter = { isDeleted: false, isPublished: false }

        if (req.query["authorId"]) {
            if (!mongoose.Types.ObjectId.isValid(req.query["authorId"])) {

                return res.status(400).send({ msg: "authorId is is invalid", status: false })
            }

            filter["authorId"] = req.query["authorId"]
        }else{
            
            return res.status(400).send({status:false,msg:"authorId must be present"})
        }


        if (req.query["category"]) {

            filter["category"] = req.query["category"]
        }

        if (req.query["tags"]) {

            filter["tags"] = req.query["tags"]
        }
        if (req.query["subcategory"]) {

            filter["subcategory"] = req.query["subcategory"]
        }

        let data = await blogsModels.updateMany(filter, { isDeleted: true ,deletedAt: Date.now()},)

        if (data.modifiedCount == 0) {

            return res.status(404).send({ status: false, msg: "No document found" })
        }

        res.status(200).send({ status: true, msg: data });
    }
    catch (error) {

        res.status(500).send({ status: false, msg: error.message });
    }
}

// ===========================================DELETE BY BLOGS-ID====================================================================

const deleteBlogsById = async function (req, res) {

    try {

        let blogId = req.params.blogId;

        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(400).send({ msg: `${blogId} is invalid`, status: false })
        }
        
        let result = await blogsModels.findOne({ _id: blogId, isDeleted: false });

        if (!result) return res.status(404).send({ status: false, msg: "Blog is already deleted" })

        let updated = await blogsModels.findByIdAndUpdate({ _id: blogId, isDeleted: false }, { isDeleted: true ,deletedAt:Date.now()}, { new: true })

        return res.status(200).send();

    } catch (error) {

        res.status(500).send({ status: false, msg: error.message });
    }

};


module.exports.createBlogs = createBlogs
module.exports.getBlogs = getBlogs
module.exports.deleteBlogsById = deleteBlogsById
module.exports.delBlogs = delBlogs
module.exports.updateBlogs = updateBlogs

