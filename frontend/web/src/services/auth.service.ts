import api from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  firstName: string;
  lastName: string;
  role?: 'customer' | 'provider';
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
}

const authService = {
  async login(credentials: LoginCredentials) {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async register(data: RegisterData) {
    const response = await api.post('/auth/register', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
  },

  async updateProfile(data: UpdateProfileData) {
    const response = await api.put('/auth/profile', data);
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
  },

  getToken() {
    return localStorage.getItem('token');
  },

  isAuthenticated() {
    return !!this.getToken();
  },
};

export default authService; 