import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof AppError) {
    if (err.name === 'ValidationError') {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        errors: (err as any).errors,
      });
    }

    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // MongoDB duplicate key error
  if (err.name === 'MongoServerError' && (err as any).code === 11000) {
    const field = Object.keys((err as any).keyValue)[0];
    return res.status(400).json({
      status: 'fail',
      message: `${field} already exists`,
    });
  }

  // MongoDB validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values((err as any).errors).map((val: any) => val.message);
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid input data',
      errors,
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid token. Please log in again',
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      status: 'fail',
      message: 'Your token has expired. Please log in again',
    });
  }

  // Default error
  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong',
  });
}; 