

// controllers/commentController.js
const Comment = require('../models/Comment');

const createComment = async (req, res) => {
  const { postId, content } = req.body;
  const userId = req.user ? req.user.id : null; // Ensure that req.user is defined before accessing id

  try {
    // Log the user object
    console.log('User Object:', req.user);

    // Validate the data
    if (!postId || !content || !userId) {
      return res.status(400).json({ message: 'Invalid request data' });
    }

    console.log('User ID:', userId); // Log the user ID

    // Create a new comment
    const newComment = new Comment({ postId, content, userId });
    console.log('New Comment:', newComment); // Log the new comment object

    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating comment' });
  }
};


const getCommentsByPostId = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ postId });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createComment,
  getCommentsByPostId,
};
