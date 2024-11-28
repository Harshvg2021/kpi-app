import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const schema = z.object({
  item: z.string({
    required_error: "Please select therapy",
  }),
});

const SelectionCard = (props: {
  list: {
    label: string;
    value: string;
  }[];
  title: string;
  description: string;
  backLink: string;
  onSubmit: (e: string) => void;
}) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const router = useRouter();
  return (
    <Form {...form}>
      <form
        className=""
        onSubmit={form.handleSubmit((e) => props.onSubmit(e.item))}
      >
        <Card className="min-h-[400px] border w-[1000px] shadow-md max-w-[97vw]">
          <CardHeader>
            <CardTitle>{props.title}</CardTitle>
            <CardDescription>{props.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="item"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full border border-gray-300 rounded-md py-2 px-4">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {props.list.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <div className="flex justify-end gap-2 mt-6">
          <Button
            onClick={() => router.push(props.backLink)}
            type="button"
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md py-2 px-8"
          >
            Back
          </Button>
          <Button
            disabled={!form.formState.isValid}
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-8"
          >
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SelectionCard;
