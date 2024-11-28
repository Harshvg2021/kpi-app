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
import { useRouter, useSearchParams } from "next/navigation";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useGetDistributionModels } from "@/hooks/fetch/useFetchKPI";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import { useEffect } from "react";
import { useOnboarding } from "@/context/OnboardingProvider";
import SelectionCard from "../../components/SelectionCard";

const Page: React.FC = () => {
  const distribution = useGetDistributionModels();

  const router = useRouter();
  const { selectDistribution } = useOnboarding();
  const onSubmit = (data: string) => {
    selectDistribution(data);
    router.push(`/dashboard`);
  };

  return (
    <div className="">
      <SelectionCard
        backLink="/onboarding/region"
        onSubmit={onSubmit}
        title=" Select Distribution Model"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua."
        list={
          distribution.data?.map((e) => ({ label: e.name, value: e.name })) ??
          []
        }
      />
    </div>
  );
};

export default Page;
