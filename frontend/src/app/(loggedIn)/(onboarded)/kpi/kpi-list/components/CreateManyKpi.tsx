"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-uploader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useKpiList } from "@/context/KpiProvider";
import { useOnboarding } from "@/context/OnboardingProvider";
import { useCreateKPI, useCreateManyKPI } from "@/hooks/fetch/useFetchKPI";
import { parseExcelFile } from "@/lib/convertor";
import { Paperclip, Upload } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const UploadKpi = () => {
  const search = useSearchParams();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [files, setFiles] = useState<File[] | null>(null);
  const [kpi, setKPI] = useState<
    {
      title: string;
      description: string;
    }[]
  >([]);
  const { selectedOnboarding  } = useOnboarding();
  const { options } = useKpiList();
  const createKpi = useCreateManyKPI({
    distribution_model: selectedOnboarding?.distributionModel,
    region: selectedOnboarding?.region,
    subject_area: options?.subjectArea,
    therapy_area: selectedOnboarding?.therapyArea,
  });
  const handleFileUpload = async (file: File) => {
    if (file) {
      try {
        const data = await parseExcelFile(file);
        console.log("Parsed Data:", data);
        if (data.length === 0) {
          toast.error(
            "File is invalid. Make sure title and description column has at least one entry."
          );
          setFiles([]);
          setKPI([]);
          return;
        }
        toast.info(JSON.stringify(data));
        setKPI(data);
      } catch (error) {
        toast.error("Error parsing file");
        console.error("Error parsing file:", error);
      }
    }
  };

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(e) => {
        setDialogOpen(e);
        setKPI([]);
        setFiles(null);
      }}
    >
      <DialogTrigger asChild>
        <Button
          size={"sm"}
          variant={"default"}
          className="bg-blue-500 hover:bg-blue-600"
        >
          <Upload size={18} /> Upload Excel
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload excel</DialogTitle>
          <DialogDescription>
            Please make sure that your excel file has title and description
            column.
          </DialogDescription>
        </DialogHeader>
        <FileUploader
          value={files}
          onValueChange={(files) => {
            setFiles(files);
            if (files?.length) {
              handleFileUpload(files?.[0]);
            }
          }}
          dropzoneOptions={{
            maxFiles: 1,
            maxSize: 1024 * 1024 * 4,
            accept: {
              "application/vnd.ms-excel": [".xls", ".xlsx"],
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                [".xlsx"],
              "text/csv": [".csv"],
            },
            multiple: false,
          }}
          className="relative bg-background rounded-lg p-2"
        >
          <FileInput className="outline-dashed outline-1 outline-white">
            <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full ">
              <FileSvgDraw />
            </div>
          </FileInput>
          <FileUploaderContent>
            {files &&
              files.length > 0 &&
              files.map((file, i) => (
                <FileUploaderItem key={i} index={i}>
                  <Paperclip className="h-4 w-4 stroke-current" />
                  <span>{file.name}</span>
                </FileUploaderItem>
              ))}
          </FileUploaderContent>
        </FileUploader>
        <DialogFooter className="flex gap-2">
          <DialogClose>
            <Button className="bg-gray-400 hover:bg-gray-500" type="submit">
              Close
            </Button>
          </DialogClose>
          <Button
            disabled={createKpi.isPending || files?.length === 0}
            loading={createKpi.isPending}
            onClick={async () => {
              await createKpi.mutateAsync({
                mutationBody: {
                  kpiList: kpi.map((e) => {
                    return {
                      kpi_description: e.description,
                      kpi_name: e.title,
                    };
                  }),
                },
              });

              setDialogOpen(false);
              toast.success("KPI created successfully");
            }}
            className="bg-blue-500 hover:bg-blue-600"
            type="submit"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const FileSvgDraw = () => {
  return (
    <>
      <svg
        className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Click to upload</span>
        &nbsp; or drag and drop
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        CSV, XLS or XLSX
      </p>
    </>
  );
};
export default UploadKpi;
