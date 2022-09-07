const blogsModels = require("../Models/blogsModels")
const jwt = require('jsonwebtoken');
const { default: mongoose } = require("mongoose");

let authentication = async function (req, res, next) {

  //authentication code
  try {

    let token = req.headers["x-auth-token"];
    if (!token) return res.status(404).send({ status: false, msg: "token must be present" });

    jwt.verify(token, "This is secret key",(error,decodedToken)=>{
      if(error){
        let message=(error.message=="jwt expired"?"token is expired ,please login again":"token is invalid,please recheck your token")
        return res.status(400).send({status:false,msg:message})
      }
      // console.log(decodedToken)
       req.decodedToken=decodedToken;
       next();
     });
    
  }
  catch (error) {
    return res.status(500).send(error.message);
  }
}

let authorisation = async function (req, res, next) {

  try {

    let decodedToken = req.decodedToken
    let data = req.params.blogId
    let userId1 = decodedToken["userId"];

    if (data) {
      
      if(!mongoose.Types.ObjectId.isValid(data)) return res.status(400).send({msg : "Id is InValid",status : false})
      let findId = await blogsModels.findById(data)
      if(!findId) return res.status(404).send({msg : "No user resister" , status : false})
      if (userId1 !== findId.authorId) return res.status(403).send({ msg: "user is not Authorised for this operation", status: false })
      next()
    }

    data = req.query.authorId
    if(!mongoose.Types.ObjectId.isValid(data)) return res.status(400).send({msg : "Id is InValid",status : false})
    if (userId1 !== data) return res.status(403).send({ msg: "user is not Authorised for this operation", status: false })
    next()

  } catch (err) {
    return res.status(500).send({ msg: err.message, status: false })
  }
}

module.exports.authentication = authentication;
module.exports.authorisation = authorisation;
