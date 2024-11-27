import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/huzla';
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error: Error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

// Routes
app.use('/api/auth', authRoutes);

// Basic health check route
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 