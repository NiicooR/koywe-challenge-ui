'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { quoteService } from '@/services/quote-service';
import MainHeader from '@/components/main-header';
import LoadingSpinner from '@/components/loading-spinner';
import AuthGuard from '@/components/auth-guard';

const quoteIdSchema = z.object({
  quoteId: z.string().min(1, 'Quote ID is required'),
});

type QuoteIdFormData = z.infer<typeof quoteIdSchema>;

export default function QuotesPage() {
  const [quoteId, setQuoteId] = useState<string | null>(null);
  const [isExpired, setIsExpired] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<QuoteIdFormData>({
    resolver: zodResolver(quoteIdSchema)
  });

  const { 
    data: quote, 
    isLoading, 
    error,
  } = useQuery({
    queryKey: ['quote', quoteId],
    queryFn: () => quoteId ? quoteService.getQuoteById(quoteId) : null,
    enabled: !!quoteId,

  });

  const onSubmit = (data: QuoteIdFormData) => {
    setIsExpired(false);
    setQuoteId(data.quoteId);
  };

  const errorMessage = error 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? (error as any).message || 'Failed to fetch quote' 
    : null;

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <MainHeader />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Find Quote by ID</h1>
          
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="quoteId" className="block text-sm font-medium text-gray-700">Quote ID</label>
                <input
                  id="quoteId"
                  type="text"
                  {...register('quoteId')}
                  placeholder="Enter quote ID"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.quoteId && <p className="mt-1 text-sm text-red-600">{errors.quoteId.message}</p>}
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <LoadingSpinner size="small" />
                    <span className="ml-2">Searching...</span>
                  </div>
                ) : 'Find Quote'}
              </button>
            </form>
            
            {errorMessage && (
              <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {errorMessage}
              </div>
            )}
            
            {quote && (
              <div className={`mt-6 ${isExpired ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50 border-green-200'} border rounded-md p-4`}>
                <h2 className={`text-lg font-medium mb-2 ${isExpired ? 'text-yellow-800' : 'text-green-800'}`}>
                  {isExpired ? 'Quote Found (Expired)' : 'Quote Found'}
                </h2>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">ID:</span> {quote.id}</p>
                  <p><span className="font-medium">From:</span> {quote.from}</p>
                  <p><span className="font-medium">To:</span> {quote.to}</p>
                  <p><span className="font-medium">Amount:</span> {quote.amount.toLocaleString()}</p>
                  <p><span className="font-medium">Rate:</span> {quote.rate}</p>
                  <p>
                    <span className="font-medium">Converted Amount:</span> {quote.convertedAmount.toLocaleString()} {quote.to}
                  </p>
                  <p><span className="font-medium">Created:</span> {new Date(quote.timestamp).toLocaleString()}</p>
                  <p><span className="font-medium">Expires:</span> {new Date(quote.expiresAt).toLocaleString()}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}