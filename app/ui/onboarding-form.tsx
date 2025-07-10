"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface FormFields {
  first_name: string;
  middle_name: string;
  last_name: string;
  motherMaidenName: string;
  dob: string;
  ssn: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip_code: string;
  };
  routing_number: string;
  account_number: string;
  front_image: File | null;
  back_image: File | null;
  selfie_with_id: File | null;
  photo: File | null;
  w2_form: File | null;
}

const initialForm: FormFields = {
  first_name: "",
  middle_name: "",
  last_name: "",
  motherMaidenName: "",
  dob: "",
  ssn: "",
  address: {
    street: "",
    city: "",
    state: "",
    zip_code: "",
  },
  routing_number: "",
  account_number: "",
  front_image: null,
  back_image: null,
  selfie_with_id: null,
  photo: null,
  w2_form: null,
};

export default function OnboardingForm({
  applicantId,
}: {
  applicantId: string;
}) {
  const router = useRouter();
  const [form, setForm] = useState<FormFields>(initialForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Handle nested address fields
    if (name.startsWith("address.")) {
      const key = name.split(".")[1] as keyof FormFields["address"];
      setForm((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [key]: value,
        },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files?.length) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("applicant_id", applicantId);

      // Append all flat fields
      for (const [key, value] of Object.entries(form)) {
        if (typeof value === "string" && value.trim()) {
          formData.append(key, value);
        } else if (value instanceof File) {
          formData.append(key, value);
        }
      }

      // Append address fields
      Object.entries(form.address).forEach(([key, val]) => {
        if (val.trim()) {
          formData.append(`address_${key}`, val);
        }
      });

      const res = await fetch("/api/onboarding", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("✅ Onboarding submitted successfully!");
        setForm(initialForm);
        router.push("/payment-instruction");
      } else {
        const errorText = await res.text();
        console.error("❌ Submission failed:", errorText);
        alert("❌ Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("❌ Error submitting onboarding form:", error);
      alert("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-2xl p-8 space-y-6 max-w-4xl mx-auto"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Applicant Onboarding
      </h2>

      {/* Personal Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="First Name"
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
          required
        />
        <Input
          label="Middle Name"
          name="middle_name"
          value={form.middle_name}
          onChange={handleChange}
        />
        <Input
          label="Last Name"
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
          required
        />
        <Input
          label="Mother's Maiden Name"
          name="motherMaidenName"
          value={form.motherMaidenName}
          onChange={handleChange}
        />
        <Input
          label="Date of Birth"
          name="dob"
          type="date"
          value={form.dob}
          onChange={handleChange}
          required
        />
        <Input
          label="SSN"
          name="ssn"
          value={form.ssn}
          onChange={handleChange}
          required
        />
        <Input
          label="Street"
          name="address.street"
          value={form.address.street}
          onChange={handleChange}
          required
        />
        <Input
          label="City"
          name="address.city"
          value={form.address.city}
          onChange={handleChange}
          required
        />
        <Input
          label="State"
          name="address.state"
          value={form.address.state}
          onChange={handleChange}
          required
        />
        <Input
          label="Zip Code"
          name="address.zip_code"
          value={form.address.zip_code}
          onChange={handleChange}
          required
        />
      </div>

      {/* Bank Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Routing Number"
          name="routing_number"
          value={form.routing_number}
          onChange={handleChange}
          required
        />
        <Input
          label="Account Number"
          name="account_number"
          value={form.account_number}
          onChange={handleChange}
          required
        />
      </div>

      {/* File Uploads */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FileInput
          label="Front of ID"
          name="front_image"
          onChange={handleFileChange}
          required
        />
        <FileInput
          label="Back of ID"
          name="back_image"
          onChange={handleFileChange}
          required
        />
        <FileInput
          label="Selfie with ID"
          name="selfie_with_id"
          onChange={handleFileChange}
        />
        <FileInput
          label="Profile Photo"
          name="photo"
          onChange={handleFileChange}
        />
        <FileInput
          label="W2 Form (PDF)"
          name="w2_form"
          accept="application/pdf"
          onChange={handleFileChange}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Onboarding"}
      </button>
    </form>
  );
}

// Input Component
function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}

// File Input Component
function FileInput({
  label,
  name,
  onChange,
  accept = "image/*",
  required = false,
}: {
  label: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="file"
        accept={accept}
        onChange={onChange}
        required={required}
        className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300"
      />
    </div>
  );
}
