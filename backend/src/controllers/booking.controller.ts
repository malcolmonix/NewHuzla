import { Request, Response, NextFunction } from 'express';
import { Booking } from '../models/Booking';
import { Service } from '../models/Service';
import { NotFoundError, AuthorizationError, AppError } from '../utils/AppError';

// @desc    Create a booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { serviceId, date, slot } = req.body;

    // Check if service exists
    const service = await Service.findById(serviceId);
    if (!service) {
      throw new NotFoundError('Service not found');
    }

    // Check if slot is available
    const existingBooking = await Booking.findOne({
      serviceId,
      date,
      'slot.start': slot.start,
      'slot.end': slot.end,
      status: { $nin: ['cancelled'] },
    });

    if (existingBooking) {
      throw new AppError('This slot is already booked', 400);
    }

    const booking = await Booking.create({
      serviceId,
      customerId: req.user._id,
      providerId: service.providerId,
      date,
      slot,
      payment: {
        amount: service.price,
        status: 'pending',
      },
    });

    await booking.populate([
      { path: 'serviceId', select: 'title price duration' },
      { path: 'providerId', select: 'firstName lastName email' },
    ]);

    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings
// @access  Private
export const getBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = req.user.role === 'provider' 
      ? { providerId: req.user._id }
      : { customerId: req.user._id };

    const bookings = await Booking.find(query)
      .populate([
        { path: 'serviceId', select: 'title price duration' },
        { path: 'providerId', select: 'firstName lastName email' },
        { path: 'customerId', select: 'firstName lastName email' },
      ])
      .sort({ date: 1 });

    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
export const getBookingById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate([
        { path: 'serviceId', select: 'title price duration' },
        { path: 'providerId', select: 'firstName lastName email' },
        { path: 'customerId', select: 'firstName lastName email' },
      ]);

    if (!booking) {
      throw new NotFoundError('Booking not found');
    }

    // Check if user is authorized to view this booking
    if (
      booking.customerId.toString() !== req.user._id.toString() &&
      booking.providerId.toString() !== req.user._id.toString()
    ) {
      throw new AuthorizationError('Not authorized to view this booking');
    }

    res.json(booking);
  } catch (error) {
    next(error);
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private
export const updateBookingStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      throw new NotFoundError('Booking not found');
    }

    // Check if user is authorized to update this booking
    if (booking.providerId.toString() !== req.user._id.toString()) {
      throw new AuthorizationError('Not authorized to update this booking');
    }

    booking.status = status;
    await booking.save();

    res.json(booking);
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
export const cancelBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      throw new NotFoundError('Booking not found');
    }

    // Check if user is authorized to cancel this booking
    if (
      booking.customerId.toString() !== req.user._id.toString() &&
      booking.providerId.toString() !== req.user._id.toString()
    ) {
      throw new AuthorizationError('Not authorized to cancel this booking');
    }

    // Check if booking can be cancelled
    if (booking.status === 'completed') {
      throw new AppError('Cannot cancel a completed booking', 400);
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json(booking);
  } catch (error) {
    next(error);
  }
}; 