// This file contains type definitions for the job application system.
// It models applicant data and tracks onboarding steps like bank info and ID upload.

// Core type representing a job applicant's personal and application information
export type Applicant = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip_code: string;
  };
  ssn_last4: string; // Last 4 digits of Social Security Number (optional for verification)
  position_applied: string;
  resume_url: string;
  status: 'pending' | 'accepted' | 'rejected';
  application_date: string;
};

// Additional info collected *after* the applicant is accepted
export type ApplicantOnboarding = {
  applicant_id: string; // Foreign key linking to Applicant.id
  bank_account: {
    account_number: string;
    routing_number: string;
    bank_name: string;
  };
  id_documents: {
    front_image_url: string;
    back_image_url: string;
  };
  onboarding_completed: boolean;
  onboarding_date?: string;
};

// For displaying a list or table of applicants with minimal details
export type ApplicantPreview = {
  id: string;
  full_name: string;
  email: string;
  position_applied: string;
  status: 'pending' | 'accepted' | 'rejected';
  application_date: string;
};

// A form type for job application input
export type ApplicationForm = {
  full_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip_code: string;
  };
  ssn: string;
  position_applied: string;
  resume_file: File;
};

// A form type for onboarding step (only available to accepted applicants)
export type OnboardingForm = {
  applicant_id: string;
  account_number: string;
  routing_number: string;
  bank_name: string;
  id_front_file: File;
  id_back_file: File;
};
