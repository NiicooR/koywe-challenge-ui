'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { QuoteRequest, Quote } from '@/types/api';
import { quoteService } from '@/services/quote-service';
import MainHeader from '@/components/main-header';
import LoadingSpinner from '@/components/loading-spinner';
import AuthGuard from '@/components/auth-guard';

const quoteSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  from: z.string().min(1, 'From currency is required'),
  to: z.string().min(1, 'To currency is required')
});

type QuoteFormData = z.infer<typeof quoteSchema>;

export default function ConverterPage() {
  const [quote, setQuote] = useState<Quote | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      amount: 1000,
      from: 'ARS',
      to: 'ETH'
    }
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: QuoteRequest) => quoteService.createQuote(data),
    onSuccess: (data) => {
      setQuote(data);
    }
  });

  const currencies = [
    'ARS', 'USD', 'EUR', 'BTC', 'ETH', 'USDC', 'CLP', 'MXN'
  ];

  const onSubmit = (data: QuoteFormData) => {
    mutate(data);
  };

  const errorMessage = error 
    ? (error as any).message || 'An error occurred while creating the quote' 
    : null;

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <MainHeader />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Create Currency Conversion</h1>
          
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                  id="amount"
                  type="number"
                  step="any"
                  {...register('amount', { valueAsNumber: true })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>}
              </div>
              
              <div>
                <label htmlFor="from" className="block text-sm font-medium text-gray-700">From Currency</label>
                <select
                  id="from"
                  {...register('from')}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {currencies.map(currency => (
                    <option key={`from-${currency}`} value={currency}>{currency}</option>
                  ))}
                </select>
                {errors.from && <p className="mt-1 text-sm text-red-600">{errors.from.message}</p>}
              </div>
              
              <div>
                <label htmlFor="to" className="block text-sm font-medium text-gray-700">To Currency</label>
                <select
                  id="to"
                  {...register('to')}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {currencies.map(currency => (
                    <option key={`to-${currency}`} value={currency}>{currency}</option>
                  ))}
                </select>
                {errors.to && <p className="mt-1 text-sm text-red-600">{errors.to.message}</p>}
              </div>
              
              <button
                type="submit"
                disabled={isPending}
                className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isPending ? (
                  <div className="flex items-center justify-center">
                    <LoadingSpinner size="small" />
                    <span className="ml-2">Creating Quote...</span>
                  </div>
                ) : 'Create Quote'}
              </button>
            </form>
            
            {errorMessage && (
              <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {errorMessage}
              </div>
            )}
            
            {quote && (
              <div className="mt-6 bg-green-50 border border-green-200 rounded-md p-4">
                <h2 className="text-lg font-medium text-green-800 mb-2">Quote Created Successfully</h2>
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