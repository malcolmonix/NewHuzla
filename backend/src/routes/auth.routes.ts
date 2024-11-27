import express from 'express';
import { register, login, getCurrentUser, updateProfile } from '../controllers/auth.controller';
import { protect } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { sanitizeRequest } from '../middleware/sanitize';
import { userValidation } from '../utils/validation';

const router = express.Router();

// Public routes
router.post('/register', sanitizeRequest, validate(userValidation.register), register);
router.post('/login', sanitizeRequest, validate(userValidation.login), login);

// Protected routes
router.get('/me', protect, getCurrentUser);
router.put('/profile', protect, sanitizeRequest, validate(userValidation.updateProfile), updateProfile);

export default router; 