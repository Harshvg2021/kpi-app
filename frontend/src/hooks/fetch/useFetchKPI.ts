import { useQueryClient } from "@tanstack/react-query";
import { useFetch, useFetchByPost } from "../useFetch";
import { useCustomMutation } from "../useCustomMutation";

export const useGetTherapyArea = () => {
  return useFetch<{ name: string; id: string }[]>("/api/kpi/getTherapyAreas");
};

export const useGetDistributionModels = () => {
  return useFetch<{ name: string; id: string }[]>(
    "/api/kpi/getDistributionModels"
  );
};

export const useGetRegions = () => {
  return useFetch<{ name: string; id: string }[]>("/api/kpi/getRegions");
};

export const useSubjectAreas = () => {
  return useFetch<{ name: string; id: string }[]>("/api/kpi/getSubjectAreas");
};

export const useCategories = () => {
  return useFetch<{ name: string; id: string }[]>("/api/kpi/getCategories");
};

export type GetKPIs = {
  therapy_area?: string;
  region?: string;
  distribution_model?: string;
  subject_area?: string;
};

export type FetchKPIs = {
  data: {
    customKPI: {
      kpiLists: {
        id: string;
        title: string;
        description: string;
        categoryName: string;
      }[];
      _count: {
        kpiLists: number;
      };
    } | null;
  };
};

export const useGetKPIS = (props: GetKPIs) => {
  return useFetchByPost<FetchKPIs>(
    "/api/kpi/getKPIs",
    ["kpi", JSON.stringify(props)],
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
  return useCustomMutation<CreateKPIs, createKPIMutate, null>({
    apiRoute: "/api/kpi/addCustomKPI",
    body: props,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["kpi"],
      });
    },
  });
};

export const useCreateManyKPI = (props: GetKPIs) => {
  const client = useQueryClient();
  const refetch = JSON.stringify(props);
  return useCustomMutation<CreateKPIs, { kpiList: createKPIMutate[] }, null>({
    apiRoute: "/api/kpi/addManyCustomKPIs",
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
      KPIListId: string;
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
      title: string;
      description: string;
      kpiListId: string;
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
