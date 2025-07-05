import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { sql } from "@vercel/postgres";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const first_name = formData.get("first_name")?.toString().trim() || "";
    const last_name = formData.get("last_name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim().toLowerCase() || "";
    const phone = formData.get("phone")?.toString().trim() || "";
    const resume = formData.get("resume") as File;

    if (!first_name || !last_name || !email || !phone || !resume) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const buffer = Buffer.from(await resume.arrayBuffer());

    const fileExt = path.extname(resume.name);
    const fileName = `${Date.now()}-${first_name}-${last_name}${fileExt}`;
    const uploadPath = path.join(process.cwd(), "public", "resume", fileName);

    await writeFile(uploadPath, buffer);

    const resumeUrl = `/resume/${fileName}`;

    // Insert into DB
    const result = await sql`
      INSERT INTO applicants (
        first_name, last_name, email, phone, resume_url, resume_mime
      )
      VALUES (
        ${first_name}, ${last_name}, ${email}, ${phone}, ${resumeUrl}, ${resume.type}
      )
      RETURNING id
    `;

    return NextResponse.json({ success: true, id: result.rows[0].id });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload resume." }, { status: 500 });
  }
}
