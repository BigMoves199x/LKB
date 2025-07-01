import postgres from 'postgres';
import {
  Applicant,
  ApplicantPreview,
  ApplicationForm,
  ApplicantOnboarding,
  OnboardingForm,
} from './definitions';
import { applicants } from './placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

/**
 * Fetch all applicants
 */
export async function fetchApplicants(query?: string): Promise<ApplicantPreview[]> {
  try {
    const data = await sql<ApplicantPreview[]>`
      SELECT id, full_name, email, position_applied, status, application_date
      FROM applicants
      ORDER BY application_date DESC
    `;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch applicants.');
  }
}

/**
 * Fetch full applicant info by ID
 */
export async function fetchApplicantById(id: string): Promise<Applicant> {
  try {
    const data = await sql<Applicant[]>`
      SELECT * FROM applicants WHERE id = ${id}
    `;
    return data[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch applicant.');
  }
}

/**
 * Insert a new job application
 */
export async function submitApplication(applicant: ApplicationForm) {
  try {
    const {
      full_name, email, phone, date_of_birth, address,
      ssn, position_applied, resume_file,
    } = applicant;

    await sql`
      INSERT INTO applicants (
        full_name, email, phone, date_of_birth,
        street, city, state, zip_code,
        ssn, position_applied,
        resume_url, status, application_date
      )
      VALUES (
        ${full_name}, ${email}, ${phone}, ${date_of_birth},
        ${address.street}, ${address.city}, ${address.state}, ${address.zip_code},
        ${ssn ?? null}, ${position_applied},
        ${resume_file.name},
        'pending', NOW()
      )
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to submit application.');
  }
}

/**
 * Fetch onboarding data for an accepted applicant
 */
export async function fetchOnboardingData(applicant_id: string): Promise<ApplicantOnboarding | null> {
  try {
    const data = await sql<ApplicantOnboarding[]>`
      SELECT * FROM onboarding WHERE applicant_id = ${applicant_id}
    `;
    return data[0] ?? null;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch onboarding data.');
  }
}

/**
 * Submit or update onboarding info (bank and ID images)
 */
export async function submitOnboardingInfo(data: OnboardingForm) {
  try {
    const {
      applicant_id,
      account_number,
      routing_number,
      bank_name,
      id_front_file,
      id_back_file,
    } = data;

    await sql`
      INSERT INTO onboarding (
        applicant_id, account_number, routing_number,
        bank_name, front_image_url, back_image_url,
        onboarding_completed, onboarding_date
      )
      VALUES (
        ${applicant_id}, ${account_number}, ${routing_number},
        ${bank_name}, ${id_front_file.name}, ${id_back_file.name},
        true, NOW()
      )
      ON CONFLICT (applicant_id) DO UPDATE SET
        account_number = EXCLUDED.account_number,
        routing_number = EXCLUDED.routing_number,
        bank_name = EXCLUDED.bank_name,
        front_image_url = EXCLUDED.front_image_url,
        back_image_url = EXCLUDED.back_image_url,
        onboarding_completed = true,
        onboarding_date = NOW()
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to save onboarding info.');
  }
}

export async function fetchCardData() {
  try {
    const [
      totalApplicants,
      pendingApplicants,
      acceptedApplicants,
      rejectedApplicants,
    ] = await Promise.all([
      sql`SELECT COUNT(*) FROM applicants`,
      sql`SELECT COUNT(*) FROM applicants WHERE status = 'pending'`,
      sql`SELECT COUNT(*) FROM applicants WHERE status = 'accepted'`,
      sql`SELECT COUNT(*) FROM applicants WHERE status = 'rejected'`,
    ]);

    return {
      totalApplicants: Number(totalApplicants[0].count),
      pendingApplicants: Number(pendingApplicants[0].count),
      acceptedApplicants: Number(acceptedApplicants[0].count),
      rejectedApplicants: Number(rejectedApplicants[0].count),
    };
  } catch (error) {
    console.error('Error fetching card data:', error);
    throw new Error('Failed to load dashboard statistics.');
  }
}

// Fetch monthly application stats (last 12 months)
export async function fetchApplicationStats() {
  const result = await sql`
    SELECT TO_CHAR(application_date, 'Mon') AS month, COUNT(*) AS count
    FROM applicants
    WHERE application_date >= CURRENT_DATE - INTERVAL '1 year'
    GROUP BY month
    ORDER BY DATE_TRUNC('month', TO_DATE(month, 'Mon'))
  `;
  return result.map((row) => ({
    month: row.month,
    count: Number(row.count),
  }));
}

// Assuming you paginate 10 per page
const PAGE_SIZE = 10;
export async function fetchApplicantsPages(query: string): Promise<number> {
  const whereClause = query
    ? sql`WHERE full_name ILIKE ${`%${query}%`}`
    : sql``;

  const result = await sql<{ count: string }[]>`
    SELECT COUNT(*) FROM applicants ${whereClause}
  `;
  
  const totalCount = Number(result[0].count);
  return Math.ceil(totalCount / PAGE_SIZE);
}


export async function fetchApplicantStatus(id: string) {
  try {
    const result = await sql`
      SELECT id, full_name, status 
      FROM applicants 
      WHERE id = ${id}
    `;
    return result[0] ?? null;
  } catch (error) {
    console.error('Failed to fetch applicant status:', error);
    throw new Error('Unable to fetch applicant status');
  }
}
