"use client";
import AxiosClient from "@/config/axiosClient";
import { useQuery } from "@tanstack/react-query";
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
