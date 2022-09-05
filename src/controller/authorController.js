const authorModels = require("../Models/authorModels");

let createAuthor=async function(req,res){
   try{ 
    let data = req.body;
    console.log(data)

    if(Object.keys(data).length==0){
        res.status().send({msg : "AuthorDetail is must be present", status : false})
    }
    if(!(/^[a-z_]{3,}@[a-z]{3,}[.]{1}[a-z.]{2,6}$/).test(email)){
        res.status().send({msg : `${email} is invalid`, status : false})
    }

    let createdData=await authorModels.create(data);
    res.status(201).send({createdAuthor})}
    catch(error){
      res.status(501).send({error})
    }
}
module.exports.createAuthor=createAuthor;