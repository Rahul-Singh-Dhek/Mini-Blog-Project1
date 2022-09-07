
const blogsModels = require("../Models/blogsModels")
const jwt = require('jsonwebtoken')

let authentication = async function (req, res, next) {
  //authentication code
  try {
    let token = req.headers["x-auth-token"];
    if (!token) return res.status(404).send({ status: false, msg: "token must be present" });

    let decodedToken = jwt.verify(token, "This is secret key");
    // console.log(decodedToken)
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

  let decodedToken=req.decodedToken
  let data = req.params.blogId
  let userId1 = decodedToken["userId"];
  
  if(data){
    let find = await blogsModels.findById(data)
    if(userId1!==find.authorId) 
    return res.send("Kuch bhi")
    next()
  }
  
  data = req.query.authorId
  if(userId1 !== data) return res.send("falna falna")
  next()

}




module.exports.authentication = authentication;
module.exports.authorisation = authorisation;
