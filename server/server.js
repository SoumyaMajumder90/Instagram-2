// require("dotenv").config();
const express = require("express");
const router = require('./router');
const socketIo = require("socket.io");
const cors = require("cors");
const multer = require('multer');
const Post = require('./models/post-model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const PORT = 5000;
const app = express();
const server = require('http').createServer(app); // Create an HTTP server using Express
let likeCounter = 1;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`); // Corrected the template literal
  }
});

const upload = multer({storage})
const io = socketIo(server, {
    cors:{
        origin: "https://instagram-2-wine.vercel.app/", 
        
    }


});

io.on('connection', (socket) => {
  console.log('New client connected');

  // Handle like event
  socket.on('like', async (postId) => {
    try {
      // Find the post by its ID
      const post = await Post.findById(postId);
      if (!post) {
        console.log('Post not found');
        return;
      }
  
      // Push the like counter value into the likes array
      post.likes.push(likeCounter);
  
      // Increment the like counter for the next like
      likeCounter++;
  
      // Save the updated post
      await post.save();
  
      // Emit the updated post data to all clients
      io.emit('postUpdate', post);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  });
  // Handle comment event
  socket.on('comment', async ({ postId, comment }) => {
    try {
      // Find the post by its ID
      const post = await Post.findById(postId);
      if (!post) {
        console.log('Post not found');
        return;
      }

      // Add the comment to the post's comments array
      post.comments.push(comment);

      // Save the updated post
      await post.save();

      // Emit the new comment data to all clients
      io.emit('comment', { postId, comment });
    } catch (error) {
      console.error('Error handling comment:', error);
    }
  });


  // Handle disconnect event
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
}); 
const corsOption = {
    origin: "/*",
    methods : "GET, POST, PUT,DELETE, PATCH,HEAD",
    credentials: true,
};
app.use(cors(corsOption));
app.use(express.json());  
app.use(express.urlencoded({extended: false}));
app.use(express.static('uploads'));
const connectDb = require('./utils/db');
app.post('/upload', upload.single('profileImage'),(req, res) => {
  console.log(req.file);
  try {
    // Extract the path of the uploaded file from req.file
    const filename = req.file.filename;

    // Send the path back in the response
    res.status(200).json({ path: filename });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to upload file' });
  }
});


app.use("/api", router);

connectDb().then(()=>{
    server.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
