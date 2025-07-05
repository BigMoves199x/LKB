import Pagination from "@/app/ui/applicants/pagination";
import Search from "@/app/ui/search";
import OnboardingTable from "@/app/ui/onboarding_table"; // your new onboarding table component
import { fetchFullOnboardingRecords, fetchOnboardingPages} from "@/app/lib/data";

interface SearchParams {
  query?: string;
  page?: string;
}

export default async function Page(props: { searchParams?: Promise<SearchParams> }) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query?.trim() ?? "";
  const currentPage = Number(searchParams?.page) || 1;

  // Fetch total pages count for onboarding records matching the query
  const totalPages = await fetchOnboardingPages(query);

  // Fetch onboarding data for the current page and query
  const onboardings = await fetchFullOnboardingRecords();

  return (
    <div className="w-full">
      <div className="mt-4 flex items-center justify-between gap-2 md:-mt-4">
        <Search placeholder="Search onboarded applicants..." />
      </div>

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages}  />
      </div>
    </div>
  );
}
