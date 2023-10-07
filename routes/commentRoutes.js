
// In routes/comments.js
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/create-comment', commentController.createComment);
router.get('/:postId', commentController.getCommentsByPostId);
// router.delete('/:commentId', commentController.deleteComment);

module.exports = router;
