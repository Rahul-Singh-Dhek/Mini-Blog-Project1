const express = require('express');
const router = express.Router();
const authorController=require('../controller/authorController')
const blogsController=require('../controller/blogsController')

router.post('/authors',authorController.createAuthor)
router.post('/blogs',blogsController.createBlogs)


module.exports = router;
