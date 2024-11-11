"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useGetTherapyArea } from "@/hooks/fetch/useFetchKPI";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import { useOnboarding } from "@/context/OnboardingProvider";

// Define schema using Zod for form validation
const schema = z.object({
  therapyArea: z.string({
    required_error: "Please select therapy",
  }),
});

const Page: React.FC = () => {
  const router = useRouter();
  const therapy = useGetTherapyArea();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const { selectTherapy } = useOnboarding();
  function onSubmit(data: z.infer<typeof schema>) {
    selectTherapy(data.therapyArea);
    router.push(`/onboarding/region`);
  }
  return (
    <div className="">
      <div className="bg-white shadow-lg space-y-4 rounded-3xl p-8 max-w-md w-full ">
        {/* Step Indicator */}
        <div className="mb-6 flex justify-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-gray-300" />
          <div className="w-3 h-3 rounded-full bg-gray-300" />
          <div className="w-3 h-3 rounded-full bg-gray-300" />
        </div>

        {/* Form Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Select Therapy Area
        </h2>
        <p className="text-gray-600 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="therapyArea"
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
                      {therapy.data?.map((option) => (
                        <SelectItem key={option.name} value={option.name}>
                          {option.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Navigation Buttons */}
            <div className="flex justify-end gap-2 mt-6">
              <Button
                onClick={() => router.push("/")}
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
