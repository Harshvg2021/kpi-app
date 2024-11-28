"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useOnboarding } from "@/context/OnboardingProvider";
import { useAuth } from "@/hooks/useAuth";
import { useSession } from "@/hooks/useSession";
import { LogOut, RefreshCcw, Undo } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const LinkGenerate = ({
  href,
  text,
  img,
}: {
  href?: string;
  text: string;
  img: string;
}) => {
  return (
    <Link
      href={href ?? "/kpi/subject"}
      className="hover:text-blue-100 relative col-span-4 h-[200px]  aspect-[9/10] mx-auto flex justify-between flex-col overflow-hidden shadow-lg  bg-blue-600 text-white pt-2  rounded-md"
    >
      <div className="mx-auto">
        <Image
          src={img}
          alt="data"
          width={200}
          height={200}
          className="w-20 h-32  object-contain"
        />
      </div>
      <CardTitle className="text-center text-black h-20 grid place-content-center bg-white">
        {text}
      </CardTitle>
    </Link>
  );
};

const Page = () => {
  return (
    <Card className="min-h-[400px] border w-[1000px] shadow-md max-w-[97vw]">
      <CardContent className="  gap-8 md:gap-9 p-8 grid md:grid-cols-12 w-fit mx-auto grid-cols-4 sm:grid-cols-8">
        <LinkGenerate img="/data.png" text="Data" href="/data-source/subject" />
        <LinkGenerate img="/kpi.png" text="KPI" href="/kpi/subject" />
        <LinkGenerate
          img="/usecase.png"
          text="Use cases"
          href="/use-cases/subject"
        />
        <LinkGenerate
          img="/reports.png"
          text="Reports"
          href="/reports/subject"
        />
        <LinkGenerate img="/activities.png" text="Activities" />
        <LinkGenerate img="/systems.png" text="Systems" />
      </CardContent>
    </Card>
  );
};

export default Page;
