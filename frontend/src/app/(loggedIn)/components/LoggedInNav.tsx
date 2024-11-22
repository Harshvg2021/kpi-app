"use client";
import React, { Fragment, ReactNode, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { useLogout, useSession } from "@/hooks/useSession";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {
  BellIcon,
  FileSymlink,
  HomeIcon,
  LogOut,
  Menu,
  RefreshCcw,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { cn, isValidId } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/usePersistenceStorage";
import HoverTool from "@/components/custom/HoverTool";
import { Spinner } from "@/components/custom/Spinner";
import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useOnboarding } from "@/context/OnboardingProvider";

const LoggedInNav = ({ children }: { children: ReactNode }) => {
  const { status } = useSession();
  const { logout } = useLogout();
  const { clearOnboarding } = useOnboarding();

  if (status == "unauthenticated") return <>{children}</>;
  if (status == "loading")
    return (
      <div className="grid place-content-center mx-auto h-full min-h-screen">
        <Spinner />
      </div>
    );
  return (
    <>
      <div className={cn("transition-all ease-out")}>
        <header className="sticky top-0 z-30 flex    w-full h-14 py-2 justify-between items-center gap-4 border-b bg-blue-700/90 text-white backdrop-blur-lg px-4 sm:h-auto sm:border-0  sm:px-6">
          <div className="flex items-center gap-2 ">
            <HamburgerItems />
            <div className="h-12 w-12 rounded-full p-2 md:block hidden bg-white">
              <Image
                src={"/logo.png"}
                alt="logo"
                width={400}
                height={400}
                className=""
              />
            </div>
            <BreadCrumbNavigator />
          </div>
          <div className="flex relative gap-2  grow justify-end items-center ">
            <div>Welcome User</div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <Avatar>
                    <AvatarImage
                      //   src={user?.image}
                      alt="Image"
                      className="object-cover"
                    />
                    <AvatarFallback>{"US"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={clearOnboarding}>
                  Reset
                </DropdownMenuItem>
                {/* <DropdownMenuItem>Support</DropdownMenuItem> */}

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    clearOnboarding();
                    logout();
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className=" sm:py-0 ">{children}</main>
      </div>
    </>
  );
};
function BreadCrumbNavigator() {
  const pathname = usePathname();
  const { status } = useSession();
  const breadcrumbs = useMemo(() => {
    const routeParts = pathname.split("/");

    // Remove leading and trailing slashes (if any)
    const cleanedParts = routeParts.filter((part) => part !== "");

    return cleanedParts.map((part, index) => {
      const isId = isValidId(formatRoute(part));
      const isLong = part.length > 20;
      return {
        name:
          isId || isLong ? (
            <HoverTool content={formatRoute(part)}>
              <Badge
                variant={"default"}
                className="aspect-square px-1 bg-muted-foreground  hover:bg-muted-foreground"
              >
                <FileSymlink size={14} />
              </Badge>
            </HoverTool>
          ) : (
            formatRoute(part)
          ),
        route: `/${cleanedParts.slice(0, index + 1).join("/")}`,
      };
    });
  }, [pathname]);

  function formatRoute(str: string) {
    return str
      .split("-") // Split the string on hyphens
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(" ");
  }
  // if (status !== "authenticated") return <></>;
  return (
    <Breadcrumb className="hidden sm:flex transition-all text-white duration-200  left-0">
      <BreadcrumbList>
        {breadcrumbs.find((e) => e.name !== "Dashboard") && (
          <Fragment>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={status == "authenticated" ? "/dashboard" : "/"}>
                  <HomeIcon size={16} className="text-white" />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-white" />
          </Fragment>
        )}
        {breadcrumbs.map((crumb, i) => (
          <Fragment key={crumb.route}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  className="text-white font-medium hover:text-white"
                  href={crumb.route}
                >
                  {crumb.name}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {i !== breadcrumbs.length - 1 && (
              <BreadcrumbSeparator className="text-white" />
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export const HamburgerItems = () => {
  const [open, setOpen] = useState(false);
  const { logout } = useLogout();
  const { clearOnboarding } = useOnboarding();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={(prev) => setOpen(prev)}>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <Menu className="h-5 w-5 shrink-0 text-black" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link href="#" className="pl-4 flex gap-3">
              <Image
                src={"/logo.png"}
                width={28}
                height={29}
                className="rounded-full"
                alt="logo Logo"
              />
              <span className="">logo</span>
            </Link>

            <SheetClose onClick={() => setOpen(false)}>
              <Button
                variant={"link"}
                onClick={() => clearOnboarding()}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <RefreshCcw className="h-5 w-5 shrink-0" />
                Reset Onboarding
              </Button>
            </SheetClose>

            <SheetClose onClick={() => setOpen(false)}>
              <Button
                onClick={() => !clearOnboarding()! && logout()}
                variant={"link"}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-5 w-5 shrink-0" />
                Logout
              </Button>
            </SheetClose>
          </nav>
        </SheetContent>
      </Sheet>

      <Link
        href="/dashboard"
        className="flex items-center relative sm:hidden  gap-2 text-lg font-semibold md:text-base"
      >
        <div className="relative w-8 h-8">
          <Image
            src="/logo.png"
            fill
            className="object-contain rounded-full"
            alt="Logo Logo"
          />
        </div>
        Logo
      </Link>
    </Fragment>
  );
};
export default LoggedInNav;
