import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listApplicants() {
  const data = await sql`
    SELECT 
      id,
      full_name,
      email,
      position_applied,
      status,
      application_date
    FROM applicants
    WHERE status = 'pending'
    ORDER BY application_date DESC
  `;

  return data;
}

export async function GET() {
  try {
    const applicants = await listApplicants();
    return Response.json(applicants);
  } catch (error) {
    console.error('Error fetching applicants:', error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
