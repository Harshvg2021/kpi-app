import { useFetchByPost } from "../useFetch";

export type GetDataSource = {
  therapyArea?: string;
  region?: string;
  distributionModel?: string;
  subjectArea?: string;
};

export type DataSourceResponse = {
  id: string;
  items: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    description: string;
  }[];
} | null;
export const useGetDataSource = (props: GetDataSource) => {
  return useFetchByPost<DataSourceResponse>(
    "/api/datasource/getDataSources",
    ["datasource", JSON.stringify(props)],
    props
  );
};
