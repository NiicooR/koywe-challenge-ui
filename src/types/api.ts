export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface QuoteRequest {
  amount: number;
  from: string;
  to: string;
}

export interface Quote {
  id: string;
  from: string;
  to: string;
  amount: number;
  rate: number;
  convertedAmount: number;
  timestamp: string;
  expiresAt: string;
}