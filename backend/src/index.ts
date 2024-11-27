import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/auth.routes';
import serviceRoutes from './routes/service.routes';
import bookingRoutes from './routes/booking.routes';

// Import error handling middleware
import { errorHandler } from './middleware/error';
import { AppError, NotFoundError } from './utils/AppError';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/marketplace');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Service Marketplace API' });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);

// Handle 404 errors
app.all('*', (req, res, next) => {
  next(new NotFoundError(`Can't find ${req.originalUrl} on this server`));
});

// Global error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}); 