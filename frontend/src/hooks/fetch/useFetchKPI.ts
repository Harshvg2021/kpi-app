import { useQueryClient } from "@tanstack/react-query";
import { useCustomMutation, useFetch, useFetchByPost } from "../useFetch";

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

export type GetKPIs = {
  therapy_area?: string;
  region?: string;
  distribution_model?: string;
  subject_area?: string;
};

export const useGetKPIS = (props: GetKPIs) => {
  return useFetchByPost<{ title: string; description: string }[]>(
    "/api/kpi/getKPIs",
    JSON.stringify(props),
    props
  );
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
  return useCustomMutation<void, createKPIMutate>({
    apiRoute: "/api/kpi/addCustomKPI",
    body: props,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: [refetch],
      });
    },
  });
};
