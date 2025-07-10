import { fetchApplicantById } from "@/app/lib/data";
import OnboardingForm from "@/app/ui/onboarding-form";
import { JSX } from "react";

export default async function OnboardingPage(props: any): Promise<JSX.Element> {
  const id = props.params?.id;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <OnboardingForm applicantId={id} />
    </div>
  );
}
