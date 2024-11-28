"use client";
import { useRouter } from "next/navigation";
import { useGetRegions } from "@/hooks/fetch/useFetchKPI";
import { useOnboarding } from "@/context/OnboardingProvider";
import SelectionCard from "../../components/SelectionCard";

const Page: React.FC = () => {
  const region = useGetRegions();

  const router = useRouter();
  const { selectRegion } = useOnboarding();
  const onSubmit = (data: string) => {
    selectRegion(data);
    router.push(`/onboarding/distribution`);
  };

  return (
    <div className="">
      <SelectionCard
        backLink="/onboarding/therapy"
        onSubmit={onSubmit}
        title="Select Region Area"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua."
        list={region.data?.map((e) => ({ label: e.name, value: e.name })) ?? []}
      />
    </div>
  );
};

export default Page;
