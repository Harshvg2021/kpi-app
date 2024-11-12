import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { useDataSourceList } from "@/context/DataSourceProvider";
import { cn } from "@/lib/utils";
import React from "react";

type VendorList = {
  name: string;
  description: string;
  vendor: string[];
};

const Vendors = (dataSource: VendorList) => {
  const { selectedList, addToList, removeFromList } = useDataSourceList();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow
        className={cn(
          "align-top even:bg-blue-50 cursor-pointer",
          open && "bg-blue-50"
        )}
        onClick={() => setOpen(!open)}
      >
        <TableCell className={cn("align-top")}>
          <div className="flex items-start">
            <Checkbox
              checked={
                selectedList.filter((e) => e.name === dataSource.name).length >
                0
              }
              onClick={(e) => e.stopPropagation()}
              onCheckedChange={(checked) => {
                if (checked) {
                  addToList({
                    description: dataSource.description,
                    name: dataSource.name,
                  });
                } else {
                  removeFromList({
                    description: dataSource.description,
                    name: dataSource.name,
                  });
                }
              }}
            />
          </div>
        </TableCell>
        <TableCell className="font-medium align-top">
          <p className="flex items-start text-nowrap">{dataSource.name}</p>
        </TableCell>
        <TableCell className="align-top">
          <p className="line-clamp-6">{dataSource.description}</p>
        </TableCell>
      </TableRow>
      <TableRow className="w-full">
        <TableCell colSpan={3} className="p-0">
          <Accordion
            value={open ? "yes" : "no"}
            type="single"
            collapsible
            className="w-full data-[state=closed]:h-0 "
          >
            <AccordionItem value="yes">
              <AccordionContent className="ml-4">
                <Badge className="font-semibold mt-2">Vendor List</Badge>
                <div className=" flex divide-y flex-col gap-2 mt-2">
                  {dataSource.vendor.map((item, index) => (
                    <div key={index} className="flex gap-2 ml-2 items-center">
                      <Checkbox className="rounded-full" />
                      <p key={index} className="text-sm font-medium  ">
                        {item}
                      </p>
                    </div>
                  ))}
                  {dataSource.vendor.length === 0 && (
                    <div className="flex gap-2 ml-2 items-center">
                      <p className="text-sm font-medium  ">
                        No vendor list found.
                      </p>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TableCell>
      </TableRow>
    </>
  );
};

export default Vendors;
