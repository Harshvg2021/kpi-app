import { useLocalStorage } from "@/hooks/usePersistenceStorage";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { string } from "zod";

type KpiType = { title: string; description: string };

interface SelectedListContextType {
  selectedList: KpiType[];
  addToList: (kpi: KpiType) => void;
  selectSubjectArea: (subject: string) => void;
  removeFromList: (kpi: KpiType) => void;
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
export const SelectedKpiListProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedList, setSelectedList] = useState<KpiType[]>([]);
  const [options, setOptions] = useLocalStorage<KpiOptions>("kpi-options", {
    subjectArea: "",
  });

  const addToList = (kpi: KpiType) => {
    setSelectedList((prevList) => [...prevList, kpi]);
  };

  const selectSubjectArea = (subjectArea: string) => {
    setOptions({ ...options, subjectArea: subjectArea });
  };

  const removeFromList = (kpi: KpiType) => {
    setSelectedList((prevList) =>
      prevList.filter((item) => item.title !== kpi.title)
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
export const useKpiList = (): SelectedListContextType => {
  const context = useContext(SelectedListContext);
  if (!context) {
    throw new Error(
      "useSelectedList must be used within a SelectedListProvider"
    );
  }
  return context;
};
