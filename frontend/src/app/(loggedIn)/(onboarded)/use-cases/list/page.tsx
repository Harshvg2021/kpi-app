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
import { SkipBack } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Spinner } from "@/components/custom/Spinner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOnboarding } from "@/context/OnboardingProvider";
import CreateUseCase from "./components/CreateUseCase";
import { useCategories } from "@/hooks/fetch/useFetchKPI";
import { useUseCaseList } from "@/context/UseCaseProvider";
import { useGetUseCase } from "@/hooks/fetch/useFetchUseCases";

const UseCasesList = () => {
  const router = useRouter();
  const [category, setCategory] = useState<string>("All");
  const { data } = useCategories();

  const { selectedOnboarding } = useOnboarding();
  const { options } = useUseCaseList();

  const useCaseList = useGetUseCase({
    distributionModelName: selectedOnboarding?.distributionModel,
    regionName: selectedOnboarding?.region,
    subjectAreaName: options?.subjectArea,
    therapyAreaName: selectedOnboarding?.therapyArea,
  });
  useEffect(() => {
    if (!options?.subjectArea) router.push("/use-cases/subject");
  }, [options?.subjectArea]);

  const parsedUseCase = useMemo(() => {
    return [
      ...(useCaseList.data?.standardUseCases?.map((e) => {
        return {
          isCustom: true,
          description: e.description,
          category: e.category,
        };
      }) ?? []),
      ...(useCaseList.data?.customUseCases?.map((e) => {
        return {
          isCustom: true,
          description: e.description,
          category: e.category,
        };
      }) ?? []),
    ];
  }, [useCaseList.data]);

  const [useCase, setUseCase] = useState<
    {
      description: string;
      category?: string;
      isCustom: boolean;
    }[]
  >([]);

  useEffect(() => {
    if (useCaseList.data) {
      setUseCase(parsedUseCase ?? []);
    }
  }, [parsedUseCase]);

  useEffect(() => {
    if (category !== "All") {
      setUseCase(
        parsedUseCase?.filter((useCases) => useCases.category === category) ??
          []
      );
    } else {
      setUseCase(parsedUseCase ?? []);
    }
  }, [category]);

  const { addToList, removeFromList, selectedList } = useUseCaseList();

  return (
    <div className="">
      <div className="bg-white md:p-8 p-2 my-8 rounded-lg shadow-md max-w-4xl min-w-[80vw] flex flex-col min-h-[90vh]  gap-4 mx-auto max-h-[90vh]">
        <div className="flex md:justify-between flex-col md:flex-row items-center">
          <h1 className="text-2xl font-bold">
            Use Case - {options?.subjectArea}
          </h1>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="All">All categories</SelectItem>
                {data?.map((e) => (
                  <SelectItem key={e.id} value={e.name}>
                    {e.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="flex gap-2 items-center">
            {/* <UploaduseCases /> */}
            <CreateUseCase />
          </div>
        </div>

        <div className="rounded-lg border max-h-[70vh] min-h-full flex-grow w-full overflow-y-auto bg-white shadow">
          <Table>
            <TableHeader className="bg-white rounded-t-md z-10">
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Use Case</TableHead>
                {/* <TableHead className="w-24">Action</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {useCaseList.isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center mx-auto">
                    <Spinner className="mx-auto" />
                  </TableCell>
                </TableRow>
              ) : null}
              {parsedUseCase?.length === 0 && !useCaseList.isLoading && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No use cases found
                  </TableCell>
                </TableRow>
              )}
              {useCase?.toReversed().map((eachUseCase, index) => (
                <TableRow key={index} className="align-top even:bg-blue-50">
                  <TableCell className="align-top">
                    <div className="flex items-start">
                      <Checkbox
                        checked={selectedList.includes(eachUseCase)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            addToList(eachUseCase);
                          } else {
                            removeFromList(eachUseCase);
                          }
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium align-top">
                    <p className="flex items-start text-nowrap">
                      {eachUseCase.description}
                    </p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            onClick={() => router.push(`/use-cases/subject`)}
            icon={<SkipBack size={12} />}
            className="bg-blue-900 hover:bg-blue-800 "
          >
            Back
          </Button>
          <Button
            onClick={() => router.push(`/use-cases/summary`)}
            disabled={selectedList.length === 0}
            className="bg-blue-900 hover:bg-blue-800 w-full max-w-md"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UseCasesList;
