import mongoose from 'mongoose';

export interface IService extends mongoose.Document {
  providerId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  category: string;
  price: number;
  duration: number;
  images: string[];
  availability: {
    day: string;
    slots: {
      start: string;
      end: string;
    }[];
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new mongoose.Schema(
  {
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    duration: {
      type: Number,
      required: true,
      min: 15, // minimum 15 minutes
    },
    images: [{
      type: String,
    }],
    availability: [{
      day: {
        type: String,
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
        required: true,
      },
      slots: [{
        start: {
          type: String,
          required: true,
        },
        end: {
          type: String,
          required: true,
        },
      }],
    }],
  },
  {
    timestamps: true,
  }
);

// Index for searching
serviceSchema.index({ title: 'text', description: 'text', category: 'text' });

export const Service = mongoose.model<IService>('Service', serviceSchema);

export default Service; 