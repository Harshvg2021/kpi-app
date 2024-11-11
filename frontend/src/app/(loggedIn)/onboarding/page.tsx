"use client";
import { Spinner } from "@/components/custom/Spinner";
import { useOnboarding } from "@/context/OnboardingProvider";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const { currentRoute } = useOnboarding();
  const router = useRouter();
  useEffect(() => {
    router.push(currentRoute);
  }, [currentRoute]);

  return (
    <div className="w-full mx-auto">
      <Spinner className="text-white mx-auto w-8 h-8 " size={28} />
    </div>
  );
};

export default Page;
