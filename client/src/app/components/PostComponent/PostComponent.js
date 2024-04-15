// In your PostComponent
"use client"
// In your PostComponent
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './PostComponent.css'; // Import the CSS file

const socket = io.connect("https://instagram-2.onrender.com");

const PostComponent = () => {
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState('');
  socket.on('like', (likedPostId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post._id === likedPostId) {
          return { ...post, likes: post.likes + 1 }; // Increment the like count
        }
        return post;
      })
    );
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://instagram-2.onrender.com/api/allposts');
        setPosts(response.data || []); // Ensure posts is always initialized as an array
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchPosts();
    
    
    socket.on('postUpdate', (updatedPosts) => {
      if (Array.isArray(updatedPosts)) {
        setPosts(updatedPosts);
      } else {
        console.error('Received non-array value for updatedPosts');
      }
    });
    socket.on('like', (updatedPost) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post._id === updatedPost._id) {
            return updatedPost; // Update the post with the updated like count from the server
          }
          return post;
        })
      );
    });
  
    socket.on('comment', ({ postId, comment }) => {
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId ? { ...post, comments: [...post.comments, comment] } : post
        )
      );
    });
  
    return () => {
      socket.off('postUpdate');
      socket.off('comment');
    };
  }, []);
  

  const handleLike = (postId) => {
    socket.emit('like', postId); // Emit like event to server
    // Optimistically update the like count in the UI
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post._id === postId) {
          return { ...post, likes: post.likes + 1 }; // Increment the like count
        }
        return post;
      })
    );
  };
  const handleLikeToggle = (postId, liked) => {
    socket.emit('like', postId);
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post._id === postId ? { ...post, liked: !liked } : post
      )
    );
  };
  const handleComment = (postId) => {
    setShowCommentInput(true);
    setSelectedPostId(postId);
  };

  const handleSubmit = () => {
    // Emit comment to the server
    socket.emit('comment', { postId: selectedPostId, comment: { text: commentText } });
    setCommentText('');
    setShowCommentInput(false);
  };

  const renderComments = (comments) => {
    return (
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment.text}</li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      {posts.map((post) => (
        <div className="post-container" key={post._id}>
          <img src={`https://instagram-2.onrender.com/${post.imageUrl}`} alt="Post" className="post-image" />
          <div className="post-description">{post.description}</div>
          <div className="post-actions">
            <button className="like-button" onClick={() => handleLike(post._id)}>
              {post.likes.length > 0 ? <>{post.likes.length} </> : null}
              {post.liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </button>
            <button className="comment-button" onClick={() => handleComment(post._id)}>
              Comment
            </button>
          </div>
          <div className="comments-section">
            {post.comments && renderComments(post.comments)}
            {showCommentInput && selectedPostId === post._id && (
              <div>
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button onClick={handleSubmit}>Submit</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostComponent;
