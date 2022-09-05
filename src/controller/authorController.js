const authorModels = require("../Models/authorModels");

let createAuthor=async function(req,res){
   try{ let data=req.body;
    let createdData=await authorModels.create(data);
    res.status(201).send({createdAuthor})}
    catch(error){
res.status(501).error({error})
    }
}
module.exports.createAuthor=createAuthor;