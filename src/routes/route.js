const express = require('express');
const router = express.Router();
const authorController=require('../controller/authorController')
const blogsController=require('../controller/blogsController.js')
const middleware=require('../middleware/authorization')


// ===================================authorApi=================================================

router.post('/authors',authorController.createAuthor)

//======================================blogApi===================================================

router.post('/blogs',middleware.authentication,blogsController.createBlogs)

//=======================================getBlogApi================================================

router.get('/blogs',middleware.authentication,blogsController.getBlogs)

//=======================================UpdateBlogApi============================================

router.put('/blogs/:blogId',middleware.authentication,middleware.authorisation,blogsController.updateBlogs)

//=======================================DELETE=================================================

router.delete("/blogs/:blogId",middleware.authentication,middleware.authorisation,blogsController.deleteBlogsById)

router.delete('/blogs',middleware.authentication,middleware.authorisation,blogsController.delBlogs)

//=======================================login================================================

router.post('/login',authorController.login);

module.exports = router;
