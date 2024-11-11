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
import { RefreshCcw, Undo } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const LinkGenerate = ({ href, text }: { href?: string; text: string }) => {
  return (
    <Link
      href={href ?? "/kpi/subject"}
      className="hover:text-blue-100 relative col-span-4 h-[200px] grid place-content-center overflow-hidden shadow-xl shadow-blue-300  bg-blue-600 text-white py-2 px-2 rounded-md"
    >
      <Image
        src={"/pattern.svg"}
        height={600}
        width={1000}
        alt=""
        className="absolute mix-blend-overlay opacity-20"
      />
      <CardTitle className="z-20">{text}</CardTitle>
    </Link>
  );
};

const Page = () => {
  const { selectedOnboarding, clearOnboarding } = useOnboarding();
  return (
    <Card className="w-full max-w-[90vw] min-h-[80vh]">
      <CardHeader>
        <CardTitle>Please select data type.</CardTitle>
        <CardDescription>
          You can use different data types that suits your needs.
        </CardDescription>
      </CardHeader>
      <CardContent className="  gap-8 grid md:grid-cols-12  grid-cols-4">
        <LinkGenerate text="Data" href="/data-source/subject" />
        <LinkGenerate text="KPI" href="/kpi/subject" />
        <LinkGenerate text="Reports" />
        <LinkGenerate text="Systems" />
        <LinkGenerate text="Activities" />
        <LinkGenerate text="Roadmap" />
      </CardContent>
      <CardFooter className="flex  gap-4 flex-wrap">
        <Button onClick={clearOnboarding} icon={<RefreshCcw />}>
          Reset
        </Button>
        <div className="flex flex-col font-semibold gap-1">
          <span className="">Therapy Area</span>
          <Badge> {selectedOnboarding?.therapyArea}</Badge>
        </div>
        <div>
          <span className="flex flex-col font-semibold gap-1">Region </span>
          <Badge> {selectedOnboarding?.region}</Badge>
        </div>
        <div>
          <span className="flex flex-col font-semibold gap-1">
            Distribution
          </span>
          <Badge> {selectedOnboarding?.distributionModel}</Badge>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Page;
