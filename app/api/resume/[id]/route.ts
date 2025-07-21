import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const [row] = await sql`
      SELECT resume_binary, resume_mime, resume_filename
      FROM applicants
      WHERE id = ${id}
    `;

    if (!row || !row.resume_binary) {
      return new NextResponse('Resume not found', { status: 404 });
    }

    return new NextResponse(row.resume_binary, {
      status: 200,
      headers: {
        'Content-Type': row.resume_mime || 'application/pdf',
        'Content-Disposition': `inline; filename="${row.resume_filename || 'resume.pdf'}"`,
      },
    });
  } catch (err) {
    console.error('Resume fetch error:', err);
    return new NextResponse('Internal server error', { status: 500 });
  }
}