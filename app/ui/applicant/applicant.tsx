import { lusitana } from "@/app/ui/fonts";
import Search from "@/app/ui/search";
import { applicants } from "@/app/lib/placeholder-data"; // You'll need to define this type
import { Applicant } from "@/app/lib/definitions";

export default async function ApplicantsTable({
  applicants,
}: {
  applicants: Applicant[];
}) {
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Applicants
      </h1>
      <Search placeholder="Search applicants..." />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              {/* Mobile View */}
              <div className="md:hidden">
                {applicants.map((applicants) => (
                  <div
                    key={applicants.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="border-b pb-4">
                      <p className="font-medium">{applicants.first_name}</p>
                      <p className="font-medium">{applicants.last_name}</p>
                      <p className="text-sm text-gray-500">{applicants.email}</p>
                      <p className="font-medium">{applicants.phone}</p>
                      <p className="font-medium">{applicants.resume_url}</p>
                      <p className="font-medium">
                        {applicants.application_date}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <p>
                        Status:{" "}
                        <span className="font-medium">{applicants.status}</span>
                      </p>
                      <p>{applicants.application_date}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table */}
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Position
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Status
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Applied On
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {applicants.map((applicant) => (
                    <tr key={applicant.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm sm:pl-6">
                        {applicant.first_name}
                      </td>
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm sm:pl-6">
                        {applicant.last_name}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {applicant.email}
                      </td>
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm sm:pl-6">
                        {applicant.phone}
                      </td>
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm sm:pl-6">
                        <a
                          href={applicant.resume_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm font-medium"
                        >
                          View Resume
                        </a>
                      </td>

                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {applicant.status}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {applicant.application_date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
