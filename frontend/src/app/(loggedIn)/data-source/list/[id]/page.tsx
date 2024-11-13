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
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "@/components/custom/Spinner";
import { useGetVendorList } from "@/hooks/fetch/useFetchDataSource";
import { useDataSourceList } from "@/context/DataSourceProvider";
import { Checkbox } from "@/components/ui/checkbox";

const DataSourceList = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const { data, isLoading } = useGetVendorList({ dataSourceItemId: params.id });

  const { options, addToList, removeFromList, selectedList } =
    useDataSourceList();

  useEffect(() => {
    if (!options?.subjectArea) router.push("/data-source/subject");
  }, [options?.subjectArea]);

  return (
    <div className="">
      <div className="bg-white md:p-8 p-2 my-8 rounded-lg shadow-md max-w-4xl min-w-[80vw] flex flex-col min-h-[90vh]  gap-4 mx-auto max-h-[90vh]">
        <div className="flex md:justify-between flex-col md:flex-row items-center">
          <h1 className="text-2xl font-bold">Data Source - {data?.name}</h1>
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
                <TableHead className="w-8"></TableHead>
                <TableHead>Vendor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center mx-auto">
                    <Spinner className="mx-auto" />
                  </TableCell>
                </TableRow>
              ) : null}
              {data?.vendorList?.length === 0 && !isLoading && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No vendor found for this datasource.
                  </TableCell>
                </TableRow>
              )}

              {data?.vendorList.map((dataSource, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-start">
                      <Checkbox
                        checked={
                          selectedList.filter((e) => e.name === dataSource)
                            .length > 0
                        }
                        onCheckedChange={(checked) => {
                          if (checked) {
                            addToList({ name: dataSource });
                          } else {
                            removeFromList({ name: dataSource });
                          }
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium align-top">
                    <p className="flex items-start text-nowrap">{dataSource}</p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            onClick={() => router.push(`/data-source/list`)}
            icon={<SkipBack size={12} />}
            className="bg-blue-900 hover:bg-blue-800 "
          >
            Back
          </Button>
          <Button
            onClick={() => router.push(`/data-source/list/${params.id}/summary`)}
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

export default DataSourceList;
