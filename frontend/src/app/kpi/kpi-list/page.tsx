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
import { PencilIcon } from "lucide-react";
import CreateKpi from "./components/CreateKpi";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetKPIS } from "@/hooks/fetch/useFetchKPI";
import { useEffect } from "react";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import { useSelectedList } from "@/context/ListProvider";
import { Spinner } from "@/components/custom/Spinner";

const KPIList = () => {
  const router = useRouter();
  const search = useSearchParams();
  const updateSearch = useUpdateSearchParams(true);

  // Fetch KPIs based on search parameters
  const kpisList = useGetKPIS({
    distribution_model: search.get("distribution")!,
    region: search.get("region")!,
    subject_area: search.get("subject")!,
    therapy_area: search.get("therapy")!,
  });

  const { addToList, removeFromList, selectedList } = useSelectedList();

  useEffect(() => {
    // Ensure required parameters are present in the URL
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
      <div className="bg-white p-8 my-8 rounded-lg shadow-md max-w-4xl min-w-[80vw] flex flex-col gap-4 mx-auto max-h-[90vh]">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            KPI List - {search.get("subject")}
          </h1>
          <CreateKpi />
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
                  <TableCell colSpan={4} className="text-center">
                    <Spinner />
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
              {kpisList.data?.toReversed().map((kpi, index) => (
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
                  <TableCell className="align-top">
                    <Button variant="ghost" size="icon">
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={() => router.push("/kpi/summary")}
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
