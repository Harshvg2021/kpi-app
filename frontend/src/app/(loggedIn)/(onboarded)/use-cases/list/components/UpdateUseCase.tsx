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
import { PencilIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const UpdateuseCases = ({
  defaultTitle,
  defaultDescription,
  useCasesListId,
}: {
  defaultTitle: string;
  defaultDescription: string;
  useCasesListId: string;
}) => {
  const search = useSearchParams();
  const [dialogOpen, setDialogOpen] = useState(false);
  // const updateUseCases = useEditCustomUseCases();
  //   const createuseCases = useCreateUseCases({
  //     distribution_model: search.get("distribution")!,
  //     region: search.get("region")!,
  //     subject_area: search.get("subject")!,
  //     therapy_area: search.get("therapy")!,
  //   });

  const [title, setTitle] = React.useState(defaultTitle);

  const [description, setDescription] = React.useState(defaultDescription);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <PencilIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update UseCases</DialogTitle>
          <DialogDescription>
            Please modify useCases name or description to update a new UseCases.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid  items-center gap-4">
            <Label htmlFor="name" className="">
              UseCases Name
            </Label>
            <Input
              id="name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Please enter useCases name"
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
              placeholder="Please enter useCases description"
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
            // loading={updateUseCases.isPending}
            // onClick={async () => {
            //   const success = await updateUseCases.mutateAsync({
            //     mutationBody: {
            //       description: description,
            //       title: title,
            //       useCasesListId: useCasesListId,
            //     },
            //   });
            //   // setTitle("");
            //   setDescription(success ? description : defaultDescription);
            //   setDialogOpen(false);
            //   toast.success("Updated successfully");
            // }}
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

export default UpdateuseCases;
