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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useOnboarding } from "@/context/OnboardingProvider";
import { useReportList } from "@/context/ReportProvider";
import { useCreateReport } from "@/hooks/fetch/useFetchReport";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const CreateReport = () => {
  const search = useSearchParams();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { options } = useReportList();
  const { selectedOnboarding } = useOnboarding();
  const createReport = useCreateReport({
    distributionModelName: selectedOnboarding?.distributionModel,
    regionName: selectedOnboarding?.region,
    subjectAreaName: options?.subjectArea,
    therapyAreaName: selectedOnboarding?.therapyArea,
  });
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          size={"sm"}
          variant={"default"}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Add New report
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Report</DialogTitle>
          <DialogDescription>
            Please add report name and description to create a new report.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid  items-center gap-4">
            <Label htmlFor="name" className="">
              Report Name
            </Label>
            <Input
              id="name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Please enter report name"
              className="col-span-3"
            />
          </div>
          <div className="grid  items-center gap-4">
            <Label htmlFor="username" className="">
              Description
            </Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              placeholder="Please enter report description"
              className="col-span-3 min-h-20"
            />
          </div>
        </div>
        <DialogFooter className="flex gap-2">
          <DialogClose>
            <Button className="bg-gray-400 hover:bg-gray-500" type="submit">
              Close
            </Button>
          </DialogClose>
          <Button
            loading={createReport.isPending}
            onClick={async () => {
              await createReport.mutateAsync({
                mutationBody: {
                  description: description,
                  name: title,
                },
              });
              setTitle("");
              setDescription("");
              setDialogOpen(false);
              toast.success("Report created successfully");
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

export default CreateReport;
