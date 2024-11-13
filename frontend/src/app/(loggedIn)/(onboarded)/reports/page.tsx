"use client";
import { Spinner } from "@/components/custom/Spinner";
import { useReportList } from "@/context/ReportProvider";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const { options } = useReportList();
  const router = useRouter();
  useEffect(() => {
    router.push("/reports/subject");
  }, [options?.subjectArea]);

  return (
    <div>
      <Spinner className="h-8 w-8 text-white " />
    </div>
  );
};

export default Page;
