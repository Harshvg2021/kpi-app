import { useQueryClient } from "@tanstack/react-query";
import { useFetch, useFetchByPost } from "../useFetch";
import { useCustomMutation } from "../useCustomMutation";

export type GetReports = {
  therapyAreaName?: string;
  regionName?: string;
  distributionModelName?: string;
  subjectAreaName?: string;
};

export type FetchReports = {
  standardReports: {
    name: string;
    category: string;
    description: string;
  }[];
  customReports: {
    name: string;
    category: string;
    description: string;
  }[];
};

export const useGetReport = (props: GetReports) => {
  return useFetchByPost<FetchReports>(
    "/api/reports/getReports",
    ["report", JSON.stringify(props)],
    props
  );
};

export type CreateReports = {
  therapyAreaName?: string;
  regionName?: string;
  distributionModelName?: string;
  subjectAreaName?: string;
};

export type createReportMutate = {
  name: string;
  description: string;
};

export const useCreateReport = (props: GetReports) => {
  const client = useQueryClient();
  const refetch = JSON.stringify(props);
  return useCustomMutation<CreateReports, createReportMutate, null>({
    apiRoute: "/api/reports/addReport",
    body: props,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["report"],
      });
    },
  });
};

// export const useDeleteReport = () => {
//   const query = useQueryClient();
//   return useCustomMutation<
//     null,
//     {
//       reportListId: string;
//     },
//     null
//   >({
//     method: "DELETE",

//     apiRoute: "/api/report/deleteCustomReport",
//     onSuccess: () => {
//       query.refetchQueries({
//         queryKey: ["report"],
//       });
//     },
//   });
// };

// export const useEditCustomReport = () => {
//   const query = useQueryClient();
//   return useCustomMutation<
//     null,
//     {
//       title: string;
//       description: string;
//       reportListId: string;
//     }
//   >({
//     method: "PUT",
//     apiRoute: "/api/report/edit",
//     onSuccess: () => {
//       query.refetchQueries({
//         queryKey: ["report"],
//       });
//     },
//   });
// };