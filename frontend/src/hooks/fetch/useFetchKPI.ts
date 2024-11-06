import { useQueryClient } from "@tanstack/react-query";
import { useFetch, useFetchByPost } from "../useFetch";
import { useCustomMutation } from "../useCustomMutation";

export const useGetTherapyArea = () => {
  return useFetch<string[]>("/api/kpi/getTherapyAreas");
};

export const useGetDistributionModels = () => {
  return useFetch<string[]>("/api/kpi/getDistributionModels");
};

export const useGetRegions = () => {
  return useFetch<string[]>("/api/kpi/getRegions");
};

export const useSubjectAreas = () => {
  return useFetch<string[]>("/api/kpi/getSubjectAreas");
};

export const useCategories = () => {
  return useFetch<string[]>("/api/kpi/getCategories");
};

export type GetKPIs = {
  therapy_area?: string;
  region?: string;
  distribution_model?: string;
  subject_area?: string;
};

export const useGetKPIS = (props: GetKPIs) => {
  return useFetchByPost<
    { title: string; description: string; category?: string }[]
  >("/api/kpi/getKPIs", "kpi", props);
};

export type CreateKPIs = {
  therapy_area?: string;
  region?: string;
  distribution_model?: string;
  subject_area?: string;
};

export type createKPIMutate = {
  kpi_name: string;
  kpi_description: string;
};

export const useCreateKPI = (props: GetKPIs) => {
  const client = useQueryClient();
  const refetch = JSON.stringify(props);
  return useCustomMutation<void, createKPIMutate, null>({
    apiRoute: "/api/kpi/addCustomKPI",
    body: props,

    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["kpi"],
      });
    },
  });
};

export const useDeleteKPI = () => {
  const query = useQueryClient();
  return useCustomMutation<
    null,
    {
      kpi_name: string;
      therapy_area: string;
      region: string;
      distribution_model: string;
      subject_area: string;
    },
    null
  >({
    method: "DELETE",

    apiRoute: "/api/kpi/deleteCustomKPI",
    onSuccess: () => {
      query.refetchQueries({
        queryKey: ["kpi"],
      });
    },
  });
};

export const useEditCustomKPI = () => {
  const query = useQueryClient();
  return useCustomMutation<
    null,
    {
      kpi_name: string;
      therapy_area: string;
      region: string;
      new_description: string;
      distribution_model: string;
      subject_area: string;
    }
  >({
    method: "PUT",
    apiRoute: "/api/kpi/editCustomKPI",
    onSuccess: () => {
      query.refetchQueries({
        queryKey: ["kpi"],
      });
    },
  });
};
