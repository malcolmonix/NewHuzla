import mongoose from 'mongoose';

export interface IBooking extends mongoose.Document {
  serviceId: mongoose.Types.ObjectId;
  customerId: mongoose.Types.ObjectId;
  providerId: mongoose.Types.ObjectId;
  date: Date;
  slot: {
    start: string;
    end: string;
  };
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  payment: {
    amount: number;
    status: 'pending' | 'completed' | 'refunded';
    transactionId?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new mongoose.Schema(
  {
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    slot: {
      start: {
        type: String,
        required: true,
      },
      end: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    payment: {
      amount: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        enum: ['pending', 'completed', 'refunded'],
        default: 'pending',
      },
      transactionId: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
bookingSchema.index({ customerId: 1, date: -1 });
bookingSchema.index({ providerId: 1, date: -1 });
bookingSchema.index({ serviceId: 1 });
bookingSchema.index({ status: 1 });

export const Booking = mongoose.model<IBooking>('Booking', bookingSchema);

export default Booking; 