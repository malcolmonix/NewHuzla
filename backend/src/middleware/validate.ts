import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import { ValidationError } from '../utils/AppError';

export const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors: Record<string, string> = {};
      error.details.forEach((detail) => {
        errors[detail.path[0]] = detail.message;
      });
      throw new ValidationError(errors);
    }

    next();
  };
}; 