"use client";
import { Spinner } from "@/components/custom/Spinner";
import {
  OnboardingProvider,
} from "@/context/OnboardingProvider";
import { useSession } from "@/hooks/useSession";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const { status } = useSession();
  const router = useRouter();
  const pathName = usePathname();
  useEffect(() => {
    if (status !== "loading" && status === "unauthenticated") router.push("/");
    // if (status == "authenticated" && pathName == "/kpi")
    //   router.replace("/kpi/therapy");
  }, [status, router, pathName]);

  if (status == "loading")
    return (
      <div className="flex h-[94vh] items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <OnboardingProvider>
      <div className="min-h-screen gap-4 flex items-center justify-center bg-[radial-gradient(58.43%_103.88%_at_56.74%_50%,#0085FF_0%,#003465_100%)]">
        {children}
      </div>
    </OnboardingProvider>
  );
};

export default Layout;
