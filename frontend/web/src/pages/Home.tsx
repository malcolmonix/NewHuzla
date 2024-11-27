import React from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Our App
      </Typography>
      <Typography variant="h5" component="h2" color="text.secondary" paragraph>
        Your one-stop solution for all your needs
      </Typography>
      
      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Feature 1
            </Typography>
            <Typography paragraph>
              Description of the first main feature of your application.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Feature 2
            </Typography>
            <Typography paragraph>
              Description of the second main feature of your application.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Feature 3
            </Typography>
            <Typography paragraph>
              Description of the third main feature of your application.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 6 }}>
        <Button
          component={RouterLink}
          to="/services"
          variant="contained"
          size="large"
          sx={{ mr: 2 }}
        >
          View Services
        </Button>
        <Button
          component={RouterLink}
          to="/register"
          variant="outlined"
          size="large"
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
};

export default Home; 