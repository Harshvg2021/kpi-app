"use client";
import { Spinner } from "@/components/custom/Spinner";
import { useKpiList } from "@/context/KpiProvider";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const { options } = useKpiList();
  const router = useRouter();
  useEffect(() => {
    router.push("/kpi/subject");
  }, [options?.subjectArea]);

  return (
    <div>
      <Spinner className="h-8 w-8 text-white " />
    </div>
  );
};

export default Page;
