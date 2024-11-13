"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useSubjectAreas } from "@/hooks/fetch/useFetchKPI";
import { useReportList } from "@/context/ReportProvider";

const schema = z.object({
  subject: z.string({ message: "Please select a region" }),
});

type FormSchema = z.infer<typeof schema>;

const Page: React.FC = () => {
  const subject = useSubjectAreas();
  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    mode: "onChange",
    // disabled: region.isLoading || region.isPending,
  });
  const router = useRouter();
  const { selectSubjectArea } = useReportList();
  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    selectSubjectArea(data.subject);
    router.push(`/reports/list`);
  };

  return (
    <div className="">
      <div className="bg-white shadow-lg space-y-4 rounded-3xl p-8 max-w-md w-full ">
        {/* Step Indicator */}
        <div className="mb-6 flex justify-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <div className="w-3 h-3 rounded-full bg-blue-500" />
        </div>

        {/* Form Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Select Subject Area
        </h2>
        <p className="text-gray-600 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        {/* Form */}
        <Form {...form}>
          {" "}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full border border-gray-300 rounded-md py-2 px-4">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subject.data?.map((option) => (
                        <SelectItem key={option.name} value={option.name}>
                          {option.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* Navigation Buttons */}
            <div className="flex justify-end gap-2 mt-6">
              <Button
                onClick={() => router.push(`/dashboard`)}
                type="button"
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md py-2 px-4"
              >
                Back
              </Button>
              <Button
                disabled={!form.formState.isValid}
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4"
              >
                Next
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
