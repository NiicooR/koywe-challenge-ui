import { QuoteRequest } from '@/types/api';
import apiClient from '@/lib/api-client';

export const quoteService = {
  createQuote: async (quoteData: QuoteRequest) => {
    const response = await apiClient.post('/quote', quoteData);
    return response.data;
  },

  getQuoteById: async (quoteId: string) => {
    const response = await apiClient.get(`/quote/${quoteId}`);
    return response.data;
  }
};