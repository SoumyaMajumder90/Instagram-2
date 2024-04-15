const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  imageUrl: { type: String, required: true },
  description: { type: String },
  likes: { type: [Number], default: [] },
  comments: [{ text: String }],
  createdAt: { type: Date, default: Date.now },
  // Add other post properties as needed
});



const post = mongoose.model('post', postSchema);

module.exports = post;
