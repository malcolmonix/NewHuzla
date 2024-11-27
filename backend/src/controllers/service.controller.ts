import { Request, Response, NextFunction } from 'express';
import { Service } from '../models/Service';
import { NotFoundError, AuthorizationError } from '../utils/AppError';

// @desc    Create a service
// @route   POST /api/services
// @access  Private (Provider only)
export const createService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const service = await Service.create({
      ...req.body,
      providerId: req.user._id,
    });

    res.status(201).json(service);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all services
// @route   GET /api/services
// @access  Public
export const getServices = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, search, minPrice, maxPrice } = req.query;
    const query: any = {};

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Search in title and description
    if (search) {
      query.$text = { $search: search as string };
    }

    const services = await Service.find(query)
      .populate('providerId', 'firstName lastName email')
      .sort({ createdAt: -1 });

    res.json(services);
  } catch (error) {
    next(error);
  }
};

// @desc    Get service by ID
// @route   GET /api/services/:id
// @access  Public
export const getServiceById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate('providerId', 'firstName lastName email');

    if (!service) {
      throw new NotFoundError('Service not found');
    }

    res.json(service);
  } catch (error) {
    next(error);
  }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private (Provider only)
export const updateService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      throw new NotFoundError('Service not found');
    }

    // Check if user is the service provider
    if (service.providerId.toString() !== req.user._id.toString()) {
      throw new AuthorizationError('Not authorized to update this service');
    }

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedService);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private (Provider only)
export const deleteService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      throw new NotFoundError('Service not found');
    }

    // Check if user is the service provider
    if (service.providerId.toString() !== req.user._id.toString()) {
      throw new AuthorizationError('Not authorized to delete this service');
    }

    await service.deleteOne();
    res.json({ message: 'Service removed' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get provider services
// @route   GET /api/services/provider
// @access  Private (Provider only)
export const getProviderServices = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const services = await Service.find({ providerId: req.user._id })
      .sort({ createdAt: -1 });

    res.json(services);
  } catch (error) {
    next(error);
  }
}; 