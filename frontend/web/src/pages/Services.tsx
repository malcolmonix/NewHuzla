import React, { useState, ChangeEvent } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  price: string;
}

// Mock data - replace with actual API calls
const mockServices: Service[] = [
  {
    id: 1,
    title: 'Service 1',
    description: 'Description for Service 1',
    image: 'https://source.unsplash.com/random/400x300?service',
    price: '$99',
  },
  {
    id: 2,
    title: 'Service 2',
    description: 'Description for Service 2',
    image: 'https://source.unsplash.com/random/400x300?business',
    price: '$149',
  },
  {
    id: 3,
    title: 'Service 3',
    description: 'Description for Service 3',
    image: 'https://source.unsplash.com/random/400x300?professional',
    price: '$199',
  },
  {
    id: 4,
    title: 'Service 4',
    description: 'Description for Service 4',
    image: 'https://source.unsplash.com/random/400x300?work',
    price: '$299',
  },
];

const Services = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState('');
  const [services] = useState<Service[]>(mockServices);

  const handleSearch = () => {
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Our Services
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search services..."
          value={searchQuery}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch} edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Grid container spacing={4}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={service.image}
                alt={service.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {service.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {service.description}
                </Typography>
                <Typography variant="h6" color="primary">
                  {service.price}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => console.log('Book service:', service.id)}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Services; 