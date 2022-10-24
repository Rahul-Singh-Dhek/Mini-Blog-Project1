const jwt = require('jsonwebtoken')
const authorModels = require("../Models/authorModels");

let createAuthor = async function (req, res) {

    try {
        let data = req.body;

        //================================= Start Validation ===========================================//

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ msg: "Please Provide AuthorDetail", status: false })
        }
        if(!data.fname){
            return res.status(400).send({ msg: "fname must be in present ", status: false })
        }
        if(!(/^[a-z]{2,100}$/i.test(data.fname))){
            return res.status(400).send({msg : "first name should contain letter only and must be between 2 to 100 letters",status: false})
        }
        if(!data.lname){
            return res.status(400).send({ msg: "lname must be in present ", status: false })
        }
        if(!/^[a-z ]{2,100}$/i.test(data.lname)){
            return res.status(400).send({msg : "last name should contain letter only and must be between 2 to 100 letters",status: false})
        }
        if(!data.title){
            return res.status(400).send({ msg: "Title is compulasry", status: false })
        }
        if (["Mr", "Mrs", "Miss"].indexOf(data.title) == -1) {
            return res.status(400).send({ msg: "Title should be among Mr, Mrs, Miss", status: false })
        }
        if(!data.email){
            return res.status(400).send({ msg: "EmailId is compulsary", status: false })
        }
        if (!(/^[a-z0-9_]{3,}@[a-z]{3,}[.]{1}[a-z]{3,6}$/).test(data.email)) {
            return res.status(400).send({ msg: `Email is invalid`, status: false })
        }

        const EmailAreadyExist = await authorModels.findOne({ email: data.email })

        if (EmailAreadyExist) {
            return res.status(407).send({ msg: `Email already Exists`, status: false })
        }
        if(!data.password){
            return res.status(400).send({ msg: "Password is compulsary", status: false })
        }
        if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&])[a-zA-Z0-9@#$%&]{8,100}$/.test(data.password)) {
            return res.status(400).send({ msg: "Password should be min 8 ans max 100 character.It containt atleast--> 1 Uppercase letter, 1 Lowercase letter, 1 Number, 1 Special character" })
        }

        //============================================ End Validation =======================================================//

        let createdData = await authorModels.create(data);

        res.status(201).send({ data: createdData, status: true })

    } catch (err) {
        res.status(500).send({ msg: err.message, status: false })
    }
}

//login author

let login = async function (req, res) {
    try {

        let email = req.body.email;
        let password = req.body.password;

        if(!email){
            return res.status(400).send({ msg: `Email is required`, status: false })
        }
        if(!password){
            return res.status(400).send({ msg: `Password is required`, status: false })
        }
        if (!(/^[a-z0-9_]{3,}@[a-z]{3,}.[a-z]{3,6}$/).test(email)) {
            return res.status(400).send({ msg: `Email is invalid`, status: false })
        }
        if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&])[a-zA-Z0-9@#$%&]{8,20}$/.test(password)) {
            return res.status(400).send({ msg: "Password is invalid", status : false})
        }

        let user = await authorModels.findOne({ email: email, password: password });
        if (!user) return res.status(401).send({ msg: "Try with another email or password", status: false })

        let token = jwt.sign(
            {
                userId: user._id.toString(),
                project: "1",
                Title: "Mini Blogging Site"
            }, "This is secret key")

         res.setHeader("x-api-key", token);
       return res.status(200).send({ status: true, data:{token:token}  });
    }
    catch (error) {
        return res.status(500).send({ msg: error.message, status: false });
    }
}

module.exports.createAuthor = createAuthor
module.exports.login = login;