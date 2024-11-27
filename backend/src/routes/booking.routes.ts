import express from 'express';
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking,
} from '../controllers/booking.controller';
import { protect, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { sanitizeRequest } from '../middleware/sanitize';
import { bookingValidation } from '../utils/validation';

const router = express.Router();

// All routes are protected
router.use(protect);

// Routes for both customers and providers
router.post('/', sanitizeRequest, validate(bookingValidation.create), createBooking);
router.get('/', sanitizeRequest, getBookings);
router.get('/:id', sanitizeRequest, getBookingById);
router.put('/:id/cancel', sanitizeRequest, cancelBooking);

// Provider-only routes
router.put(
  '/:id/status',
  authorize('provider'),
  sanitizeRequest,
  validate(bookingValidation.updateStatus),
  updateBookingStatus
);

export default router; 