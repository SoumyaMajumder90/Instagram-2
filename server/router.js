const express = require('express');
const router = express.Router();
const Post = require('./models/post-model.js'); // Import your Post model

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/Images');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname+"_"+ Date.now()+ path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });

// Route for uploading a file



router.post('/posts', async (req, res) => {
  try {
    // Assuming you're generating a placeholder user ID for posts created without authentication
    const userId = 'placeholder_user_id';

    // Extract other post data from the request body
    const { imageUrl, description } = req.body;

    // Create a new post with the placeholder user ID
    const newPost = await Post.create({ user: userId, imageUrl, description });

    // Return the newly created post
    res.status(201).json(newPost);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: 'Failed to create post' });
  }
});


router.post('/posts/:postId/like', async (req, res) => {
  try {
    // Get the postId from the request parameters
    const { postId } = req.params;

    // Find the post by postId and perform the like operation
    // (Here, you'll add the user's ID to the likes array in the post document)

    // Return a success response
    res.status(200).json({ message: 'Post liked successfully' });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: 'Failed to like post' });
  }
});

router.get('/allposts', async (req, res) => {
  try {
    const posts = await Post.find(); // Retrieve all posts from MongoDB
    res.json(posts); // Send the retrieved posts as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
});
router.post('/posts/:postId/comment', async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;

    // Find the post by postId
    const post = await Post.findById(postId);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Add the comment to the comments array
    post.comments.push({ text });

    // Save the updated post
    await post.save();

    // Return a success message
    res.status(200).json({ message: 'Comment added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add comment' });
  }
});
router.get('/posts/images', async (req, res) => {
  try {
    // Find all posts and select only the imageUrl field
    const posts = await Post.find({}, 'imageUrl');

    // Extract image URLs from the posts
    const imageUrls = posts.map(post => post.imageUrl);

    // Send the image URLs as a response
    res.json(imageUrls);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch image URLs' });
  }
});


module.exports = router;