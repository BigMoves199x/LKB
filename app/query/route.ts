import postgres from 'postgres';

// Use a typed SQL client
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

type ApplicantPreview = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  resume_url: string;
  status: 'pending' | 'accepted' | 'rejected';
  application_date: string;
};

async function listPendingApplicants(): Promise<ApplicantPreview[]> {
  const rows = await sql<ApplicantPreview[]>`
    SELECT 
      id,
      first_name,
      last_name,
      email,
      phone,
      resume_url,
      status,
      application_date
    FROM applicants
    WHERE status = 'pending'
    ORDER BY application_date DESC
  `;
  return rows;
}

export async function GET() {
  try {
    const applicants = await listPendingApplicants();
    return new Response(JSON.stringify(applicants), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching applicants:', error);
    return new Response(JSON.stringify({ error: 'Something went wrong' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
