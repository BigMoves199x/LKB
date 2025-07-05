import { formatDateToLocal } from "@/app/lib/utils";
import ApplicantStatus from "@/app/ui/applicants/status";
import { OnboardingDashboardRecord } from "../lib/definitions";

interface OnboardingTableProps {
  onboardings: OnboardingDashboardRecord[];
  currentPage: number;
}

export default function OnboardingTable({ onboardings, currentPage }: OnboardingTableProps) {
  if (!onboardings.length) {
    return <p className="p-6 text-center text-gray-500">No onboarding records found.</p>;
  }

  return (
    <section className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {onboardings.map((record) => (
              <div key={record.applicant_id} className="rounded-md bg-white p-4 shadow-sm">
                <div className="flex justify-between items-start border-b pb-2">
                  <div className="space-y-1">
                    <p className="font-semibold">
                      {record.applicant_first_name} {record.applicant_last_name}
                    </p>
                    <p className="text-sm text-gray-500">{record.email}</p>
                    <p className="text-sm text-gray-500">{record.phone}</p>
                    <p className="text-sm text-gray-500">
                      {formatDateToLocal(record.onboarding_date)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Address: {record.street}, {record.city}, {record.state} {record.zip_code}
                    </p>
                    <p className="text-sm text-gray-500">
                      Bank: {record.bank_name} (Acct: {record.account_number})
                    </p>
                    <a
                      href={record.resume_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 underline"
                    >
                      View Resume
                    </a>
                  </div>
                  <div className="ml-4 flex flex-col items-end space-y-2">
                    <ApplicantStatus status={record.status} />
                    <a
                      href={record.front_image_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-600 underline"
                    >
                      ID Front
                    </a>
                    <a
                      href={record.back_image_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-600 underline"
                    >
                      ID Back
                    </a>
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
                <th className="px-3 py-3">Address</th>
                <th className="px-3 py-3">Bank Info</th>
                <th className="px-3 py-3">ID Documents</th>
                <th className="px-3 py-3">Onboarding Date</th>
                <th className="px-3 py-3">Status</th>
                <th className="py-3 pl-6 pr-3 text-right">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {onboardings.map((record) => (
                <tr key={record.applicant_id} className="hover:bg-gray-50 transition">
                  <td className="py-3 pl-6 pr-3 whitespace-nowrap font-medium">
                    {record.applicant_first_name} {record.applicant_last_name}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">{record.email}</td>
                  <td className="px-3 py-3 whitespace-nowrap">{record.phone}</td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <a
                      href={record.resume_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                      title="Open resume in new tab"
                    >
                      View Resume
                    </a>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    {record.street}, {record.city}, {record.state} {record.zip_code}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    {record.bank_name} <br />
                    Acct: {record.account_number} <br />
                    Routing: {record.routing_number}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap space-x-2">
                    <a
                      href={record.front_image_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                      title="View front ID"
                    >
                      Front ID
                    </a>
                    <a
                      href={record.back_image_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                      title="View back ID"
                    >
                      Back ID
                    </a>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    {formatDateToLocal(record.onboarding_date)}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <ApplicantStatus status={record.status} />
                  </td>
                  <td className="py-3 pl-6 pr-3 text-right text-gray-500">
                    {/* Placeholder for future actions */}
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
