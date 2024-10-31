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

interface KPI {
  id: string;
  name: string;
  definition: string;
}

const KPIList = () => {
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
          <h1 className="text-2xl font-bold">KPI List - Patient</h1>
          <Button className="bg-blue-500 hover:bg-blue-600">Add New KPI</Button>
        </div>

        <div className="rounded-lg border bg-white shadow ">
          <Table className="relative  max-h-[70vh] flex flex-col">
            <TableHeader className="sticky top-0 bg-white rounded-t-md  z-10">
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
          <Button className="bg-blue-900 hover:bg-blue-800 w-full max-w-md">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KPIList;
