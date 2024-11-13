import { useLocalStorage } from "@/hooks/usePersistenceStorage";
import React, { createContext, useContext, useState, ReactNode } from "react";

type DataSourceType = { 
  title: string;
  description: string;
  category?: string;
  isCustom: boolean;
};

interface SelectedListContextType {
  selectedList: DataSourceType[];
  addToList: (report: DataSourceType) => void;
  selectSubjectArea: (subject: string) => void;
  removeFromList: (report: DataSourceType) => void;
  options: reportOptions | undefined;
}

// Create the context with a default value of null
const SelectedListContext = createContext<SelectedListContextType | undefined>(
  undefined
);

type reportOptions = {
  subjectArea: string;
};

// Provider component
export const SelectedReportProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [selectedList, setSelectedList] = useState<DataSourceType[]>([]);
  const [options, setOptions] = useLocalStorage<reportOptions>(
    "report-options",
    {
      subjectArea: "",
    }
  );

  const addToList = (report: DataSourceType) => {
    setSelectedList((prevList) => [...prevList, report]);
  };

  const selectSubjectArea = (subjectArea: string) => {
    setOptions({ ...options, subjectArea: subjectArea });
  };

  const removeFromList = (report: DataSourceType) => {
    setSelectedList((prevList) =>
      prevList.filter((item) => item.title !== report.title)
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
export const useReportList = (): SelectedListContextType => {
  const context = useContext(SelectedListContext);
  if (!context) {
    throw new Error(
      "useSelectedList must be used within a SelectedListProvider"
    );
  }
  return context;
};
