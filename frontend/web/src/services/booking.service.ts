import api from './api';
import { TimeSlot } from './service.service';

export interface BookingData {
  serviceId: string;
  date: Date;
  slot: TimeSlot;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Booking extends BookingData {
  _id: string;
  customerId: string;
  providerId: string;
  status: BookingStatus;
  payment: {
    amount: number;
    status: 'pending' | 'completed' | 'refunded';
    transactionId?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const bookingService = {
  async createBooking(data: BookingData) {
    const response = await api.post('/bookings', data);
    return response.data;
  },

  async getBookings() {
    const response = await api.get('/bookings');
    return response.data;
  },

  async getBookingById(id: string) {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },

  async updateBookingStatus(id: string, status: BookingStatus) {
    const response = await api.put(`/bookings/${id}/status`, { status });
    return response.data;
  },

  async cancelBooking(id: string) {
    const response = await api.put(`/bookings/${id}/cancel`);
    return response.data;
  },
};

export default bookingService; 