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
import { useUseCaseList } from "@/context/UseCaseProvider";
import { useCreateUseCases } from "@/hooks/fetch/useFetchUseCases";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const CreateUseCase = () => {
  const search = useSearchParams();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { options } = useUseCaseList();
  const { selectedOnboarding } = useOnboarding();
  const createUseCase = useCreateUseCases({
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
          Add New Use Case
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Use Case</DialogTitle>
          <DialogDescription>
            Please add use case title to create a use case.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid  items-center gap-4">
            <Label htmlFor="name" className="">
              UseCase Name
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please enter use case name"
              className="col-span-3"
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
            loading={createUseCase.isPending}
            onClick={async () => {
              await createUseCase.mutateAsync({
                mutationBody: {
                  description: description,
                },
              });
              setTitle("");
              setDescription("");
              setDialogOpen(false);
              toast.success("Use case created successfully");
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

export default CreateUseCase;
