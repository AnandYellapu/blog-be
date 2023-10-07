

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


// const deleteComment = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const comment = await Comment.findById(id);
//     if (!comment) {
//       return res.status(404).json({ message: 'Comment not found' });
//     }

//     // Check if the user has permission to delete the comment (you may customize this)
//     if (comment.userId.toString() !== req.user.id) {
//       return res.status(403).json({ message: 'You do not have permission to delete this comment' });
//     }

//     await comment.remove();
//     res.json({ message: 'Comment deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

module.exports = {
  createComment,
  getCommentsByPostId,
  // deleteComment,
};
