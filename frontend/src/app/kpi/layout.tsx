"use client";
import { Spinner } from "@/components/custom/Spinner";
import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status == "unauthenticated") router.push("/");
    if (status == "authenticated") router.replace("/kpi/therapy");
  }, [status, router]);
  if (status == "loading" || status == "unauthenticated")
    return (
      <div className="flex h-[94vh] items-center justify-center">
        <Spinner />
      </div>
    );

  return <>{children}</>;
};

export default Layout;
