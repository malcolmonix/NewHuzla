import React, { useState, FormEvent } from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  Grid,
  TextField,
  Alert,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { UpdateProfileData } from '../services/auth.service';

type AddressField = 'street' | 'city' | 'state' | 'zipCode' | 'country';

const Profile = () => {
  const { currentUser, updateProfile } = useAuth();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<UpdateProfileData>({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || '',
    phoneNumber: currentUser?.phoneNumber || '',
    address: currentUser?.address || {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === 'address' && formData.address) {
        setFormData(prev => ({
          ...prev,
          address: {
            ...prev.address!,
            [child as AddressField]: value,
          },
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setError('');
      setSuccess('');
      setLoading(true);
      await updateProfile(formData);
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError('Failed to update profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <Avatar
            sx={{ width: 100, height: 100, mb: 2 }}
          >
            {formData.firstName?.[0]?.toUpperCase() || 'U'}
          </Avatar>
          <Typography variant="h4" component="h1" gutterBottom>
            Profile
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Address
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street"
                name="address.street"
                value={formData.address?.street}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                name="address.city"
                value={formData.address?.city}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State"
                name="address.state"
                value={formData.address?.state}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ZIP Code"
                name="address.zipCode"
                value={formData.address?.zipCode}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Country"
                name="address.country"
                value={formData.address?.country}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={loading}
          >
            Update Profile
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile; 