import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { sql } from "@vercel/postgres";
import { randomUUID } from "crypto";
import { sendTelegramNotification } from '@/app/lib/sendTelegramNotification';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const first_name = formData.get("first_name")?.toString().trim() || "";
    const last_name = formData.get("last_name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim().toLowerCase() || "";
    const phone = formData.get("phone")?.toString().trim() || "";
    const resume = formData.get("resume") as File;

    // Validate required fields
    if (!first_name || !last_name || !email || !phone || !resume) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // Validate file size (max 5MB)
    if (resume.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Resume file too large (max 5MB)." }, { status: 400 });
    }

    // Validate file type
    const allowedMimeTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedMimeTypes.includes(resume.type)) {
      return NextResponse.json({ error: "Unsupported resume file format." }, { status: 400 });
    }

    const buffer = Buffer.from(await resume.arrayBuffer());

    // Generate unique file name
    const fileExt = path.extname(resume.name).toLowerCase();
    const safeName = `${first_name}-${last_name}`.replace(/[^a-zA-Z0-9-_]/g, "");
    const uniqueName = `${safeName}-${randomUUID()}${fileExt}`;

    // Save resume to /public/resumes
    const uploadDir = path.join(process.cwd(), "public", "resumes");

    // ✅ Ensure directory exists
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const uploadPath = path.join(uploadDir, uniqueName);
    await writeFile(uploadPath, buffer);

    const resumeUrl = `/resumes/${uniqueName}`;

    // Save applicant to database
    const result = await sql`
      INSERT INTO applicants (
        first_name, last_name, email, phone, resume_url, resume_mime
      )
      VALUES (
        ${first_name}, ${last_name}, ${email}, ${phone}, ${resumeUrl}, ${resume.type}
      )
      RETURNING id
    `;

    // Send Telegram notification
    await sendTelegramNotification(`📝 New applicant submitted:\nName: ${first_name} ${last_name}\nEmail: ${email}`);

    return NextResponse.json({ success: true, id: result.rows[0].id });
  } catch (error) {
    console.error("❌ Upload error:", (error as any).stack || error);
    return NextResponse.json({ error: "Failed to upload resume." }, { status: 500 });
  }
}
