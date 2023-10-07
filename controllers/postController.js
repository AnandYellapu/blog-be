const verifyToken = require('../middleware/auth');
const Post = require('../models/Post');


const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.lastSeenTime = new Date();
    await post.save();

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createPost = async (req, res) => {
  const { title, content, author, imageUrl } = req.body;

  try {
    const newPost = new Post({ title, content, author, imageUrl });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating post' });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, imageUrl } = req.body;

  try {
    const post = await Post.findByIdAndUpdate(id, { title, content, imageUrl }, { new: true });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

try {

  verifyToken(req, res, async () => {
    const user = req.user;

    // Check if the user is an admin
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }
   
    const post = await Post.findByIdAndDelete(id);
    console.log('Post deleted:', post);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  });
} catch (err) {
  console.error('Error deleting post:', err);
  res.status(500).json({ message: err.message });
 }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
