'use client';

import { useState } from 'react';

export default function OnboardingForm({ applicantId }: { applicantId: string }) {
  const [form, setForm] = useState({
    account_number: '',
    routing_number: '',
    bank_name: '',
    front_image: null as File | null,
    back_image: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files?.[0]) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('applicant_id', applicantId);
    formData.append('account_number', form.account_number);
    formData.append('routing_number', form.routing_number);
    formData.append('bank_name', form.bank_name);
    if (form.front_image) formData.append('front_image', form.front_image);
    if (form.back_image) formData.append('back_image', form.back_image);

    const res = await fetch('/api/onboarding', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      alert('Onboarding submitted successfully!');
    } else {
      alert('Submission failed.');
    }
  };

  return (
    <main className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Complete Your Onboarding</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          name="account_number"
          placeholder="Account Number"
          required
          onChange={handleChange}
          className="input"
        />
        <input
          name="routing_number"
          placeholder="Routing Number"
          required
          onChange={handleChange}
          className="input"
        />
        <input
          name="bank_name"
          placeholder="Bank Name"
          required
          onChange={handleChange}
          className="input"
        />

        <label className="block">
          <span>Upload ID Front</span>
          <input
            type="file"
            name="front_image"
            accept="image/*"
            required
            onChange={handleFileChange}
            className="input"
          />
        </label>

        <label className="block">
          <span>Upload ID Back</span>
          <input
            type="file"
            name="back_image"
            accept="image/*"
            required
            onChange={handleFileChange}
            className="input"
          />
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit Onboarding
        </button>
      </form>
    </main>
  );
}
