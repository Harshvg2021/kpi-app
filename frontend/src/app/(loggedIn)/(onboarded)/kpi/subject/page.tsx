"use client";

import { useRouter } from "next/navigation";
import { useSubjectAreas } from "@/hooks/fetch/useFetchKPI";
import { useKpiList } from "@/context/KpiProvider";
import SelectionCard from "@/app/(loggedIn)/components/SelectionCard";

const Page: React.FC = () => {
  const subject = useSubjectAreas();
  const router = useRouter();
  const { selectSubjectArea } = useKpiList();
  const onSubmit = (data: string) => {
    selectSubjectArea(data);
    router.push(`/kpi/kpi-list`);
  };

  return (
    <div className="">
      <SelectionCard
        backLink="/dashboard"
        onSubmit={onSubmit}
        title="Select Subject Area"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua."
        list={
          subject.data?.map((e) => ({ label: e.name, value: e.name })) ?? []
        }
      />
    </div>
  );
};

export default Page;
