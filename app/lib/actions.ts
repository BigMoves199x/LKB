'use server';

import { z } from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Schema for validating form data
const ApplicationSchema = z.object({
  full_name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(8),
  date_of_birth: z.string(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zip_code: z.string(),
  ssn: z.string(),
  position_applied: z.string(),
  resume_url: z.string(),
});

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function createApplication(formData: FormData) {
  try {
    // Parse and validate form data
    const parsed = ApplicationSchema.parse({
      full_name: formData.get('full_name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      date_of_birth: formData.get('date_of_birth'),
      street: formData.get('street'),
      city: formData.get('city'),
      state: formData.get('state'),
      zip_code: formData.get('zip_code'),
      ssn: formData.get('ssn'),
      position_applied: formData.get('position_applied'),
      resume_url: formData.get('resume_url'),
    });

    const applicationDate = new Date().toISOString().split('T')[0];

    // Insert applicant into database
    await sql`
      INSERT INTO applicants (
        full_name, email, phone, date_of_birth,
        street, city, state, zip_code, ssn,
        position_applied, resume_url,
        status, application_date
      )
      VALUES (
        ${parsed.full_name}, ${parsed.email}, ${parsed.phone}, ${parsed.date_of_birth},
        ${parsed.street}, ${parsed.city}, ${parsed.state}, ${parsed.zip_code}, ${parsed.ssn},
        ${parsed.position_applied}, ${parsed.resume_url},
        'pending', ${applicationDate}
      )
    `;

    // Revalidate and redirect
    revalidatePath('/dashboard/applicants');
    redirect('/dashboard/applicants');
  } catch (error) {
    console.error('Application submission failed:', error);
    throw new Error('Failed to submit application. Please try again.');
  }
}
