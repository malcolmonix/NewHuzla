import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
      }}
    >
      <Typography variant="h1" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Page Not Found
      </Typography>
      <Button component={RouterLink} to="/" variant="contained" sx={{ mt: 2 }}>
        Go Home
      </Button>
    </Box>
  );
};

export default NotFound; 