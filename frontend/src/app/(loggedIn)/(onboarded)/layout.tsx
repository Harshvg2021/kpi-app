"use client";
import { useOnboarding } from "@/context/OnboardingProvider";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const { isOnboarded } = useOnboarding();
  console.log(isOnboarded);
  const router = useRouter();
  useEffect(() => {
    if (!isOnboarded) {
      router.push("/onboarding");
    }
  }, [isOnboarded]);

  return <>{children}</>;
};

export default Layout;
