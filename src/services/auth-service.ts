import { LoginRequest, RegisterRequest } from '@/types/api';
import apiClient from '@/lib/api-client';

export const authService = {
  login: async (credentials: LoginRequest) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData: RegisterRequest) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }
};