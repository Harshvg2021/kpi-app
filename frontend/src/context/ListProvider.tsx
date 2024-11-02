import React, { createContext, useContext, useState, ReactNode } from "react";

type KpiType = { title: string; description: string };

interface SelectedListContextType {
  selectedList: KpiType[];
  addToList: (kpi: KpiType) => void;
  removeFromList: (kpi: KpiType) => void;
}

// Create the context with a default value of null
const SelectedListContext = createContext<SelectedListContextType | undefined>(
  undefined
);

// Provider component
export const SelectedListProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedList, setSelectedList] = useState<KpiType[]>([]);

  const addToList = (kpi: KpiType) => {
    setSelectedList((prevList) => [...prevList, kpi]);
  };

  const removeFromList = (kpi: KpiType) => {
    setSelectedList((prevList) =>
      prevList.filter((item) => item.title !== kpi.title)
    );
  };

  return (
    <SelectedListContext.Provider
      value={{ selectedList, addToList, removeFromList }}
    >
      {children}
    </SelectedListContext.Provider>
  );
};

// Custom hook for easier usage
export const useSelectedList = (): SelectedListContextType => {
  const context = useContext(SelectedListContext);
  if (!context) {
    throw new Error(
      "useSelectedList must be used within a SelectedListProvider"
    );
  }
  return context;
};
