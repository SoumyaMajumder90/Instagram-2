// components/SuggestedAccounts.js

import React from 'react';
import { Avatar, Card, CardContent, Typography } from '@mui/material';

const SuggestedAccounts = ({ account }) => {
  // Check if account is defined before accessing properties
  if (!account || !account.username || !account.imageUrl) {
    return null; // Return null if account is undefined or missing properties
  }

  return (
    <Card>
      <CardContent>
        <Avatar alt={account.username} src={account.imageUrl} />
        <Typography variant="body2" color="textSecondary" component="p">
          {account.username}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Follow
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SuggestedAccounts;
