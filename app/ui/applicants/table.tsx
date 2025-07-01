import Image from "next/image";
import ApplicantStatus from "@/app/ui/applicants/status";
import { formatDateToLocal } from "@/app/lib/utils";
import { fetchApplicants } from "@/app/lib/data";

interface ApplicantPreview {
  id: string;
  full_name: string;
  email: string;
  position_applied: string;
  status: string;
  application_date: string;
  profile_image_url?: string | null;
}

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
          <div className="md:hidden">
            {applicants.map(({ id, full_name, email, position_applied, status, application_date, profile_image_url }) => (
              <article
                key={id}
                className="mb-2 w-full rounded-md bg-white p-4"
                aria-label={`Applicant ${full_name}`}
              >
                <header className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      {profile_image_url ? (
                        <Image
                          src={profile_image_url}
                          alt={`${full_name}'s profile picture`}
                          width={28}
                          height={28}
                          className="mr-2 rounded-full"
                          priority={false}
                        />
                      ) : (
                        <div className="mr-2 h-7 w-7 rounded-full bg-gray-300" />
                      )}
                      <p className="font-semibold truncate">{full_name}</p>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{email}</p>
                  </div>
                  <ApplicantStatus status={status} />
                </header>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-lg font-medium truncate">{position_applied}</p>
                    <p className="text-sm text-gray-600">{formatDateToLocal(application_date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    {/* Action buttons can be added here */}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Desktop View */}
          <table
            className="hidden min-w-full text-gray-900 md:table"
            role="table"
            aria-label="Applicants table"
          >
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">Applicant</th>
                <th scope="col" className="px-3 py-5 font-medium">Email</th>
                <th scope="col" className="px-3 py-5 font-medium">Position Applied</th>
                <th scope="col" className="px-3 py-5 font-medium">Application Date</th>
                <th scope="col" className="px-3 py-5 font-medium">Status</th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {applicants.map(({ id, full_name, email, position_applied, status, application_date, profile_image_url }) => (
                <tr
                  key={id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none
                    [&:first-child>td:first-child]:rounded-tl-lg
                    [&:first-child>td:last-child]:rounded-tr-lg
                    [&:last-child>td:first-child]:rounded-bl-lg
                    [&:last-child>td:last-child]:rounded-br-lg"
                  role="row"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3" role="cell">
                    <div className="flex items-center gap-3">
                      {profile_image_url ? (
                        <Image
                          src={profile_image_url}
                          alt={`${full_name}'s profile picture`}
                          width={28}
                          height={28}
                          className="rounded-full"
                          priority={false}
                        />
                      ) : (
                        <div className="h-7 w-7 rounded-full bg-gray-300" />
                      )}
                      <p className="truncate">{full_name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 truncate" role="cell">{email}</td>
                  <td className="whitespace-nowrap px-3 py-3 truncate" role="cell">{position_applied}</td>
                  <td className="whitespace-nowrap px-3 py-3" role="cell">{formatDateToLocal(application_date)}</td>
                  <td className="whitespace-nowrap px-3 py-3" role="cell">
                    <ApplicantStatus status={status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3" role="cell">
                    <div className="flex justify-end gap-3">
                      {/* Action buttons here */}
                    </div>
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
