// routes/posts.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Define routes for posts
router.get('/post-list', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/create-post', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;
