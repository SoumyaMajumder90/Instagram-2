// Create.js
"use client"
// Create.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js

const Create = () => {
  const [description, setDescription] = useState('');
  const router = useRouter(); // Use useRouter hook from Next.js
  const [imgUrl,setImgUrl] = useState(null); // Access query parameter directly from useRouter
  useEffect(() => {
    if (router.query && router.query.imgUrl) {
      setImgUrl(router.query.imgUrl);
    }
  }, [router.query]);

  const handleCreatePost = async () => {
    try {
      // Send a POST request to create a new post with the image URL and description
      const response = await axios.post('http://localhost:5000/api/posts', { imageUrl: imgUrl, description });

      console.log('New post created:', response.data);

      // Clear input fields after successful post creation
      setDescription('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
    {imgUrl && <img src={imgUrl} alt="Uploaded" />} {/* Render img only if imgUrl is available */}
    <textarea
      placeholder="Enter description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
    <button onClick={handleCreatePost}>Create Post</button>
  </div>
  );
};

export default Create;
