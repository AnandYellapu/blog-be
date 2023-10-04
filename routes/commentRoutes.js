const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
// const auth = require('../middleware/auth');

// Define routes for comments
router.get('/comment/:commentId', commentController.getAllCommentsForPost);
router.post('/comment', commentController.createComment);

module.exports = router;
