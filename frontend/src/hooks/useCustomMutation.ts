import AxiosClient from "@/config/axiosClient";
import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";

type useCustomMutationType = {
  apiRoute: string;
  queryKey?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: object;
  onSuccess?: () => void;
};
export function useCustomMutation<T, K, SP extends Record<string, any> | null>(
  props: useCustomMutationType
) {
  const query = useMutation({
    mutationKey: [props.queryKey || props.apiRoute],
    mutationFn: async ({
      mutationBody,
      mutationSearchParams,
      mutationParams,
    }: {
      mutationBody?: K;
      mutationParams?: string;
      mutationSearchParams?: SP;
    }): Promise<T> => {
      const search = new URLSearchParams(mutationSearchParams??{});
      const config: AxiosRequestConfig = {
        method: props.method || "POST",
        url: mutationParams
          ? `${props.apiRoute}/${mutationParams}?${search.toString()}`
          : `${props.apiRoute}?${search.toString()}`,
        headers: {
          Authorization: `Bearer ${AxiosClient.accessToken}`,
        },
        data: {
          ...props.body,
          ...mutationBody,
          headers: {
            authorization: `Bearer ${AxiosClient.accessToken}`,
          },
        },
      };
      const response = await AxiosClient.axios.request(config);
      return response.data;
    },
    onSuccess: props.onSuccess,
    retry: 1,
  });
  return query;
}
