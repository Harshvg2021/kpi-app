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
import { PencilIcon, SkipBack, Trash2, Upload } from "lucide-react";
import CreateKpi from "./components/CreateKpi";
import { useRouter, useSearchParams } from "next/navigation";
import { useCategories, useGetKPIS } from "@/hooks/fetch/useFetchKPI";
import { useEffect, useState } from "react";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import { useSelectedList } from "@/context/ListProvider";
import { Spinner } from "@/components/custom/Spinner";
import { parseExcelFile } from "@/lib/convertor";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { DialogDescription } from "@/components/ui/dialog";
import { PopoverClose } from "@radix-ui/react-popover";
import UpdateKpi from "./components/UpdateKpi";

const KPIList = () => {
  const router = useRouter();
  const search = useSearchParams();
  const updateSearch = useUpdateSearchParams(true);
  const [category, setCategory] = useState<string>("All");
  const { data } = useCategories();

  // Fetch KPIs based on search parameters
  const kpisList = useGetKPIS({
    distribution_model: search.get("distribution")!,
    region: search.get("region")!,
    subject_area: search.get("subject")!,
    therapy_area: search.get("therapy")!,
  });

  const [KPI, setKPI] = useState<
    {
      title: string;
      description: string;
      category?: string;
    }[]
  >([]);

  useEffect(() => {
    if (kpisList.data) {
      setKPI(kpisList.data);
    }
  }, [kpisList.data]);

  useEffect(() => {
    if (category !== "All") {
      setKPI(kpisList.data?.filter((kpi) => kpi.category === category) ?? []);
    } else {
      setKPI(kpisList.data ?? []);
    }
  }, [category]);

  const { addToList, removeFromList, selectedList } = useSelectedList();
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const data = await parseExcelFile(file);
        console.log("Parsed Data:", data);
        toast.info(JSON.stringify(data));
      } catch (error) {
        toast.error("Error parsing file");
        console.error("Error parsing file:", error);
      }
    }
  };
  useEffect(() => {
    if (!search.get("therapy"))
      router.push(`/kpi/therapy1${updateSearch("therapy")}`);
    if (!search.get("region"))
      router.push(`/kpi/region${updateSearch("region")}`);
    if (!search.get("distribution"))
      router.push(`/kpi/distribution${updateSearch("distribution")}`);
    if (!search.get("subject"))
      router.push(`/kpi/subject${updateSearch("subject")}`);
  }, [search, router, updateSearch]);

  return (
    <div className="min-h-screen gap-4 flex items-center justify-center bg-[radial-gradient(58.43%_103.88%_at_56.74%_50%,#0085FF_0%,#003465_100%)]">
      <div className="bg-white md:p-8 p-2 my-8 rounded-lg shadow-md max-w-4xl min-w-[80vw] flex flex-col gap-4 mx-auto max-h-[90vh]">
        <div className="flex md:justify-between flex-col md:flex-row items-center">
          <h1 className="text-2xl font-bold">
            KPI List - {search.get("subject")}
          </h1>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="All">All categories</SelectItem>
                {data?.map((e) => (
                  <SelectItem key={e} value={e}>
                    {e}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="flex gap-2 items-center">
            <div>
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />

              <label htmlFor="file-upload">
                <div className="bg-blue-500 text-white gap-2 items-center flex px-4 py-2 text-sm font-semibold rounded-md cursor-pointer hover:bg-blue-600">
                  <Upload size={18} /> Upload Excel
                </div>
              </label>
            </div>
            <CreateKpi />
          </div>
        </div>

        <div className="rounded-lg border max-h-[70vh] min-h-[70vh] w-full overflow-y-auto bg-white shadow">
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
              {kpisList.isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center mx-auto">
                    <Spinner className="mx-auto" />
                  </TableCell>
                </TableRow>
              ) : null}
              {kpisList.data?.length === 0 && (
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
                    <UpdateKpi
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

                        <div className="flex gap-2 pt-4">
                          <Button size={"sm"} variant={"destructive"}>
                            Delete
                          </Button>
                          <PopoverClose>
                            <Button size={"sm"} variant={"outline"}>
                              Cancel
                            </Button>
                          </PopoverClose>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            onClick={() => router.push(`/kpi/subject?${search.toString()}`)}
            icon={<SkipBack size={12} />}
            className="bg-blue-900 hover:bg-blue-800 "
          >
            Back
          </Button>
          <Button
            onClick={() => router.push(`/kpi/summary?${search.toString()}`)}
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
