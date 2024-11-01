import { useFetch } from "../useFetch";

export const useGetTherapyArea = () => {
  return useFetch("/api/kpi/getTherapyAreas");
};

export const useGetDistributionModels = () => {
  return useFetch("/api/kpi/getDistributionModels");
};

export const useGetRegions = () => {
  return useFetch("/api/kpi/getRegions");
};

export const useSubjectAreas = () => {
  return useFetch("/api/kpi/getSubjectAreas");
};
