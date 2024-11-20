"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, X, Share2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  exportToExcel,
  exportToPDF,
  exportToPowerPoint,
} from "@/lib/convertor/reportConvertor";
import { useReportList } from "@/context/ReportProvider";
import { useGetLevels } from "@/hooks/fetch/useFetchReport";

const Page = () => {
  const router = useRouter();
  const { selectedList } = useReportList();
  const [isExporting, setIsExporting] = useState(false);
  const search = useSearchParams();
  const level = useGetLevels();
  // useEffect(() => {
  //   if (selectedList.length === 0) {
  //     router.push("/reports/list");
  //   }
  // }, [selectedList, router]);

  const data = useMemo(() => {
    const map = new Map<string, string[]>();
    selectedList.map((e, i) => {
      if (!e.levelName) {
        if (!map.get("All")) map.set("All", []);
        map.set("All", [...(map.get("All") ?? []), e.title]);
      } else {
        if (!map.get(e.levelName)) map.set(e.levelName, []);
        map.set(e.levelName, [...(map.get(e.levelName) ?? []), e.title]);
      }
    });
    return map;
  }, [selectedList]);

  const headers = Array.from(data.keys());
  const maxRows = Math.max(
    ...Array.from(data.values()).map((rows) => rows.length)
  );

  const handleExport = async (format: "excel" | "pdf" | "ppt") => {
    setIsExporting(true);

    const reports = selectedList.map((report, item) => ({
      id: item + 1,
      title: report.title,
      description: report.description,
    }));
    try {
      switch (format) {
        case "excel":
          exportToExcel(reports);
          break;
        case "pdf":
          exportToPDF(reports);
          break;
        case "ppt":
          await exportToPowerPoint(reports);
          break;
      }
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="">
      <Card className="w-full max-w-4xl min-w-[80vw] flex flex-col h-full min-h-[80vh] mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Summary</h1>
          <button className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <Table className="grow h-full min-w-full ">
          <TableHeader>
            <TableRow>
              {" "}
              <TableHead className="text-center">Default</TableHead>
              {level.data?.map((e) => (
                <TableHead className="text-center" key={e.name}>
                  {e.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: maxRows }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {headers.map((header, colIndex) => (
                  <TableCell key={colIndex} className="text-muted-foreground">
                    {data.get(header)?.[rowIndex] || ""}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex self-end justify-end items-center gap-4 mt-6">
          <Button
            onClick={() => router.push(`/reports/list?${search.toString()}`)}
            variant="outline"
            className="text-gray-600"
          >
            Back
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Share2 size={16} />
            Share
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
                disabled={isExporting}
              >
                <Download size={16} />
                {isExporting ? "Exporting..." : "Export"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleExport("excel")}>
                Export to Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("pdf")}>
                Export to PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("ppt")}>
                Export to PowerPoint
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Card>
    </div>
  );
};

export default Page;
