import { useFetchByPost } from "../useFetch";

export type GetDataSource = {
  therapyArea?: string;
  region?: string;
  distributionModel?: string;
  subjectArea?: string;
};

export type DataSourceResponse = {
  id: string;
  items:
    | {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        vendorList: string[] | null;
      }[]
    | null;
} | null;
export const useGetDataSource = (props: GetDataSource) => {
  return useFetchByPost<DataSourceResponse>(
    "/api/datasource/getDataSources",
    ["datasource", JSON.stringify(props)],
    props
  );
};

export const useGetVendorList = (props: { dataSourceItemId: string }) => {
  return useFetchByPost<{
    name: string;
    vendorList: string[];
  } | null>(
    "/api/datasource/getVendorList",
    ["vendorList", JSON.stringify(props)],
    props
  );
};
