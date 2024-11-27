import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import authService, { LoginCredentials, RegisterData, UpdateProfileData } from '../services/auth.service';

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'customer' | 'provider' | 'admin';
  phoneNumber?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const user = await authService.getCurrentUser();
          setCurrentUser(user);
        }
      } catch (err) {
        console.error('Failed to initialize auth:', err);
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setError(null);
      const user = await authService.login(credentials);
      setCurrentUser(user);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to login');
      throw err;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setError(null);
      const user = await authService.register(data);
      setCurrentUser(user);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to register');
      throw err;
    }
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  const updateProfile = async (data: UpdateProfileData) => {
    try {
      setError(null);
      const updatedUser = await authService.updateProfile(data);
      setCurrentUser(updatedUser);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile');
      throw err;
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 