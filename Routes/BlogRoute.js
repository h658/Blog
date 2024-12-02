const { newBlog, allBlogs, blog, toPublishBlog, toUnpublishBlog, editBlog, deleteBlog } 
= require('../Controller/BlogController')

const router = require('express').Router()

router.post('/addnewblog', newBlog)
router.get('/allblogs', allBlogs)
router.get('/blogbyslug/:slug', blog)
router.put('/publish/:slug', toPublishBlog)
router.put('/unpublish/:slug', toUnpublishBlog)
router.put('/edit/:slug', editBlog)
router.delete('/delete/:slug', deleteBlog)

module.exports = router;