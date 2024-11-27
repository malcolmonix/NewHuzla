import Joi from 'joi';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const phoneRegex = /^\+?[\d\s-]{10,}$/;
const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

export const userValidation = {
  register: Joi.object({
    email: Joi.string().email().required().trim().lowercase(),
    password: Joi.string()
      .pattern(passwordRegex)
      .required()
      .messages({
        'string.pattern.base': 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character',
      }),
    firstName: Joi.string().required().trim().min(2).max(50),
    lastName: Joi.string().required().trim().min(2).max(50),
    role: Joi.string().valid('customer', 'provider').default('customer'),
    phoneNumber: Joi.string().pattern(phoneRegex).messages({
      'string.pattern.base': 'Phone number must be valid',
    }),
    address: Joi.object({
      street: Joi.string().trim().min(5).max(100),
      city: Joi.string().trim().min(2).max(50),
      state: Joi.string().trim().min(2).max(50),
      zipCode: Joi.string().trim().pattern(/^\d{5}(-\d{4})?$/),
      country: Joi.string().trim().min(2).max(50),
    }),
  }),

  login: Joi.object({
    email: Joi.string().email().required().trim().lowercase(),
    password: Joi.string().required(),
  }),

  updateProfile: Joi.object({
    firstName: Joi.string().trim().min(2).max(50),
    lastName: Joi.string().trim().min(2).max(50),
    email: Joi.string().email().trim().lowercase(),
    password: Joi.string().pattern(passwordRegex).messages({
      'string.pattern.base': 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character',
    }),
    phoneNumber: Joi.string().pattern(phoneRegex).messages({
      'string.pattern.base': 'Phone number must be valid',
    }),
    address: Joi.object({
      street: Joi.string().trim().min(5).max(100),
      city: Joi.string().trim().min(2).max(50),
      state: Joi.string().trim().min(2).max(50),
      zipCode: Joi.string().trim().pattern(/^\d{5}(-\d{4})?$/),
      country: Joi.string().trim().min(2).max(50),
    }),
  }),
};

export const serviceValidation = {
  create: Joi.object({
    title: Joi.string().required().trim().min(5).max(100),
    description: Joi.string().required().trim().min(20).max(1000),
    category: Joi.string().required().trim(),
    price: Joi.number().required().min(0).precision(2),
    duration: Joi.number().required().min(15).max(480), // max 8 hours
    images: Joi.array().items(
      Joi.string().uri().messages({
        'string.uri': 'Image URL must be valid',
      })
    ).max(10),
    availability: Joi.array().items(
      Joi.object({
        day: Joi.string()
          .valid('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')
          .required(),
        slots: Joi.array().items(
          Joi.object({
            start: Joi.string().pattern(timeRegex).required().messages({
              'string.pattern.base': 'Start time must be in HH:mm format',
            }),
            end: Joi.string().pattern(timeRegex).required().messages({
              'string.pattern.base': 'End time must be in HH:mm format',
            }),
          }).custom((value, helpers) => {
            const start = value.start.split(':').map(Number);
            const end = value.end.split(':').map(Number);
            const startMinutes = start[0] * 60 + start[1];
            const endMinutes = end[0] * 60 + end[1];
            
            if (endMinutes <= startMinutes) {
              return helpers.error('End time must be after start time');
            }
            return value;
          })
        ).min(1),
      })
    ).min(1).unique('day'),
  }),

  update: Joi.object({
    title: Joi.string().trim().min(5).max(100),
    description: Joi.string().trim().min(20).max(1000),
    category: Joi.string().trim(),
    price: Joi.number().min(0).precision(2),
    duration: Joi.number().min(15).max(480), // max 8 hours
    images: Joi.array().items(
      Joi.string().uri().messages({
        'string.uri': 'Image URL must be valid',
      })
    ).max(10),
    availability: Joi.array().items(
      Joi.object({
        day: Joi.string()
          .valid('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'),
        slots: Joi.array().items(
          Joi.object({
            start: Joi.string().pattern(timeRegex).messages({
              'string.pattern.base': 'Start time must be in HH:mm format',
            }),
            end: Joi.string().pattern(timeRegex).messages({
              'string.pattern.base': 'End time must be in HH:mm format',
            }),
          }).custom((value, helpers) => {
            const start = value.start.split(':').map(Number);
            const end = value.end.split(':').map(Number);
            const startMinutes = start[0] * 60 + start[1];
            const endMinutes = end[0] * 60 + end[1];
            
            if (endMinutes <= startMinutes) {
              return helpers.error('End time must be after start time');
            }
            return value;
          })
        ).min(1),
      })
    ).unique('day'),
  }),
};

export const bookingValidation = {
  create: Joi.object({
    serviceId: Joi.string().required().pattern(/^[0-9a-fA-F]{24}$/).messages({
      'string.pattern.base': 'Invalid service ID',
    }),
    date: Joi.date().greater('now').required().messages({
      'date.greater': 'Booking date must be in the future',
    }),
    slot: Joi.object({
      start: Joi.string().pattern(timeRegex).required().messages({
        'string.pattern.base': 'Start time must be in HH:mm format',
      }),
      end: Joi.string().pattern(timeRegex).required().messages({
        'string.pattern.base': 'End time must be in HH:mm format',
      }),
    }).custom((value, helpers) => {
      const start = value.start.split(':').map(Number);
      const end = value.end.split(':').map(Number);
      const startMinutes = start[0] * 60 + start[1];
      const endMinutes = end[0] * 60 + end[1];
      
      if (endMinutes <= startMinutes) {
        return helpers.error('End time must be after start time');
      }
      return value;
    }).required(),
  }),

  updateStatus: Joi.object({
    status: Joi.string()
      .valid('pending', 'confirmed', 'cancelled', 'completed')
      .required()
      .messages({
        'any.only': 'Status must be one of: pending, confirmed, cancelled, completed',
      }),
  }),
}; 