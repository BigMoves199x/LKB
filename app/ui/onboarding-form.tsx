"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


interface FormFields {
  first_name: string;
  middle_name: string;
  last_name: string;
  motherMaidenName: string;
  date_of_birth: string;
  ssn: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip_code: string;
  };
  routing_number: string;
  account_number: string;
  bank_name: string;
  front_image: File | null;
  back_image: File | null;
  w2_form: File | null; // ✅ match form field & server key
}

const initialForm: FormFields = {
  first_name: "",
  middle_name: "",
  last_name: "",
  motherMaidenName: "",
  date_of_birth: "",
  ssn: "",
  address: { street: "", city: "", state: "", zip_code: "" },
  routing_number: "",
  account_number: "",
  bank_name: "",
  front_image: null,
  back_image: null,
  w2_form: null,
};

/* ------------ Component ------------ */

export default function OnboardingForm({ applicantId }: { applicantId: string }) {
  const router = useRouter();
  const [form, setForm] = useState<FormFields>(initialForm);
  const [loading, setLoading] = useState(false);

  /* -- Handlers --------------------------------------------------- */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const key = name.split(".")[1] as keyof FormFields["address"];
      setForm(prev => ({ ...prev, address: { ...prev.address, [key]: value } }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files?.[0]) setForm(prev => ({ ...prev, [name]: files[0] }));
  };

  /* -- Submit ----------------------------------------------------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("applicant_id", applicantId);

      /* scalar (string) fields that map 1‑to‑1 with your SQL columns */
      const scalarFields = [
        "first_name",
        "middle_name",
        "last_name",
        "motherMaidenName",
        "date_of_birth",
        "ssn",
        "routing_number",
        "account_number",
        "bank_name",
      ] as const;

      scalarFields.forEach(f => {
        const v = form[f].trim();
        if (v) fd.append(f, v);
      });

      /* address fields must keep the dot notation */
      Object.entries(form.address).forEach(([k, v]) => {
        if (v.trim()) fd.append(`address.${k}`, v.trim());
      });

      /* file fields */
      const fileFields = ["front_image", "back_image", "w2_form"] as const;
      fileFields.forEach(f => {
        const file = form[f];
        if (file) fd.append(f, file);
      });

      /* optional: debug log */
      // for (const [k, v] of fd.entries()) console.log(k, v);

      const res = await fetch("/api/onboarding", { method: "POST", body: fd });

      if (!res.ok) {
        console.error("❌ Submission failed:", await res.text());
        alert("❌ Submission failed. Please review your input and try again.");
        return;
      }

      alert("✅ Onboarding submitted successfully!");
      router.push("/payment-instruction");
    } catch (err) {
      console.error("❌ Unexpected error:", err);
      alert("❌ Something went wrong. Please try again.");
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
           required
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
           required
        />
        <Input
          label="Date of Birth"
          name="date_of_birth"
          type="date"
          value={form.date_of_birth}
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
          label="Bank name"
          name="bank_name"
          value={form.bank_name}
          onChange={handleChange}
          required
        />

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
