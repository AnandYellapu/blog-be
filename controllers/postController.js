// const Post = require('../models/Post');

// const getAllPosts = async (req, res) => {
//   try {
//     const posts = await Post.find();
//     res.json(posts);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const getPostById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const post = await Post.findById(id);
//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }

//     res.json(post);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // const createPost = async (req, res) => {
// //   const { title, content } = req.body;

// //   try {
// //     console.log('Received data:', { title, content });
// //     const newPost = new Post({ title, content });

// //     // Optionally, associate the post with the logged-in user
// //     newPost.author = req.user.id;

// //     await newPost.save();
// //     res.status(201).json(newPost);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// const createPost = async (req, res) => {
//   const { title, content } = req.body;

//   // console.log('Received data:', { title, content });

//   try {
//     const newPost = new Post({ title, content });
//     newPost.author = req.user.id;  // Optionally, associate the post with the logged-in user

//     await newPost.save();
//     res.status(201).json(newPost);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error creating post' });
//   }
// };



// const updatePost = async (req, res) => {
//   const { id } = req.params;
//   const { title, content } = req.body;

//   try {
//     const post = await Post.findByIdAndUpdate(id, { title, content }, { new: true });

//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }

//     res.json(post);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const deletePost = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const post = await Post.findByIdAndDelete(id);
//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }

//     res.json({ message: 'Post deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = {
//   getAllPosts,
//   getPostById,
//   createPost,
//   updatePost,
//   deletePost,
// };






// controllers/postsController.js
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

    // Update lastSeenTime when the post is viewed
    post.lastSeenTime = new Date();
    await post.save();

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createPost = async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const newPost = new Post({ title, content, author });
    // createdAt will be automatically set to the current date and time
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating post' });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const post = await Post.findByIdAndUpdate(id, { title, content }, { new: true });

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
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
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
