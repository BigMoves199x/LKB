'use client'; // Required for useRouter

import { useRouter } from 'next/navigation';

export default function PaymentMethodPage() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/payment-method'); // or your desired route
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md text-center">
        <h1 className="text-2xl font-semibold text-blue-900 mb-6">Add Payment Method</h1>

        <div className="bg-white border rounded-md shadow-md p-6">
          <img src="https://www.vaco.com/wp-content/uploads/2025/02/Vaco-logo-dark.svg" alt="Vaco Logo" className="h-10 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-900">
            Vaco uses <span className="font-bold">Plaid</span> to connect your account
          </p>

          <div className="mt-6 text-left space-y-4">
            <div>
              <p className="font-semibold text-blue-900">Connect effortlessly</p>
              <p className="text-gray-700 text-sm">
                Plaid lets you securely connect your financial account in seconds
              </p>
            </div>
            <div>
              <p className="font-semibold text-blue-900">Your data belongs to you</p>
              <p className="text-gray-700 text-sm">
                Plaid doesn't sell personal info and will only use it with your permission
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleClick}
          className="mt-8 w-full bg-[#072a40] hover:bg-blue-800 text-white py-2 px-4 rounded-full font-semibold"
        >
          Continue
        </button>
      </div>
    </main>
  );
}
