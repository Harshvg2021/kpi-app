"use client";
import { Spinner } from "@/components/custom/Spinner";
import { SelectedKpiListProvider } from "@/context/KpiProvider";
import { useSession } from "@/hooks/useSession";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <SelectedKpiListProvider>{children}</SelectedKpiListProvider>;
};

export default Layout;
