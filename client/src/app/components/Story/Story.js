import React from 'react';

const StoryComponent = () => {
  // Dummy data for demo purposes
  const stories = [
    { id: 1, username: 'CPP', imageUrl: '/download.png' },
    { id: 2, username: 'Necxis', imageUrl: '/2.jpg' },
    
    // Add more dummy stories if needed
  ];

  return (
    <div className="story-component">
      
      <div className="stories-container">
        {stories.map(story => (
          <div key={story.id} className="story">
            <img src={story.imageUrl} alt={story.username} />
            <p>{story.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryComponent;
