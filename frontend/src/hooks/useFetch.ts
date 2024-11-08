"use client";
import AxiosClient from "@/config/axiosClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "./useSession";

export type FetchOptions = {
  enabled?: boolean;
  placeholderData?: any;
  retry?: number;
};

export function useFetch<T>(apiRoute: string, queryKey?: string) {
  const { status } = useSession();
  const query = useQuery({
    queryKey: [queryKey || apiRoute],
    queryFn: async (): Promise<T> => {
      const response = await AxiosClient.axios.get(`${apiRoute}`, {
        headers: {
          authorization: `Bearer ${AxiosClient.accessToken}`,
        },
      });
      return response.data;
    },

    placeholderData: (prev) => prev,
    retry: 1,
    enabled: status == "authenticated" || status == "unauthenticated",
  });
  return query;
}

export function useFetchByPost<T>(
  apiRoute: string,
  queryKey?: string[],
  body?: object
) {
  const { status } = useSession();
  const query = useQuery({
    queryKey: queryKey || [apiRoute],
    queryFn: async (): Promise<T> => {
      const response = await AxiosClient.axios.post(`${apiRoute}`, {
        ...body,
        headers: {
          authorization: `Bearer ${AxiosClient.accessToken}`,
        },
      });
      return response.data;
    },

    placeholderData: (prev) => prev,
    retry: 1,
    enabled: status == "authenticated" || status == "unauthenticated",
  });
  return query;
}

type useCustomMutationType = {
  apiRoute: string;
  queryKey?: string;
  body?: object;
  onSuccess?: () => void;
};

