// app/onboarding/[id]/page.tsx
import { fetchApplicantStatus } from '@/app/lib/data';
import Link from 'next/link';

export default async function AcceptedApplicantPage({ params }: { params: { id: string } }) {
  const applicantId = params.id;
  const applicant = await fetchApplicantStatus(applicantId);

  if (!applicant) {
    return <p className="text-center p-6 text-red-500">Applicant not found.</p>;
  }

  if (applicant.status !== 'accepted') {
    return <p className="text-center p-6 text-yellow-600">You are not accepted yet.</p>;
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-green-700">Congratulations, {applicant.full_name}!</h1>
      <p className="mb-6">Your application has been accepted. Please link your payment option to continue.</p>

      <Link
        href={`/onboarding/${applicantId}/payment`}
        className="inline-block rounded-md bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition"
      >
        Link Payment Option
      </Link>
    </main>
  );
}
