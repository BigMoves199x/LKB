export type Applicant = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  resume_file: Buffer; // binary
  resume_mime: string;
  status: 'pending' | 'accepted' | 'rejected';
  application_date: string; // ISO date string
};

export type ApplicantOnboarding = {
  applicant_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  motherMaidenName: string;
  ssn: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip_code: string;
  };
  bank_account: {
    account_number: string;
    routing_number: string;
    bank_name: string;
  };
  id_documents: {
    front_image_url: string;
    back_image_url: string;
  };
  w2_form: Buffer; // binary
  onboarding_completed: boolean;
  onboarding_date?: string;
};

export type ApplicantPreview = {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  status: 'pending' | 'accepted' | 'rejected';
  application_date: string;
};

export type ApplicationForm = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  resume_file: Buffer;
  resume_mime: string;
  status: 'pending' | 'accepted' | 'rejected';
  application_date: string;
};

export type OnboardingForm = {
  applicant_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  mother_MaidenName: string;
  ssn: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip_code: string;
  };
  bank_account: {
    account_number: string;
    routing_number: string;
    bank_name: string;
  };
  id_documents: {
    front_image_url: string;
    back_image_url: string;
  };
  w2_form: Buffer; // binary upload
};

export type OnboardingDashboardRecord = {
  applicant_id: string;
  applicant_first_name: string;
  applicant_last_name: string;
  email: string;
  phone: string;
  resume_url: string; // URL or API path for download/view
  status: string;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  bank_name: string;
  account_number: string;
  routing_number: string;
  front_image_url: string;
  back_image_url: string;
  w2_form_url: string; // I renamed to clarify it’s a URL/path, not binary here
  onboarding_completed: boolean;
  onboarding_date: string;
};
