import { useQueryClient } from "@tanstack/react-query";
import { useFetch, useFetchByPost } from "../useFetch";
import { useCustomMutation } from "../useCustomMutation";

export type GetUseCase = {
  therapyAreaName?: string;
  regionName?: string;
  distributionModelName?: string;
  subjectAreaName?: string;
};

export type FetchUseCases = {
  standardUseCases: {
    category: string;
    description: string;
  }[];
  customUseCases: {
    category: string;
    description: string;
  }[];
};

export const useGetUseCase = (props: GetUseCase) => {
  return useFetchByPost<FetchUseCases>(
    "/api/use-case/getUseCases",
    ["use-case", JSON.stringify(props)],
    props
  );
};

export type CreateUseCases = {
  therapyAreaName?: string;
  regionName?: string;
  distributionModelName?: string;
  subjectAreaName?: string;
};

export type CreateUseCaseMutate = {
  description: string;
};

export const useCreateUseCases = (props: GetUseCase) => {
  const client = useQueryClient();
  const refetch = JSON.stringify(props);
  return useCustomMutation<CreateUseCases, CreateUseCaseMutate, null>({
    apiRoute: "/api/use-case/addUseCase",
    body: props,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["use-case"],
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
