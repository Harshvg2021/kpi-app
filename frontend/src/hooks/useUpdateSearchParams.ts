"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const useUpdateSearchParams = (returnValue?: boolean) => {
  const search = useSearchParams();
  const router = useRouter();
  const mutate = useCallback(
    (name: string, value?: string | number, pathName?: string) => {
      const params = new URLSearchParams(search.toString());
      if (value) params.set(name, String(value));
      else params.delete(name);
      if (!returnValue) {
        if (pathName) router.push(`/${pathName}?${params.toString()}`);
        router.push(`?${params.toString()}`, { scroll: false });
      } else {
        if (pathName) return `/${pathName}?${params.toString()}`;
        return `?${params.toString()}`;
      }
    },
    [search, router, returnValue]
  );

  return mutate;
};

export default useUpdateSearchParams;
