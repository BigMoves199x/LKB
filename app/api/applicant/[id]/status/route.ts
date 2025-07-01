// app/api/applicant/[id]/status/route.ts

import { fetchApplicantStatus } from '@/app/lib/data';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    const applicant = await fetchApplicantStatus(id);
    if (!applicant) {
      return new Response(JSON.stringify({ error: 'Applicant not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ status: applicant.status }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
