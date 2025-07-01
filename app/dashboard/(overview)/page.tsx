import { ApplicantCardSkeleton, ApplicantCardsSkeleton } from '@/app/ui/skeletons';
import { Card } from '@/app/ui/dashboard/cards';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
import { Suspense } from 'react';

export default async function DashboardPage() {
  const {
    totalApplicants,
    pendingApplicants,
    acceptedApplicants,
    rejectedApplicants,
  } = await fetchCardData();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>

      {/* 📊 Applicant Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Total Applicants" value={totalApplicants} type="total" />
        <Card title="Pending" value={pendingApplicants} type="pending" />
        <Card title="Accepted" value={acceptedApplicants} type="accepted" />
        <Card title="Rejected" value={rejectedApplicants} type="rejected" />
      </div>

      {/* 📈 Charts / latest applications section (optional) */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<ApplicantCardsSkeleton />}>
          {/* Add your upcoming ApplicantChart or LatestApplicants here if any */}
        </Suspense>
      </div>
    </main>
  );
}
