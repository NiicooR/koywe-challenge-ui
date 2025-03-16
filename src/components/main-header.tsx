'use client';

import Link from 'next/link';
import { useAuth } from '@/context/auth-context';

export default function MainHeader() {
  const { isLoggedIn, logout, user } = useAuth();

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-indigo-600">
                Currency Converter
              </Link>
            </div>
            {isLoggedIn && (
              <nav className="ml-6 flex space-x-4 sm:space-x-8 items-center">
                <Link href="/converter" className="text-gray-700 hover:text-gray-900">
                  New Quote
                </Link>
                <Link href="/quotes" className="text-gray-700 hover:text-gray-900">
                  Find Quote
                </Link>
              </nav>
            )}
          </div>
          <div className="flex items-center">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700">Hello, {user?.name}</span>
                <button
                  onClick={logout}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link href="/auth/login" className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Login
                </Link>
                <Link href="/auth/register" className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}