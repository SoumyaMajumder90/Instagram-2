// pages/HomePage.js

import React from 'react';
import { Container, Grid } from '@mui/material';
import Header from '../../components/Header';
import PostComponent from '../../components/PostComponent/PostComponent';
import Story from '../../components/Story/Story';
import RightPanel from '../../components/RightPanel/RightPanel';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';

import styles from './HomePage.css';

const HomePage = () => {

  // Placeholder data for posts, stories, and suggested accounts...
  return (
    <>
      <div className="homepage-container">
        <LeftSidebar/>
        <div className="main-content"> {/* Add main-content class here */}
          <Story />
          <PostComponent />
        </div>
        <RightPanel />
      </div>
    </>
  );
};

export default HomePage;
