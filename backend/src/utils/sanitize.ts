import { escape } from 'validator';

/**
 * Sanitizes a string by removing HTML tags and special characters
 */
export const sanitizeString = (str: string): string => {
  if (!str) return str;
  return escape(str.trim());
};

/**
 * Sanitizes an email address
 */
export const sanitizeEmail = (email: string): string => {
  if (!email) return email;
  return email.toLowerCase().trim();
};

/**
 * Sanitizes a phone number by removing non-numeric characters except + for country code
 */
export const sanitizePhone = (phone: string): string => {
  if (!phone) return phone;
  return phone.replace(/[^\d+]/g, '');
};

/**
 * Sanitizes an object by recursively sanitizing all string values
 */
export const sanitizeObject = (obj: any): any => {
  if (!obj || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }

  const sanitized: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      switch (key) {
        case 'email':
          sanitized[key] = sanitizeEmail(value);
          break;
        case 'phoneNumber':
          sanitized[key] = sanitizePhone(value);
          break;
        case 'password':
          // Don't sanitize passwords
          sanitized[key] = value;
          break;
        default:
          sanitized[key] = sanitizeString(value);
      }
    } else if (typeof value === 'object') {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}; 