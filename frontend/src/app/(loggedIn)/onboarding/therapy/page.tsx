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
import SelectionCard from "../../components/SelectionCard";

const Page: React.FC = () => {
  const router = useRouter();
  const therapy = useGetTherapyArea();

  const { selectTherapy } = useOnboarding();
  function onSubmit(data: string) {
    selectTherapy(data);
    router.push(`/onboarding/region`);
  }
  return (
    <>
      <SelectionCard
        backLink="/"
        onSubmit={onSubmit}
        title="Select Therapy Area"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua."
        list={
          therapy.data?.map((e) => ({ label: e.name, value: e.name })) ?? []
        }
      />
    </>
  );
};

export default Page;
