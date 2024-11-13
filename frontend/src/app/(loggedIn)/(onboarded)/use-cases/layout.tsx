"use client";
import { SelectedUseCaseProvider } from "@/context/UseCaseProvider";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <SelectedUseCaseProvider>{children}</SelectedUseCaseProvider>;
};
export default Layout;
