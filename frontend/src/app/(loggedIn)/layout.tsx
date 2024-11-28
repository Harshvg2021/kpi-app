"use client";
import { Spinner } from "@/components/custom/Spinner";
import { OnboardingProvider } from "@/context/OnboardingProvider";
import { useSession } from "@/hooks/useSession";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import LoggedInNav from "./components/LoggedInNav";

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
      <LoggedInNav>
        <div className=" gap-4 md:mt-18 mt-10 flex items-center justify-center bg-white">
          {children}
        </div>
      </LoggedInNav>
    </OnboardingProvider>
  );
};

export default Layout;
