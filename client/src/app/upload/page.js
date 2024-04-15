// Upload.js
"use client"
import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Store the selected file in state
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (file.size > 5 * 1024 * 1024) { // 5MB in bytes
      alert('the file size is greater than 5MB');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('profileImage', file); // Append the file to FormData

      // Upload the picture
      const response = await axios.post('https://instagram-2.onrender.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('File uploaded successfully:', response.data);

      // Once the picture is uploaded, set the imageUrl and add a comment
      const imageUrl = response.data.path;

      // Add a comment
      const newPost = await axios.post('https://instagram-2.onrender.com/api/posts', { imageUrl, description });

      console.log('New post created:', newPost.data);

      // Clear input fields after successful post creation
      setFile(null);
      setDescription('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" name="profileImage" onChange={handleFileChange} />
        <textarea
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Upload;
