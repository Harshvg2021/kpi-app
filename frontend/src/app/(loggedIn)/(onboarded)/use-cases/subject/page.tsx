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
import { useUseCaseList } from "@/context/UseCaseProvider";
import SelectionCard from "@/app/(loggedIn)/components/SelectionCard";

const Page: React.FC = () => {
  const subject = useSubjectAreas();

  const router = useRouter();
  const { selectSubjectArea } = useUseCaseList();
  const onSubmit = (data: string) => {
    selectSubjectArea(data);
    router.push(`/use-cases/list`);
  };

  return (
    <div className="">
      <SelectionCard
        backLink="/dashboard"
        onSubmit={onSubmit}
        title="Select Subject Area"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua."
        list={
          subject.data?.map((e) => ({ label: e.name, value: e.name })) ?? []
        }
      />
    </div>
  );
};

export default Page;
