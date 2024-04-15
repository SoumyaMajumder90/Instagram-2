import React from 'react';
import './RightPanel.css';

const RightPanel = () => {
  // Array of suggested profiles
  const suggestedProfiles = [
    { id: 1, name: 'Ram', profilePic: '/ram.jfif' },
    { id: 2, name: 'Samsung', profilePic: '/Samsung-logo.jpg' },
    { id: 3, name: 'Necxis', profilePic: '/necxis.png' },
    // Add more profiles as needed
  ];

  return (
    <div className="right-panel">
      <div className="profile">
        <img src="/download.png" alt="" />
        soumyamajumdersm90
        <button>Switch</button>
      </div>
      <div className="suggested-for-me">
        <p>Suggested for you</p>
        {/* Map over the suggestedProfiles array */}
        {suggestedProfiles.map(profile => (
          <div key={profile.id} className="profile-item">
            <img src={profile.profilePic} alt={profile.name} />
            <div className="profile-info">
              <p>{profile.name}</p>
              <button>Follow</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightPanel;
