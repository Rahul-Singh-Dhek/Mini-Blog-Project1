const jwt = require('jsonwebtoken')

const authorModels = require("../Models/authorModels");

let createAuthor = async function (req, res) {

    try {
        let data = req.body;

        //================================= Start Validation ===========================================//

        if (Object.keys(data).length == 0) {
            return res.send({ msg: "Please Provide AuthorDetail", status: false })
        }
        if (typeof data.fname !== "string") {
            return res.send({ msg: "fname is required", status: false })
        }
        if (data.fname.length < 2 || data.fname.length > 100) {
            return res.send({ msg: "fname should be min 2 and max 100 character", status: false })
        }
        if (typeof data.lname !== "string") {
            return res.send({ msg: "lname is required", status: false })
        }
        if (data.lname.length < 2 || data.lname.length > 100) {
            return res.send({ msg: "lname should be min 2 and max 100 character", status: false })
        }
        if (typeof data.title !== "string") {
            return res.send({ msg: "Title is required", status: false })
        }
        if (["Mr", "Mrs", "Miss"].indexOf(data.title) == -1) {
            return res.send({ msg: "Title should be among Mr, Mrs, Miss", status: false })
        }
        if (typeof data.email !== "string") {
            return res.send({ msg: "EmailId is required", status: false })
        }
        if (!(/^[a-z0-9_]{3,}@[a-z]{3,}.[a-z]{3,6}$/).test(data.email)) {
            return res.send({ msg: `${data.email} is invalid`, status: false })
        }

        const EmailAreadyExist = await authorModels.findOne({ email: data.email })

        if (EmailAreadyExist) {
            return res.send({ msg: `${data.email} is already Exist`, status: false })
        }

        if (typeof data.password !== "string") {
            return res.send({ msg: "Password is required", status: false })
        }
        if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&])[a-zA-Z0-9@#$%&]{8,20}$/.test(data.password)) {
            return res.send({ msg: "Password should be min 8 ans max 20 character.It containt atleast--> 1 Uppercase letter, 1 Lowercase letter, 1 Number, 1 Special character" })
        }

        //============================================ End Validation =======================================================//

        let createdData = await authorModels.create(data);

        res.status(201).send({ data: createdData, status: true })

    } catch (err) {
        res.send({ msg: err.message, status: false })
    }
}

//login author

let login = async function (req, res) {
    try {
        let email = req.body.email;
        let password = req.body.password;

        let user = await authorModels.findOne({ email: email, password: password });
        if (!user) return res.status(404).send({ msg: "Try with another email or password", status: false })
        // res.send({msg:user,status:true});

        let token = jwt.sign({
            userId: user._id.toString(),
            project: "1",
            Title: "Mini Blogging Site"
        }, "This is secret key")

        res.setHeader("x-auth-token", token);
        res.status(200).send({ status: true, token,userId:user._id });
    }
    catch (error) {
        res.status(500).send(error);
    }
}

module.exports.createAuthor = createAuthor
module.exports.login = login;