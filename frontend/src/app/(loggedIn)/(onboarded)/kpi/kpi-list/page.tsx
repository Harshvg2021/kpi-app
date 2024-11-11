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
import { SkipBack, Trash2 } from "lucide-react";
import CreateKpi from "./components/CreateKpi";
import { useRouter } from "next/navigation";
import {
  useCategories,
  useDeleteKPI,
  useGetKPIS,
} from "@/hooks/fetch/useFetchKPI";
import { useEffect, useMemo, useState } from "react";
import { useKpiList } from "@/context/KpiProvider";
import { Spinner } from "@/components/custom/Spinner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { PopoverClose } from "@radix-ui/react-popover";
import UpdateKpi from "./components/UpdateKpi";
import UploadKpi from "./components/CreateManyKpi";
import { useOnboarding } from "@/context/OnboardingProvider";

const KPIList = () => {
  const router = useRouter();
  const deleteKPI = useDeleteKPI();
  const [category, setCategory] = useState<string>("All");
  const { data } = useCategories();

  const { selectedOnboarding } = useOnboarding();
  const { options } = useKpiList();

  const kpisList = useGetKPIS({
    distribution_model: selectedOnboarding?.distributionModel,
    region: selectedOnboarding?.region,
    subject_area: options?.subjectArea,
    therapy_area: selectedOnboarding?.therapyArea,
  });
  useEffect(() => {
    if (!options?.subjectArea) router.push("/kpi/subject");
  }, [options?.subjectArea]);

  const parsedKpis = useMemo(() => {
    return [
      ...(kpisList.data?.data.customKPI?.kpiLists.map((e) => {
        return {
          title: e.title,
          id: e.id,
          isCustom: true,
          description: e.description,
          category: e.categoryName,
        };
      }) ?? []),
    ];
  }, [kpisList.data]);

  const [KPI, setKPI] = useState<
    {
      title: string;
      id: string;
      description: string;
      category?: string;
      isCustom: boolean;
    }[]
  >([]);

  useEffect(() => {
    if (kpisList.data) {
      setKPI([
        ...(kpisList.data.data.customKPI?.kpiLists.map((e) => {
          return {
            title: e.title,
            id: e.id,
            description: e.description,
            isCustom: true,
            category: e.categoryName,
          };
        }) ?? []),
      ]);
    }
  }, [kpisList.data]);

  useEffect(() => {
    if (category !== "All") {
      setKPI(parsedKpis?.filter((kpi) => kpi.category === category) ?? []);
    } else {
      setKPI(parsedKpis ?? []);
    }
  }, [category]);

  const { addToList, removeFromList, selectedList } = useKpiList();

  return (
    <div className="min-h-screen gap-4 flex items-center justify-center bg-[radial-gradient(58.43%_103.88%_at_56.74%_50%,#0085FF_0%,#003465_100%)]">
      <div className="bg-white md:p-8 p-2 my-8 rounded-lg shadow-md max-w-4xl min-w-[80vw] flex flex-col min-h-[90vh]  gap-4 mx-auto max-h-[90vh]">
        <div className="flex md:justify-between flex-col md:flex-row items-center">
          <h1 className="text-2xl font-bold">
            KPI List - {options?.subjectArea}
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
            <UploadKpi />
            <CreateKpi />
          </div>
        </div>

        <div className="rounded-lg border max-h-[70vh] min-h-full flex-grow w-full overflow-y-auto bg-white shadow">
          <Table>
            <TableHeader className="bg-white rounded-t-md z-10">
              <TableRow>
                <TableHead></TableHead>
                <TableHead>KPI</TableHead>
                <TableHead>Definition</TableHead>
                <TableHead className="w-24">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kpisList.isLoading || deleteKPI.isPending ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center mx-auto">
                    <Spinner className="mx-auto" />
                  </TableCell>
                </TableRow>
              ) : null}
              {parsedKpis?.length === 0 && !kpisList.isLoading && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No KPIs found
                  </TableCell>
                </TableRow>
              )}
              {KPI?.toReversed().map((kpi, index) => (
                <TableRow key={index} className="align-top even:bg-blue-50">
                  <TableCell className="align-top">
                    <div className="flex items-start">
                      <Checkbox
                        checked={selectedList.includes(kpi)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            addToList(kpi);
                          } else {
                            removeFromList(kpi);
                          }
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium align-top">
                    <p className="flex items-start text-nowrap">{kpi.title}</p>
                  </TableCell>
                  <TableCell className="align-top">
                    <p className="line-clamp-6">{kpi.description}</p>
                  </TableCell>
                  <TableCell className="align-top flex ">
                    {kpi.isCustom ? (
                      <>
                        {" "}
                        <UpdateKpi
                          kpiListId={kpi.id}
                          defaultTitle={kpi.title}
                          defaultDescription={kpi.description}
                        />
                        <Popover>
                          <PopoverTrigger>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="max-w-56 space-y-2">
                            <Label>Are you sure?</Label>
                            <p className="text-sm ">
                              This action cannot be undone.
                            </p>

                            <PopoverClose className="flex gap-2 pt-4">
                              <Button
                                size={"sm"}
                                variant={"destructive"}
                                loading={deleteKPI.isPending}
                                onClick={() => {
                                  deleteKPI.mutate({
                                    mutationBody: {
                                      KPIListId: kpi.id,
                                    },
                                  });
                                }}
                              >
                                Delete
                              </Button>
                              <PopoverClose>
                                <Button size={"sm"} variant={"outline"}>
                                  Cancel
                                </Button>
                              </PopoverClose>
                            </PopoverClose>
                          </PopoverContent>
                        </Popover>
                      </>
                    ) : (
                      "Standard"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            onClick={() => router.push(`/kpi/subject`)}
            icon={<SkipBack size={12} />}
            className="bg-blue-900 hover:bg-blue-800 "
          >
            Back
          </Button>
          <Button
            onClick={() => router.push(`/kpi/summary`)}
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

export default KPIList;
