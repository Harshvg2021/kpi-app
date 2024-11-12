import { useLocalStorage } from "@/hooks/usePersistenceStorage";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { string } from "zod";

type DataSourceType = { name: string; description: string };

interface SelectedListContextType {
  selectedList: DataSourceType[];
  addToList: (kpi: DataSourceType) => void;
  selectSubjectArea: (subject: string) => void;
  removeFromList: (kpi: DataSourceType) => void;
  options: KpiOptions | undefined;
}

// Create the context with a default value of null
const SelectedListContext = createContext<SelectedListContextType | undefined>(
  undefined
);

type KpiOptions = {
  subjectArea: string;
};

// Provider component
export const SelectedDataSourceListProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedList, setSelectedList] = useState<DataSourceType[]>([]);
  const [options, setOptions] = useLocalStorage<KpiOptions>("kpi-options", {
    subjectArea: "",
  });

  const addToList = (kpi: DataSourceType) => {
    setSelectedList((prevList) => [...prevList, kpi]);
  };

  const selectSubjectArea = (subjectArea: string) => {
    setOptions({ ...options, subjectArea: subjectArea });
  };

  const removeFromList = (kpi: DataSourceType) => {
    setSelectedList((prevList) =>
      prevList.filter((item) => item.name !== kpi.name)
    );
  };

  return (
    <SelectedListContext.Provider
      value={{
        selectedList,
        options,
        selectSubjectArea,
        addToList,
        removeFromList,
      }}
    >
      {children}
    </SelectedListContext.Provider>
  );
};

// Custom hook for easier usage
export const useDataSourceList = (): SelectedListContextType => {
  const context = useContext(SelectedListContext);
  if (!context) {
    throw new Error(
      "useSelectedList must be used within a SelectedListProvider"
    );
  }
  return context;
};
