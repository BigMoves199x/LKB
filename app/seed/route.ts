import bcrypt from 'bcrypt';
import postgres from 'postgres';
import { users, applicants } from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await sql`
      INSERT INTO users (id, name, email, password)
      VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
      ON CONFLICT (id) DO NOTHING;
    `;
  }
}

async function seedApplicants() {
  await sql`
    CREATE TABLE IF NOT EXISTS applicants (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      date_of_birth DATE NOT NULL,
      street TEXT NOT NULL,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      zip_code TEXT NOT NULL,
      ssn TEXT NOT NULL,
      position_applied TEXT NOT NULL,
      resume_url TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      application_date DATE NOT NULL
    );
  `;

  for (const applicant of applicants) {
  await sql`
    INSERT INTO applicants (
      id, full_name, email, phone, date_of_birth,
      street, city, state, zip_code, ssn,
      position_applied, resume_url,
      status, application_date
    )
    VALUES (
      ${applicant.id}, ${applicant.full_name}, ${applicant.email}, ${applicant.phone}, ${applicant.date_of_birth},
      ${applicant.address.street}, ${applicant.address.city}, ${applicant.address.state}, ${applicant.address.zip_code}, ${applicant.ssn},
      ${applicant.position_applied}, ${applicant.resume_url},
      ${applicant.status}, ${applicant.application_date}
    )
    ON CONFLICT (id) DO NOTHING;
  `;
}

}

export async function GET() {
  try {
    await sql.begin(async (sql) => {
      await seedUsers();
      await seedApplicants();
    });

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Seeding failed:', error);
    return Response.json({ error: 'Database seed failed' }, { status: 500 });
  }
}
