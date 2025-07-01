'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ApplicantForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    street: '',
    city: '',
    state: '',
    zip_code: '',
    position_applied: '',
    resume: null as File | null,
    cover_letter: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    setLoading(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value as any);
    });

    const res = await fetch('/api/apply', {
      method: 'POST',
      body: formData,
    });

    setLoading(false);

    if (res.ok) {
      router.push("/apply/success");
    } else {
      alert('Something went wrong.');
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Job Application</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input name="full_name" placeholder="Full Name" required onChange={handleChange} className="input" />
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} className="input" />
        <input name="phone" placeholder="Phone" required onChange={handleChange} className="input" />
        <input type="date" name="date_of_birth" required onChange={handleChange} className="input" />

        <input name="street" placeholder="Street" required onChange={handleChange} className="input" />
        <input name="city" placeholder="City" required onChange={handleChange} className="input" />
        <input name="state" placeholder="State" required onChange={handleChange} className="input" />
        <input name="zip_code" placeholder="ZIP Code" required onChange={handleChange} className="input" />

        <select name="position_applied" required onChange={handleChange} className="input">
          <option value="">Select Position</option>
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="UI/UX Designer">UI/UX Designer</option>
        </select>

        <label className="block">
          <span>Resume (PDF)</span>
          <input name="resume" type="file" accept=".pdf" required onChange={handleFileChange} className="input" />
        </label>

        <label className="block">
          <span>Cover Letter (PDF)</span>
          <input name="cover_letter" type="file" accept=".pdf" onChange={handleFileChange} className="input" />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </main>
  );
}
