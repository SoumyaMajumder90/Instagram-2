import React from 'react';
import './LeftSidebar.css';
import Link from 'next/link';
const LeftSidebar = () => {
  return (
    <div className="left-sidebar">
      <div className="logo">Instagram</div>
      <ul>
        <li> Home</li>
        <li> Search</li>
        <li>Explore</li>
        <li> Reels</li>
        <li> Messenger</li>
        <li> Notification</li>
        <li> <Link href="/upload">Create Post(The only button that works)</Link></li>
        <li>Profile </li>
        <li>Threads </li>
        <li>More </li>
      </ul>
    </div>
  );
};

export default LeftSidebar;
