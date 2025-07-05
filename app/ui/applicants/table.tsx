import { formatDateToLocal } from "@/app/lib/utils";
import ApplicantStatus from "@/app/ui/applicants/status";
import { fetchApplicants } from "@/app/lib/data";
import { ApplicantPreview } from "@/app/lib/definitions";

interface ApplicantsTableProps {
  query: string;
  currentPage: number;
}

export default async function ApplicantsTable({ query, currentPage }: ApplicantsTableProps) {
  const applicants: ApplicantPreview[] = await fetchApplicants(query);

  if (!applicants.length) {
    return <p className="p-6 text-center text-gray-500">No applicants found.</p>;
  }

  return (
    <section className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {applicants.map((applicant) => (
              <div key={applicant.id} className="rounded-md bg-white p-4 shadow-sm">
                <div className="flex justify-between items-start border-b pb-2">
                  <div className="space-y-1">
                    <p className="font-semibold">
                      {applicant.first_name} {applicant.last_name}
                    </p>
                    <p className="text-sm text-gray-500">{applicant.email}</p>
                    <p className="text-sm text-gray-500">{applicant.phone}</p>
                    <p className="text-sm text-gray-500">
                      {formatDateToLocal(applicant.application_date)}
                    </p>
                    <a
                      href={`/api/resume/${applicant.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 underline"
                    >
                      View Resume
                    </a>
                  </div>
                  <div className="ml-4">
                    <ApplicantStatus status={applicant.status} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View */}
          <table className="hidden min-w-full text-sm text-gray-900 md:table">
            <thead className="text-left text-gray-700 font-semibold border-b">
              <tr>
                <th className="px-4 py-3 sm:pl-6">Name</th>
                <th className="px-3 py-3">Email</th>
                <th className="px-3 py-3">Phone</th>
                <th className="px-3 py-3">Resume</th>
                <th className="px-3 py-3">Application Date</th>
                <th className="px-3 py-3">Status</th>
                <th className="py-3 pl-6 pr-3 text-right">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applicants.map((applicant) => (
                <tr key={applicant.id} className="hover:bg-gray-50 transition">
                  <td className="py-3 pl-6 pr-3 whitespace-nowrap font-medium">
                    {applicant.first_name} {applicant.last_name}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">{applicant.email}</td>
                  <td className="px-3 py-3 whitespace-nowrap">{applicant.phone}</td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <a
                      href={`/api/resume/${applicant.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                      title="Open resume in new tab"
                    >
                      View Resume
                    </a>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    {formatDateToLocal(applicant.application_date)}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <ApplicantStatus status={applicant.status} />
                  </td>
                  <td className="py-3 pl-6 pr-3 text-right text-gray-500">
                    {/* Future Action Buttons Here */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
