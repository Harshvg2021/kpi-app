"use client";
import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
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

const Page = () => {
  const router = useRouter();
  const { selectedList } = useReportList();
  const [isExporting, setIsExporting] = useState(false);
  const search = useSearchParams();
  useEffect(() => {
    if (selectedList.length === 0) {
      router.push("/report/list");
    }
  }, [selectedList, router]);

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

        <Table className="grow h-full">
          <TableBody>
            {selectedList.map((report, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="font-medium w-32">{report.title}</TableCell>
                <TableCell className="text-gray-600">
                  {report.description}
                </TableCell>
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
