const blogsModels = require("../Models/blogsModels")
const jwt = require('jsonwebtoken')

let authentication = async function (req, res, next) {

  //authentication code
  try {

    let token = req.headers["x-auth-token"];
    if (!token) return res.status(404).send({ status: false, msg: "token must be present" });

    let decodedToken = jwt.verify(token, "This is secret key");

    if (!decodedToken) {
      return res.status(404).send({ status: false, msg: "token is invalid" });
    }
    req.decodedToken = decodedToken;
    next();
  }
  catch (error) {
    res.status(500).send(error.message);
  }
}

let authorisation = async function (req, res, next) {

  try {

    let decodedToken = req.decodedToken
    let data = req.params.blogId
    let userId1 = decodedToken["userId"];

    if (data) {

      let findId = await blogsModels.findById(data)
      if (userId1 !== findId.authorId) return res.status(403).send({ msg: "user is not Authorised for this operation", status: false })
      next()
    }

    data = req.query.authorId
    if (userId1 !== data) return res.status(403).send({ msg: "user is not Authorised for this operation", status: false })
    next()

  } catch (err) {
    res.status(500).send({ msg: err.message, status: false })
  }
}

module.exports.authentication = authentication;
module.exports.authorisation = authorisation;
