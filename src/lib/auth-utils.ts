// lib/auth-utils.ts
import { jwtDecode } from 'jwt-decode';
import { User } from '@/types/api';

interface JwtPayload {
  sub: string;    // User ID
  email: string;  // User email
  exp: number;    // Expiration timestamp
}

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  
  const token = localStorage.getItem('token');
  
  if (!token) {
    return false;
  }
  
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000;
    
    if (decoded.exp < currentTime) {
      localStorage.removeItem('token');
      return false;
    }
    
    return true;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    localStorage.removeItem('token');
    return false;
  }
};

export const getUserInfo = (): User | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  
  const token = localStorage.getItem('token');
  
  if (!token) {
    return null;
  }
  
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    
    return {
      id: decoded.sub,
      email: decoded.email,
      name: decoded.email.split('@')[0] // Use part of email as name
    };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
};