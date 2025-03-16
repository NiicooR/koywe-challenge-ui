import Link from 'next/link';
import MainHeader from '@/components/main-header';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MainHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Currency Conversion API
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Easily convert between fiat currencies and cryptocurrencies
          </p>
          
          <div className="mt-10">
            <div className="inline-flex rounded-md shadow">
              <Link href="/converter" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                Create Conversion
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link href="/quotes" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50">
                Find Quote
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}