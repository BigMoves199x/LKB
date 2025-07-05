// app/api/resume/[id]/route.ts
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  try {
    const result = await sql`
      SELECT resume_file, resume_mime
      FROM applicants
      WHERE id = ${id}
    `;

    const row = result.rows?.[0];

    if (!row || !row.resume_file) {
      return new NextResponse('Resume not found', { status: 404 });
    }

    return new NextResponse(row.resume_file as Buffer, {
      status: 200,
      headers: {
        'Content-Type': row.resume_mime,
        'Content-Disposition': 'inline; filename=resume',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Failed to serve resume:', error);
    return new NextResponse('Server error', { status: 500 });
  }
}
