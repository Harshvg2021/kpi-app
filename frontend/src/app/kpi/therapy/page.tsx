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

// Define schema using Zod for form validation
const schema = z.object({
  therapyArea: z.string({ message: "Please select a therapy area" }),
});

// Define TypeScript types for the form
type FormSchema = z.infer<typeof schema>;

const options = [
  "Active Patients",
  "Total Enrollments",
  "At Risk Patients",
  "Discontinued Patients",
  "Avg Time to Fill",
  "Total Enrolling HCP",
  "Total Units",
  "Total Writers",
  "Total Targets",
  "Refill Risk",
  "Pending Patients",
];

const Page: React.FC = () => {
  // Initialize the form with Zod resolver for validation
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();
  // Define submit handler with TypeScript type safety
  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    console.log("Selected Therapy Area:", data.therapyArea);
  };

  return (
    <div className="min-h-screen gap-4 flex items-center justify-center bg-[radial-gradient(58.43%_103.88%_at_56.74%_50%,#0085FF_0%,#003465_100%)]">
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Select onValueChange={(value) => setValue("therapyArea", value)}>
            <SelectTrigger className="w-full border border-gray-300 rounded-md py-2 px-4">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.therapyArea && (
            <p className="text-red-500 text-sm">{errors.therapyArea.message}</p>
          )}

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
              onClick={() => router.push("/kpi/region")}
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4"
            >
              Next
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
