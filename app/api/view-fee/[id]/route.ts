import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });



export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

     const [row] = await sql<{
      fee_binary: Buffer;
      fee_mime: string | null;
      fee_filename: string | null;
    }[]>`
      SELECT fee_binary, fee_mime, fee_filename
      FROM applicants
      WHERE id = ${id}
    `;

    if (!row || !row.fee_binary) {
      return new NextResponse('Application fee file not found', { status: 404 });
    }

    return new NextResponse(row.fee_binary, {
      status: 200,
      headers: {
        'Content-Type': row.fee_mime || 'application/octet-stream',
        'Content-Disposition': `inline; filename="${row.fee_filename || 'application_fee.pdf'}"`,
      },
    });
  } catch (err) {
    console.error('Fee file fetch error:', err);
    return new NextResponse('Internal server error', { status: 500 });
  }
}


