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
    "/api/report/getReports",
    ["report", JSON.stringify(props)],
    props
  );
};

// export type CreateReports = {
//   therapy_area?: string;
//   region?: string;
//   distribution_model?: string;
//   subject_area?: string;
// };

// export type createReportMutate = {
//   report_name: string;
//   report_description: string;
// };

// export const useCreateReport = (props: GetReports) => {
//   const client = useQueryClient();
//   const refetch = JSON.stringify(props);
//   return useCustomMutation<CreateReports, createReportMutate, null>({
//     apiRoute: "/api/report/add",
//     body: props,
//     onSuccess: () => {
//       client.invalidateQueries({
//         queryKey: ["report"],
//       });
//     },
//   });
// };

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
