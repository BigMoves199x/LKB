// seed.ts
const postgres = require("postgres");
require("dotenv").config();

const sql = postgres(process.env.POSTGRES_URL, { ssl: "require" });

const applicants = [
  {
    first_name: "Jane",
    last_name: "Doe",
    email: "jane.doe@example.com",
    phone: "555-123-4567",
    resume_url: "/resumes/jane-doe.pdf",
    status: "pending",
    application_date: "2025-06-10",
  },
  {
    first_name: "John",
    last_name: "Smith",
    email: "john.smith@example.com",
    phone: "555-987-6543",
    resume_url: "/resumes/john-smith.pdf",
    status: "accepted",
    application_date: "2025-06-12",
  },
  {
    first_name: "Emily",
    last_name: "Johnson",
    email: "emily.j@example.com",
    phone: "555-555-1212",
    resume_url: "/resumes/emily-johnson.pdf",
    status: "rejected",
    application_date: "2025-06-01",
  },
];

const onboarding = [
  {
    applicant_email: "john.smith@example.com",
    date_of_birth: "1990-01-01",
    street: "123 Main St",
    city: "Los Angeles",
    state: "CA",
    zip_code: "90001",
    ssn: "123-38-9083",
    account_number: "987654321",
    routing_number: "123456789",
    bank_name: "Bank of America",
    bank_username: "johnsmith",
    bank_password: "securePass123!",
    front_image_url: "/ids/john-smith-front.png",
    back_image_url: "/ids/john-smith-back.png",
    onboarding_completed: true,
    onboarding_date: "2025-06-20",
  },
];

async function seed() {
  try {
    console.log("🌱 Seeding applicants...");
    for (const applicant of applicants) {
      await sql`
        INSERT INTO applicants (
          first_name, last_name, email, phone, resume_url, status, application_date
        ) VALUES (
          ${applicant.first_name}, ${applicant.last_name}, ${applicant.email},
          ${applicant.phone}, ${applicant.resume_url}, ${applicant.status}, ${applicant.application_date}
        )
        ON CONFLICT (email) DO NOTHING;
      `;
      console.log(`✅ Inserted applicant: ${applicant.email}`);
    }

    console.log("\n🌱 Seeding onboarding...");
    for (const record of onboarding) {
      const [applicant] = await sql`
        SELECT id FROM applicants WHERE email = ${record.applicant_email}
      `;

      if (!applicant) {
        console.warn(`⚠️ Skipping onboarding: applicant not found (${record.applicant_email})`);
        continue;
      }

      await sql`
        INSERT INTO onboarding (
          applicant_id, date_of_birth, street, city, state, zip_code, ssn,
          account_number, routing_number, bank_name,
          bank_username, bank_password,
          front_image_url, back_image_url,
          onboarding_completed, onboarding_date
        ) VALUES (
          ${applicant.id}, ${record.date_of_birth}, ${record.street}, ${record.city},
          ${record.state}, ${record.zip_code}, ${record.ssn},
          ${record.account_number}, ${record.routing_number}, ${record.bank_name},
          ${record.bank_username}, ${record.bank_password},
          ${record.front_image_url}, ${record.back_image_url},
          ${record.onboarding_completed}, ${record.onboarding_date}
        )
        ON CONFLICT (applicant_id) DO NOTHING;
      `;
      console.log(`✅ Inserted onboarding for: ${record.applicant_email}`);
    }

    console.log("\n🎉 Seed complete.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  }
}

seed();
