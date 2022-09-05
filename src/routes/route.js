const express = require('express');
const router = express.Router();
const authorController=require('../controller/authorController')

router.post('createData',authorController.createAuthor)


module.exports = router;
