'use server';

import { z } from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// Schema for validating application form data
const ApplicationSchema = z.object({
  id: z.string().uuid(),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(8),
  resume_url: z.string(),
});

// Create a new applicant
export async function createApplication(formData: FormData) {
  try {
    const parsed = ApplicationSchema.parse({
      id: formData.get('id'),
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      resume_url: formData.get('resume_url'),
    });

    const applicationDate = new Date().toISOString().split('T')[0];

    await sql`
      INSERT INTO applicants (
        id, first_name, last_name, email, phone,
        resume_url, status, application_date
      )
      VALUES (
        ${parsed.id}, ${parsed.first_name}, ${parsed.last_name}, ${parsed.email}, ${parsed.phone},
        ${parsed.resume_url}, 'pending', ${applicationDate}
      )
    `;

    revalidatePath('/dashboard/applicants');
    redirect('/dashboard/applicants');
  } catch (error) {
    console.error('Application submission failed:', error);
    throw new Error('Failed to submit application. Please try again.');
  }
}

// Schema for onboarding
const OnboardingSchema = z.object({
  applicant_id: z.string().uuid(),
  first_name: z.string(),
  middle_name: z.string(),
  last_name: z.string(),
  mother_MaidenName: z.string(),
  ssn: z.string(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zip_code: z.string(),
  account_number: z.string(),
  routing_number: z.string(),
  bank_name: z.string(),
  front_image_url: z.string(),
  back_image_url: z.string(),
  w2_form: z.string(),
});

// Submit or update onboarding data
export async function createOnboarding(formData: FormData) {
  try {
    const parsed = OnboardingSchema.parse({
      applicant_id: formData.get('applicant_id'),
      first_name: formData.get('first_name'),
      middle_name: formData.get('middle_name'),
      last_name: formData.get('last_name'),
      mother_MaidenName: formData.get('mother_MaidenName'),
      ssn: formData.get('ssn'),
      street: formData.get('street'),
      city: formData.get('city'),
      state: formData.get('state'),
      zip_code: formData.get('zip_code'),
      account_number: formData.get('account_number'),
      routing_number: formData.get('routing_number'),
      bank_name: formData.get('bank_name'),
      front_image_url: formData.get('front_image_url'),
      back_image_url: formData.get('back_image_url'),
      w2_form: formData.get('w2_form'),
    });

    await sql`
      INSERT INTO onboarding (
        applicant_id, first_name, middle_name, last_name, mother_MaidenName, ssn,
        street, city, state, zip_code,
        account_number, routing_number, bank_name,
        front_image_url, back_image_url,
        w2_form, onboarding_completed, onboarding_date
      )
      VALUES (
        ${parsed.applicant_id}, ${parsed.first_name}, ${parsed.middle_name}, ${parsed.last_name}, ${parsed.mother_MaidenName}, ${parsed.ssn},
        ${parsed.street}, ${parsed.city}, ${parsed.state}, ${parsed.zip_code},
        ${parsed.account_number}, ${parsed.routing_number}, ${parsed.bank_name},
        ${parsed.front_image_url}, ${parsed.back_image_url},
        ${parsed.w2_form}, true, NOW()
      )
      ON CONFLICT (applicant_id) DO UPDATE SET
        first_name = EXCLUDED.first_name,
        middle_name = EXCLUDED.middle_name,
        last_name = EXCLUDED.last_name,
        mother_MaidenName = EXCLUDED.mother_MaidenName,
        ssn = EXCLUDED.ssn,
        street = EXCLUDED.street,
        city = EXCLUDED.city,
        state = EXCLUDED.state,
        zip_code = EXCLUDED.zip_code,
        account_number = EXCLUDED.account_number,
        routing_number = EXCLUDED.routing_number,
        bank_name = EXCLUDED.bank_name,
        front_image_url = EXCLUDED.front_image_url,
        back_image_url = EXCLUDED.back_image_url,
        w2_form = EXCLUDED.w2_form,
        onboarding_completed = true,
        onboarding_date = NOW()
    `;

    revalidatePath('/dashboard/onboarding');
    redirect('/dashboard/onboarding');
  } catch (error) {
    console.error('Onboarding submission failed:', error);
    throw new Error('Failed to complete onboarding. Please try again.');
  }
}
