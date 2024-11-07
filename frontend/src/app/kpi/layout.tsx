"use client";
import { Spinner } from "@/components/custom/Spinner";
import { SelectedListProvider } from "@/context/ListProvider";
import { useSession } from "@/hooks/useSession";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const { status } = useSession();
  const router = useRouter();
  const pathName = usePathname();
  useEffect(() => {
    if (status == "unauthenticated") router.push("/");
    // if (status == "authenticated" && pathName == "/kpi")
    //   router.replace("/kpi/therapy");
  }, [status, router, pathName]);
  if (status == "loading")
    return (
      <div className="flex h-[94vh] items-center justify-center">
        <Spinner />
      </div>
    );

  return <SelectedListProvider>{children}</SelectedListProvider>;
};

export default Layout;
