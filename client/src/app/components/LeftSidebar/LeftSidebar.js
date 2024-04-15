import React from 'react';
import Home from '@mui/icons-material/Home';
import Search from '@mui/icons-material/Search';
import Explore from '@mui/icons-material/Explore';
import PlayCircleOutline from '@mui/icons-material/PlayCircleOutline';
import Message from '@mui/icons-material/Message';
import Notifications from '@mui/icons-material/Notifications';
import Person2Icon from '@mui/icons-material/Person2';
import Add from '@mui/icons-material/Add';
import GestureIcon from '@mui/icons-material/Gesture';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import './LeftSidebar.css';
import Link from 'next/link';
const LeftSidebar = () => {
  return (
    <div className="left-sidebar">
      <div className="logo">Instagram</div>
      <ul>
        <li><Home /> Home</li>
        <li><Search /> Search</li>
        <li><Explore /> Explore</li>
        <li><PlayCircleOutline /> Reels</li>
        <li><Message /> Messenger</li>
        <li><Notifications /> Notification</li>
        <li> <Link href="/upload"><Add />Create Post(The only button that works)</Link></li>
        <li><Person2Icon/>Profile </li>
        <li><GestureIcon/>Threads </li>
        <li><DensityMediumIcon/>More </li>
      </ul>
    </div>
  );
};

export default LeftSidebar;
