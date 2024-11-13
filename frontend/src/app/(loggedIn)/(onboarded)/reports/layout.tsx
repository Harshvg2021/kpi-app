"use client";
import { SelectedReportProvider } from "@/context/ReportProvider";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <SelectedReportProvider>{children}</SelectedReportProvider>;
};
export default Layout;
