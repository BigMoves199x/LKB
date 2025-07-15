import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { sql } from '@vercel/postgres';
import { randomUUID } from 'crypto';
import { sendTelegramNotification } from '@/app/lib/sendTelegramNotification';

export async function POST(req: NextRequest) {
  try {
    /* ── Parse form ───────────────────────────────────────── */
    const formData = await req.formData();

    const first_name = formData.get('first_name')?.toString().trim()  || '';
    const last_name  = formData.get('last_name') ?.toString().trim()  || '';
    const email      = formData.get('email')     ?.toString().trim()  .toLowerCase() || '';
    const phone      = formData.get('phone')     ?.toString().trim()  || '';
    const resume     = formData.get('resume')    as File | null;

    if (!first_name || !last_name || !email || !phone || !resume) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    /* ── Validate resume ─────────────────────────────────── */
    if (resume.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Resume file too large (max 5 MB).' }, { status: 400 });
    }

    const allowed = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (!allowed.includes(resume.type)) {
      return NextResponse.json({ error: 'Unsupported resume format.' }, { status: 400 });
    }

    /* ── Write file into /tmp (Vercel‑writable) ───────────── */
    const tmpDir  = await mkdtemp(path.join(tmpdir(), 'upload-'));
    const fileExt = path.extname(resume.name).toLowerCase();
    const safe    = `${first_name}-${last_name}`.replace(/[^a-zA-Z0-9-_]/g, '');
    const unique  = `${safe}-${randomUUID()}${fileExt}`;

    const tmpPath = path.join(tmpDir, unique);
    await writeFile(tmpPath, Buffer.from(await resume.arrayBuffer()));

    /*  If you plan to move the file to S3/Supabase, do it here.
        For demo we keep only metadata in the DB.                       */

    const resume_url = `/tmp/${unique}`; // placeholder URL stored for now

    /* ── Insert applicant (no binary columns) ─────────────── */
    const result = await sql<{ id: string }>`
      INSERT INTO applicants (
        first_name, last_name, email, phone,
        resume_url, resume_filename, resume_mime,
        status, application_date
      )
      VALUES (
        ${first_name}, ${last_name}, ${email}, ${phone},
        ${resume_url}, ${resume.name}, ${resume.type},
        'pending', CURRENT_DATE
      )
      RETURNING id
    `;
    const id = result.rows[0]?.id;
    if (!id) throw new Error('DB insert failed');

    /* ── Notify Telegram ──────────────────────────────────── */
    await sendTelegramNotification(
      `📝 *New applicant*\nName: ${first_name} ${last_name}\nEmail: ${email}`
    );

    /* Clean up temp file/folder (optional but polite) */
    await rm(tmpDir, { recursive: true, force: true });

    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error('❌ /api/apply error:', err);
    return NextResponse.json({ error: 'Failed to upload resume.' }, { status: 500 });
  }
}
