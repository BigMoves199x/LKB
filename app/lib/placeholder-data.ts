// This file contains placeholder data for a Job Application system.
// Replace these with real data or database queries in production.

const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'Admin',
    email: 'admin@jobportal.com',
    password: 'securepassword', // Note: Always hash passwords in production
  },
];

const applicants = [
  {
    id: 'a1',
    full_name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '555-123-4567',
    date_of_birth: '1990-04-15',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip_code: '10001',
    },
    ssn: '234-21-234',
    position_applied: 'Frontend Developer',
    resume_url: '/resumes/jane-doe.pdf',
    status: 'pending',
    application_date: '2025-06-10',
  },
  {
    id: 'a2',
    full_name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '555-987-6543',
    date_of_birth: '1988-09-23',
    address: {
      street: '456 Elm St',
      city: 'Los Angeles',
      state: 'CA',
      zip_code: '90001',
    },
    ssn: '345-65-678',
    position_applied: 'Backend Developer',
    resume_url: '/resumes/john-smith.pdf',
    status: 'accepted',
    application_date: '2025-06-12',
  },
  {
    id: 'a3',
    full_name: 'Emily Johnson',
    email: 'emily.j@example.com',
    phone: '555-555-1212',
    date_of_birth: '1995-01-30',
    address: {
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zip_code: '60601',
    },
    ssn: '654-49-101',
    position_applied: 'UI/UX Designer',
    resume_url: '/resumes/emily-johnson.pdf',
    status: 'rejected',
    application_date: '2025-06-01',
  },
];

const onboarding = [
  {
    applicant_id: 'a2',
    bank_account: {
      account_number: '987654321',
      routing_number: '123456789',
      bank_name: 'Bank of America',
    },
    id_documents: {
      front_image_url: '/ids/john-smith-front.png',
      back_image_url: '/ids/john-smith-back.png',
    },
    onboarding_completed: true,
    onboarding_date: '2025-06-20',
  },

  
];

const monthlyStats = [
  { month: 'Jan', applications: 15 },
  { month: 'Feb', applications: 22 },
  { month: 'Mar', applications: 30 },
  { month: 'Apr', applications: 18 },
  { month: 'May', applications: 27 },
  { month: 'Jun', applications: 35 },
];

export { users, applicants, onboarding, monthlyStats };
