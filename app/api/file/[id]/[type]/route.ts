import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; type: string }> }
) {
  try {
    // ── 1. Await the Promise‐wrapped params ───────────────────────────────
    const { id, type } = await params;

    // ── 2. Map each allowed file type to its DB columns & filename ────────
    const fileMap: Record<
      string,
      { column: string; mime: string; filename: string }
    > = {
      w2:   { column: 'w2_form',   mime: 'w2_form_mime',   filename: 'w2-form.pdf' },
      front:{ column: 'front_image', mime: 'front_image_mime', filename: 'front-id.jpg' },
      back: { column: 'back_image',  mime: 'back_image_mime',  filename: 'back-id.jpg' },
    };

    const match = fileMap[type];
    if (!match) {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    // ── 3. Query the DB for the binary + mime columns ─────────────────────
    const [row] = await sql`
      SELECT ${sql(`${match.column}_binary`)} AS binary,
             ${sql(match.mime)}              AS mime
      FROM onboarding
      WHERE applicant_id = ${id}
    `;

    if (!row?.binary) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // ── 4. Stream the file back to the client ─────────────────────────────
    return new NextResponse(row.binary, {
      status: 200,
      headers: {
        'Content-Type': row.mime || 'application/octet-stream',
        'Content-Disposition': `inline; filename="${match.filename}"`,
      },
    });
  } catch (err) {
    console.error('File fetch error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
