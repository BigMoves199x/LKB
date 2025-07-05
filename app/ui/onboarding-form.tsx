'use client';

import { useState } from 'react';

export default function OnboardingForm({ applicantId }: { applicantId: string }) {
  const [form, setForm] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    maiden_name: '',
    dob: '',
    ssn: '',
    address: '',
    routing_number: '',
    account_number: '',
    front_image: null as File | null,
    back_image: null as File | null,
    selfie_with_id: null as File | null,
    photo: null as File | null,
    w2_form: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value as any);
    });

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
    <main className="max-w-5xl mx-auto px-4 py-10 font-sans">
      <h1 className="text-3xl font-bold text-center text-blue-900 mb-10">
        Final Stage Onboarding Information Form
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
       
        {/* Additional Identity Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="text" name="maiden_name" placeholder="Mother's Maiden Name" onChange={handleChange} className="input" />
          <input type="date" name="dob" required onChange={handleChange} className="input" />
          <input type="text" name="ssn" placeholder="SSN" required onChange={handleChange} className="input" />
        </div>

        {/* Address */}
        <div>
          <textarea
            name="address"
            placeholder="Full Contact Address"
            rows={3}
            required
            onChange={handleChange}
            className="input w-full"
          />
        </div>

        {/* Bank Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="routing_number" placeholder="Routing Number" required onChange={handleChange} className="input" />
          <input type="text" name="account_number" placeholder="Account Number" required onChange={handleChange} className="input" />
        </div>

        {/* Uploads */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-1">Driver's License (Front)</label>
            <input type="file" name="front_image" accept="image/*" required onChange={handleFileChange} className="file-input" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-1">Driver's License (Back)</label>
            <input type="file" name="back_image" accept="image/*" required onChange={handleFileChange} className="file-input" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-1">Photo holding ID</label>
            <input type="file" name="selfie_with_id" accept="image/*" required onChange={handleFileChange} className="file-input" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-1">Normal Photograph</label>
            <input type="file" name="photo" accept="image/*" required onChange={handleFileChange} className="file-input" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-1">
              Previous W2 Form <span className="text-teal-600 text-xs">(For those with W2 only)</span>
            </label>
            <input type="file" name="w2_form" accept=".pdf" onChange={handleFileChange} className="file-input" />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-orange-500 text-white px-8 py-2 rounded-full text-lg hover:bg-orange-600 transition"
          >
            Save & Continue
          </button>
        </div>
      </form>
    </main>
  );
}
