const express = require('express');
const router = express.Router();
const authorController=require('../controller/authorController')
const blogsController=require('../controller/blogsController')


// ===================================authorApi=================================================

router.post('/authors',authorController.createAuthor)

//======================================blogApi===================================================

router.post('/blogs',blogsController.createBlogs)

//=======================================getBlogs================================================

router.get('blogs',blogsController.getBlogs)

//=======================================DELETE=================================================
router.delete("/blogs/:blogId",blogsController.deleteBlogsById)




module.exports = router;
