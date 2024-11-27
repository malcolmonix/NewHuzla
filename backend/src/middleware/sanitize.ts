import { Request, Response, NextFunction } from 'express';
import { sanitizeObject } from '../utils/sanitize';

/**
 * Middleware to sanitize request body
 */
export const sanitizeBody = (req: Request, res: Response, next: NextFunction) => {
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }
  next();
};

/**
 * Middleware to sanitize request query parameters
 */
export const sanitizeQuery = (req: Request, res: Response, next: NextFunction) => {
  if (req.query) {
    req.query = sanitizeObject(req.query);
  }
  next();
};

/**
 * Middleware to sanitize request parameters
 */
export const sanitizeParams = (req: Request, res: Response, next: NextFunction) => {
  if (req.params) {
    req.params = sanitizeObject(req.params);
  }
  next();
};

/**
 * Combined middleware to sanitize all request data
 */
export const sanitizeRequest = [sanitizeBody, sanitizeQuery, sanitizeParams]; 