"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { PencilIcon } from "lucide-react";
import CreateKpi from "./components/CreateKpi";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetKPIS } from "@/hooks/fetch/useFetchKPI";
import { useEffect } from "react";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";

interface KPI {
  id: string;
  name: string;
  definition: string;
}

const KPIList = () => {
  const router = useRouter();
  const search = useSearchParams();
  const kpisList = useGetKPIS({
    distribution_model: search.get("distribution")!,
    region: search.get("region")!,
    subject_area: search.get("subject")!,
    therapy_area: search.get("therapy")!,
  });
  const updateSearch = useUpdateSearchParams(true);
  useEffect(() => {
    if (!search.get("therapy"))
      router.push(`/kpi/therapy1${updateSearch("therapy")}`);
    if (!search.get("region"))
      router.push(`/kpi/region${updateSearch("region")}`);
    if (!search.get("distribution"))
      router.push(`/kpi/distribution${updateSearch("distribution")}`);
    if (!search.get("subject"))
      router.push(`/kpi/subject${updateSearch("subject")}`);
  }, [search, router, updateSearch]);
  console.log(kpisList.data, kpisList.isError);
  const kpis: KPI[] = [
    {
      id: "1",
      name: "KPI 1",
      definition:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut l...",
    },
    {
      id: "2",
      name: "KPI 2",
      definition:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut l...",
    },
    {
      id: "3",
      name: "KPI 3",
      definition:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut l...",
    },
    {
      id: "4",
      name: "KPI 4",
      definition:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut l...",
    },
    {
      id: "5",
      name: "KPI 5",
      definition:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut l...",
    },
    {
      id: "6",
      name: "KPI 6",
      definition:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut l...",
    },
    {
      id: "7",
      name: "KPI 7",
      definition:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut l...",
    },
    {
      id: "8",
      name: "KPI 8",
      definition:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut l...",
    },
  ];

  return (
    <div className="min-h-screen gap-4 flex items-center justify-center bg-[radial-gradient(58.43%_103.88%_at_56.74%_50%,#0085FF_0%,#003465_100%)]">
      <div className="bg-white p-8 my-8 rounded-lg shadow-md max-w-4xl flex flex-col gap-4 mx-auto max-h-[90vh]">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            KPI List - {search.get("subject")}
          </h1>
          <CreateKpi />
        </div>

        <div className="rounded-lg border max-h-[70vh] overflow-y-auto bg-white shadow ">
          <Table className="  ">
            <TableHeader className="  bg-white rounded-t-md  z-10">
              <TableRow>
                <TableHead className=""></TableHead>
                <TableHead className="">KPI</TableHead>
                <TableHead>Definition</TableHead>
                <TableHead className="w-24">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {kpis.map((kpi) => (
                <TableRow key={kpi.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell className="font-medium">{kpi.name}</TableCell>
                  <TableCell>{kpi.definition}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={() => {
              router.push("/kpi/summary");
            }}
            className="bg-blue-900 hover:bg-blue-800 w-full max-w-md"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KPIList;
