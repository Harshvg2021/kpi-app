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
import React from "react";

const CreateKpi = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"default"} className="bg-blue-500 hover:bg-blue-600">
          Add New KPI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New KPI</DialogTitle>
          <DialogDescription>
            Please add kpi name and description to create a new KPI.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid  items-center gap-4">
            <Label htmlFor="name" className="">
              KPI Name
            </Label>
            <Input
              id="name"
              placeholder="Please enter kpi name"
              className="col-span-3"
            />
          </div>
          <div className="grid  items-center gap-4">
            <Label htmlFor="username" className="">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Please enter kpi description"
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
          <Button className="bg-blue-500 hover:bg-blue-600" type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateKpi;
