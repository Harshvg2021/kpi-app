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
import { SkipBack } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCategories, useDeleteKPI } from "@/hooks/fetch/useFetchKPI";
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
import { useGetDataSource } from "@/hooks/fetch/useFetchDataSource";
import { Checkbox } from "@/components/ui/checkbox";

import Vendors from "./components/Vendors";
import { useDataSourceList } from "@/context/DataSourceProvider";

const Page = () => {
  const router = useRouter();
  const deleteKPI = useDeleteKPI();
  const [category, setCategory] = useState<string>("All");
  const { data } = useCategories();

  const { selectedOnboarding } = useOnboarding();
  const { options, addToList, removeFromList, selectedList } = useDataSourceList();

  const dataSourceList = useGetDataSource({
    distributionModel: selectedOnboarding?.distributionModel,
    region: selectedOnboarding?.region,
    subjectArea: options?.subjectArea,
    therapyArea: selectedOnboarding?.therapyArea,
  });
  useEffect(() => {
    if (!options?.subjectArea) router.push("/data-source/subject");
  }, [options?.subjectArea]);

  const parsedKpis = useMemo(() => {
    return (
      dataSourceList.data?.items?.map((e) => {
        return {
          id: e.id,
          name: e.name,
          description: e.description,
          createdAt: e.createdAt,
          vendor: e.vendorList || [],
        };
      }) ?? []
    );
  }, [dataSourceList.data]);

  const [datasource, setDatasource] = useState<
    {
      name: string;
      id: string;
      description: string;
      vendor: string[];
      createdAt?: Date;
    }[]
  >([]);

  useEffect(() => {
    if (dataSourceList.data) {
      setDatasource([
        ...(dataSourceList.data.items?.map((e) => {
          return {
            id: e.id,
            description: e.description,
            name: e.name,
            createdAt: e.createdAt,
            vendor: e.vendorList || [],
          };
        }) ?? []),
      ]);
    }
  }, [dataSourceList.data]);

  return (
    <div className="">
      <div className="bg-white md:p-8 p-2 my-8 rounded-lg shadow-md max-w-4xl min-w-[80vw] flex flex-col min-h-[90vh]  gap-4 mx-auto max-h-[90vh]">
        <div className="flex md:justify-between flex-col md:flex-row items-center">
          <h1 className="text-2xl font-bold">
            Data Source - {options?.subjectArea}
          </h1>
          {/* <Select value={category} onValueChange={setCategory}>
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
          </Select> */}
          <div className="flex gap-2 items-center"></div>
        </div>

        <div className="rounded-lg border max-h-[70vh] min-h-full flex-grow w-full overflow-y-auto bg-white shadow">
          <Table>
            <TableHeader className="bg-white rounded-t-md z-10">
              <TableRow>
                {/* <TableHead></TableHead> */}
                <TableHead>Data Source</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataSourceList.isLoading || deleteKPI.isPending ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center mx-auto">
                    <Spinner className="mx-auto" />
                  </TableCell>
                </TableRow>
              ) : null}
              {parsedKpis?.length === 0 && !dataSourceList.isLoading && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No data source found for this criteria.
                  </TableCell>
                </TableRow>
              )}
              {datasource.map((dataSource, index) => (
                <Vendors
                  key={index}
                  id={dataSource.id}
                  vendor={dataSource.vendor}
                  description={dataSource.description}
                  name={dataSource.name}
                />
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

export default Page;
