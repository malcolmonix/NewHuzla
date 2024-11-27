import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { AuthenticationError, NotFoundError } from '../utils/AppError';

// Generate JWT Token
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new AuthenticationError('User already exists');
    }

    // Create user
    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      role: role || 'customer',
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      token,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new AuthenticationError('Invalid credentials');
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new AuthenticationError('Invalid credentials');
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      token,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      throw new NotFoundError('User not found');
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.address = req.body.address || user.address;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      role: updatedUser.role,
      phoneNumber: updatedUser.phoneNumber,
      address: updatedUser.address,
    });
  } catch (error) {
    next(error);
  }
}; 