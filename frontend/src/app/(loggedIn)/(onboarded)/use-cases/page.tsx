"use client";
import { Spinner } from "@/components/custom/Spinner";
import { useUseCaseList } from "@/context/UseCaseProvider";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const { options } = useUseCaseList();
  const router = useRouter();
  useEffect(() => {
    router.push("/use-cases/subject");
  }, [options?.subjectArea]);

  return (
    <div>
      <Spinner className="h-8 w-8 text-white " />
    </div>
  );
};

export default Page;
