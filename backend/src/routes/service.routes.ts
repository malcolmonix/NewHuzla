import express from 'express';
import {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
  getProviderServices,
} from '../controllers/service.controller';
import { protect, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { sanitizeRequest } from '../middleware/sanitize';
import { serviceValidation } from '../utils/validation';

const router = express.Router();

// Public routes
router.get('/', sanitizeRequest, getServices);
router.get('/:id', sanitizeRequest, getServiceById);

// Protected routes (Provider only)
router.use(protect);
router.use(authorize('provider'));

router.post('/', sanitizeRequest, validate(serviceValidation.create), createService);
router.get('/provider/services', getProviderServices);
router.put('/:id', sanitizeRequest, validate(serviceValidation.update), updateService);
router.delete('/:id', sanitizeRequest, deleteService);

export default router; 