"use client";
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, X, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
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
} from "@/lib/convertor";

interface KPI {
  id: string;
  title: string;
  description: string;
}

const Page = () => {
  const router = useRouter();
  const [isExporting, setIsExporting] = useState(false);

  const kpis: KPI[] = [
    {
      id: "1",
      title: "KPI 1",
      description: "Performance metric description for KPI 1",
    },
    {
      id: "2",
      title: "KPI 2",
      description: "Performance metric description for KPI 2",
    },
    {
      id: "3",
      title: "KPI 3",
      description: "Performance metric description for KPI 3",
    },
    {
      id: "4",
      title: "KPI 4",
      description: "Performance metric description for KPI 4",
    },
    {
      id: "5",
      title: "KPI 5",
      description: "Performance metric description for KPI 5",
    },
  ];
  const handleExport = async (format: "excel" | "pdf" | "ppt") => {
    setIsExporting(true);
    try {
      switch (format) {
        case "excel":
          exportToExcel(kpis);
          break;
        case "pdf":
          exportToPDF(kpis);
          break;
        case "ppt":
          await exportToPowerPoint(kpis);
          break;
      }
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen gap-4 flex items-center justify-center bg-[radial-gradient(58.43%_103.88%_at_56.74%_50%,#0085FF_0%,#003465_100%)]">
      <Card className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Summary</h1>
          <button className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <Table>
          <TableBody>
            {kpis.map((kpi) => (
              <TableRow key={kpi.id} className="hover:bg-gray-50">
                <TableCell className="font-medium w-32">{kpi.title}</TableCell>
                <TableCell className="text-gray-600">
                  {kpi.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-end items-center gap-4 mt-6">
          <Button
            onClick={() => router.push("/kpi/kpi-list")}
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
