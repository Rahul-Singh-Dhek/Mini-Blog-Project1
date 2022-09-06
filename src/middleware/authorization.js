
const jwt = require('jsonwebtoken')

let mid1 = async function (req, res, next) {
  //authentication code
  try {
    let token = req.headers["x-auth-token"];
    if (!token) return res.status(404).send({ status: false, msg: "token must be present" });

    let decodedToken = jwt.verify(token, "This is secret key");
    // console.log(decodedToken)
    if (!decodedToken)
      return res.status(404).send({ status: false, msg: "token is invalid" });


    //Authorization code
    let userId1 = decodedToken["userId"];
    let userId2 = req.body.authorId;
    if (userId1 != userId2) return res.status(404).send("You don't have access to change or fetch this user's details")

    next();
  }
  catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports.mid1 = mid1;