import api from './api';

export interface TimeSlot {
  start: string;
  end: string;
}

export interface Availability {
  day: string;
  slots: TimeSlot[];
}

export interface ServiceData {
  title: string;
  description: string;
  category: string;
  price: number;
  duration: number;
  images?: string[];
  availability: Availability[];
}

export interface ServiceFilters {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}

const serviceService = {
  async createService(data: ServiceData) {
    const response = await api.post('/services', data);
    return response.data;
  },

  async getServices(filters?: ServiceFilters) {
    const response = await api.get('/services', { params: filters });
    return response.data;
  },

  async getServiceById(id: string) {
    const response = await api.get(`/services/${id}`);
    return response.data;
  },

  async updateService(id: string, data: Partial<ServiceData>) {
    const response = await api.put(`/services/${id}`, data);
    return response.data;
  },

  async deleteService(id: string) {
    const response = await api.delete(`/services/${id}`);
    return response.data;
  },

  async getProviderServices() {
    const response = await api.get('/services/provider/services');
    return response.data;
  },
};

export default serviceService; 