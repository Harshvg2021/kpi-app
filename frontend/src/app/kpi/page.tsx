import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const LinkGenerate = ({ href, text }: { href?: string; text: string }) => {
  return (
    <Link
      href={"/kpi/therapy"}
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

const page = () => {
  return (
    <div className="min-h-screen gap-4 flex items-center justify-center bg-[radial-gradient(58.43%_103.88%_at_56.74%_50%,#0085FF_0%,#003465_100%)]">
      <Card className="w-full max-w-[90vw] min-h-[80vh]">
        <CardHeader>
          <CardTitle>Please select data type.</CardTitle>
          <CardDescription>
            You can use different data types that suits your needs.
          </CardDescription>
        </CardHeader>
        <CardContent className="  gap-8 grid grid-cols-12  ">
          <LinkGenerate text="Data" />
          <LinkGenerate text="KPI" />
          <LinkGenerate text="Reports" />
          <LinkGenerate text="Systems" />
          <LinkGenerate text="Activities" />
          <LinkGenerate text="Roadmap" />
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
