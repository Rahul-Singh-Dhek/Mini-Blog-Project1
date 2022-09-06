const express = require('express');
const router = express.Router();
const authorController=require('../controller/authorController')
const blogsController=require('../controller/blogsController')
const middleware=require('../middleware/authorization')


// ===================================authorApi=================================================

router.post('/authors',authorController.createAuthor)

//======================================blogApi===================================================

router.post('/blogs',middleware.mid1,blogsController.createBlogs)

//=======================================getBlogs================================================

router.get('blogs',blogsController.getBlogs)

//=======================================DELETE=================================================
router.delete("/blogs/:blogId",blogsController.deleteBlogsById)
router.delete('/blogs',blogsController.delBlogs)

//=======================================login================================================


router.post('/login',authorController.login);

module.exports = router;
