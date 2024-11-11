"use client";
import { Spinner } from "@/components/custom/Spinner";
import { useDataSourceList } from "@/context/DataSourceProvider";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const { options } = useDataSourceList();
  const router = useRouter();
  useEffect(() => {
    router.push("/data-source/subject");
  }, [options?.subjectArea]);

  return (
    <div>
      <Spinner className="h-8 w-8 text-white " />
    </div>
  );
};

export default Page;
