"use client";
import { Spinner } from "@/components/custom/Spinner";
import { Button } from "@/components/ui/button";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { useGetLevels, useGetReportKpi } from "@/hooks/fetch/useFetchReport";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { SkipBack } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useReportList } from "@/context/ReportProvider";
import CreateReportKpi from "./components/CreateReportKpi";

const Page = () => {
  const search = useSearchParams();
  const params = useParams<{id: string}>()
  const kpis = useGetReportKpi({
    id: params.id,
    isCustom: search.get("isCustom") == "true",
  });

  const router = useRouter();
  const [level, setLevel] = useState<string>("All");

  const [parsedData, setParsedData] = useState(kpis.data ?? []);

  const { selectSubjectArea, addToList, selectedList, removeFromList } =
    useReportList();
  useEffect(() => {
    if (level == "All") setParsedData(kpis.data ?? []);
    else {
      setParsedData((e) =>
        e.filter((e) => e.levelName?.toLowerCase() === level?.toLowerCase())
      );
    }
  }, [level, kpis.data]);
  const [category, setCategory] = useState("");
  const levels = useGetLevels();
  return (
    <div className="">
      <div className="bg-white md:p-8 p-2 my-8 rounded-lg shadow-md max-w-4xl min-w-[80vw] flex flex-col min-h-[90vh]  gap-4 mx-auto max-h-[90vh]">
        <div className="flex md:justify-between flex-col md:flex-row items-center">
          <h1 className="text-2xl font-bold">Kpi list</h1>
          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="All">All levels</SelectItem>
                {levels?.data?.map((e) => (
                  <SelectItem key={e.name} value={e.name}>
                    {e.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="flex gap-2 items-center">
            {/* <UploadKpi /> */}
            <CreateReportKpi
              isCustom={search.get("isCustom") == "true"}
              reportId={params.id}
            />
          </div>
        </div>

        <div className="rounded-lg border max-h-[70vh] min-h-full flex-grow w-full overflow-y-auto bg-white shadow">
          <Table>
            <TableHeader className="bg-white rounded-t-md z-10">
              <TableRow>
                <TableHead className="w-8"></TableHead>
                <TableHead className="w-80">Report</TableHead>
                <TableHead>Definition</TableHead>
                {/* <TableHead className="w-24">Action</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {kpis.isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center mx-auto">
                    <Spinner className="mx-auto" />
                  </TableCell>
                </TableRow>
              ) : null}
              {!kpis.isLoading && kpis.data?.length == 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No kpis found
                  </TableCell>
                </TableRow>
              )}
              {parsedData?.toReversed().map((eachReport, index) => (
                <TableRow
                  key={index}
                  className="align-top group cursor-pointer even:bg-blue-50"
                >
                  <TableCell className="align-top">
                    <div className="flex items-start">
                      <Checkbox
                        checked={
                          selectedList.filter(
                            (report) => report.title === eachReport.title
                          ).length > 0
                        }
                        onCheckedChange={(checked) => {
                          if (checked) {
                            addToList(eachReport);
                          } else {
                            removeFromList(eachReport);
                          }
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium align-top">
                    <p className="flex items-start text-nowrap group-hover:underline underline-offset-1">
                      {eachReport.title}
                    </p>
                  </TableCell>
                  <TableCell className="align-top">
                    <p className="line-clamp-6">{eachReport.description}</p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            onClick={() => router.push(`/reports/list`)}
            icon={<SkipBack size={12} />}
            className="bg-blue-900 hover:bg-blue-800 "
          >
            Back
          </Button>
          <Button
            onClick={() => router.push(`/reports/summary`)}
            // disabled={selectedList.length === 0}
            className="bg-blue-900 hover:bg-blue-800 w-full max-w-md"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
