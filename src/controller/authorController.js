const authorModels = require("../Models/authorModels");

let createAuthor = async function (req, res) {
    try {

        let data = req.body;
        console.log(data)

        if (Object.keys(data).length == 0) {
            return res.send({ msg: "AuthorDetail is must be present", status: false })
        }
        if (!(/^[a-z0-9_]{3,}@[a-z]{3,}[.]{1}[a-z.]{2,6}$/).test(data.email)) {
            return res.send({ msg: `${data.email} is invalid`, status: false })
        }

        let createdData = await authorModels.create(data);
        res.status(201).send({ data: createdData, status: true })
    } catch (err) {
        res.send({ msg: err.message, status: false })
    }
}


module.exports.createAuthor = createAuthor