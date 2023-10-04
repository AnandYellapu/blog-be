const Comment = require('../models/Comment');

const getAllCommentsForPost = async (req, res) => {
  const postId = req.params.postId;

  try {
    const comments = await Comment.find({ postId });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createComment = async (req, res) => {
  const { feedback, postId } = req.body;

  try {
    const newComment = new Comment({ feedback, postId });
    await newComment.save();

    res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating comment' });
  }
};

module.exports = {
  getAllCommentsForPost,
  createComment,
};
