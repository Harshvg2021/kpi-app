"use client";
import { SelectedDataSourceListProvider } from "@/context/DataSourceProvider";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <SelectedDataSourceListProvider>{children}</SelectedDataSourceListProvider>;
};
export default Layout;
