import postgres from 'postgres';
import {
  Applicant,
  ApplicantPreview,
  ApplicationForm,
  ApplicantOnboarding,
  OnboardingForm,
} from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// Fetch minimal applicant info (preview)
export async function fetchApplicants(query?: string): Promise<ApplicantPreview[]> {
  try {
    const data = await sql<ApplicantPreview[]>`
      SELECT id, first_name, last_name, email, phone, status, application_date
      FROM applicants
      ORDER BY application_date DESC
    `;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch applicants.');
  }
}

// Fetch full applicant by ID
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

// Insert new applicant
export async function submitApplication(applicant: ApplicationForm) {
  const {
    first_name,
    last_name,
    email,
    phone,
    resume_file,
    resume_mime,
  } = applicant;

  try {
    await sql`
      INSERT INTO applicants (
        first_name, last_name, email, phone, resume_file, resume_mime
      ) VALUES (
        ${first_name},
        ${last_name},
        ${email},
        ${phone},
        ${resume_file},
        ${resume_mime}
      )
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to submit application.');
  }
}

// Fetch onboarding by applicant ID
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

// Submit/update onboarding info
export async function submitOnboardingInfo(data: OnboardingForm) {
  const {
    applicant_id,
    first_name,
    middle_name,
    last_name,
    mother_MaidenName,
    ssn,
    address,
    bank_account,
    id_documents,
    w2_form,
  } = data;

  try {
    await sql`
      INSERT INTO onboarding (
        applicant_id, first_name, middle_name, last_name, mother_MaidenName, ssn,
        street, city, state, zip_code,
        account_number, routing_number, bank_name,
        front_image_url, back_image_url,
        w2_form, onboarding_completed, onboarding_date
      )
      VALUES (
        ${applicant_id}, ${first_name}, ${middle_name}, ${last_name}, ${mother_MaidenName}, ${ssn},
        ${address.street}, ${address.city}, ${address.state}, ${address.zip_code},
        ${bank_account.account_number}, ${bank_account.routing_number}, ${bank_account.bank_name},
        ${id_documents.front_image_url}, ${id_documents.back_image_url},
        ${w2_form}, true, NOW()
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
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to save onboarding info.');
  }
}

// Card statistics
export async function fetchCardData() {
  try {
    const [
      totalApplicants,
      pendingApplicants,
      acceptedApplicants,
      rejectedApplicants,
    ] = await Promise.all([
      sql<{ count: string }[]>`SELECT COUNT(*) FROM applicants`,
      sql<{ count: string }[]>`SELECT COUNT(*) FROM applicants WHERE status = 'pending'`,
      sql<{ count: string }[]>`SELECT COUNT(*) FROM applicants WHERE status = 'accepted'`,
      sql<{ count: string }[]>`SELECT COUNT(*) FROM applicants WHERE status = 'rejected'`,
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

// Monthly application stats (last 12 months)
export async function fetchApplicationStats() {
  try {
    const result = await sql<{ month: string; count: string }[]>`
      SELECT
        TO_CHAR(DATE_TRUNC('month', application_date), 'Mon') AS month,
        COUNT(*) AS count
      FROM applicants
      WHERE application_date >= CURRENT_DATE - INTERVAL '1 year'
      GROUP BY DATE_TRUNC('month', application_date)
      ORDER BY DATE_TRUNC('month', application_date)
    `;

    return result.map((row) => ({
      month: row.month,
      count: Number(row.count),
    }));
  } catch (error) {
    console.error('Error fetching monthly stats:', error);
    throw new Error('Failed to load monthly application statistics.');
  }
}

// Pagination (by name search

export async function fetchApplicantsPages(query: string): Promise<number> {
  const whereClause = query
    ? sql`WHERE first_name || ' ' || last_name ILIKE ${`%${query}%`}`
    : sql``;

  try {
    const result = await sql<{ count: string }[]>`
      SELECT COUNT(*) FROM applicants ${whereClause}
    `;
    const totalCount = Number(result[0].count);
    return Math.ceil(totalCount / PAGE_SIZE);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to calculate pagination.');
  }
}

// Fetch single applicant's status
export async function fetchApplicantStatus(id: string) {
  try {
    const result = await sql<
      { id: string; first_name: string; last_name: string; status: string }[]
    >`
      SELECT id, first_name, last_name, status 
      FROM applicants 
      WHERE id = ${id}
    `;
    return result[0] ?? null;
  } catch (error) {
    console.error('Failed to fetch applicant status:', error);
    throw new Error('Unable to fetch applicant status');
  }
}


// lib/data.ts

export async function fetchFullOnboardingRecords() {
  try {
    const result = await sql`
      SELECT 
        a.id AS applicant_id,
        a.first_name AS applicant_first_name,
        a.last_name AS applicant_last_name,
        a.email,
        a.phone,
        a.resume_url,
        a.status,
        o.street,
        o.city,
        o.state,
        o.zip_code,
        o.bank_name,
        o.account_number,
        o.routing_number,
        o.front_image_url,
        o.back_image_url,
        o.w2_form,
        o.onboarding_completed,
        o.onboarding_date
      FROM onboarding o
      JOIN applicants a ON o.applicant_id = a.id
      ORDER BY o.onboarding_date DESC;
    `;

    return result;
  } catch (error) {
    console.error("Failed to fetch full onboarding data:", error);
    throw new Error("Could not load onboarding dashboard data.");
  }
}

const PAGE_SIZE = 10; // reuse this if already declared

export async function fetchOnboardingPages(query: string): Promise<number> {
  try {
    const result = await sql<{ count: string }[]>`
      SELECT COUNT(*) FROM onboarding o
      JOIN applicants a ON o.applicant_id = a.id
      ${query
        ? sql`WHERE a.first_name || ' ' || a.last_name ILIKE ${'%' + query + '%'}`
        : sql``}
    `;

    const totalCount = Number(result[0].count);
    return Math.ceil(totalCount / PAGE_SIZE);
  } catch (error) {
    console.error("❌ Error calculating onboarding pages:", error);
    throw new Error("Failed to calculate onboarding pagination.");
  }
}