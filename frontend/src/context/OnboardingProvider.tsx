import { useLocalStorage } from "@/hooks/usePersistenceStorage";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type OnboardingType = {
  therapyArea?: string;
  region?: string;
  distributionModel?: string;
};

interface OnboardingContextType {
  selectTherapy: (therapy: string) => void;
  selectRegion: (therapy: string) => void;
  clearOnboarding: () => void;
  selectDistribution: (therapy: string) => void;
  selectedOnboarding: OnboardingType | undefined;
  isOnboarded: boolean;
  currentRoute: string;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedOnboarding, setSelectedOnboarding] =
    useLocalStorage<OnboardingType>("onboarding", {
      distributionModel: "",
      region: "",
      therapyArea: "",
    });

  const selectRegion = (region: string) => {
    setSelectedOnboarding((prevList) => ({ ...prevList, region: region }));
  };
  const selectDistribution = (region: string) => {
    setSelectedOnboarding((prevList) => ({
      ...prevList,
      distributionModel: region,
    }));
  };
  const selectTherapy = (region: string) => {
    setSelectedOnboarding((prevList) => ({ ...prevList, therapyArea: region }));
  };

  const clearOnboarding = () => {
    setSelectedOnboarding((prevList) => ({
      ...prevList,
      region: "",
      distributionModel: "",
      therapyArea: "",
    }));
  };

  const [currentRoute, setCurrentRoute] = useState("/onboarding");
  const [isOnboarded, setIsOnboarded] = useState(
    selectedOnboarding?.distributionModel &&
      selectedOnboarding?.region &&
      selectedOnboarding?.therapyArea
      ? true
      : false
  );

  useEffect(() => {
    if (
      selectedOnboarding?.distributionModel &&
      selectedOnboarding?.region &&
      selectedOnboarding?.therapyArea
    ) {
      setIsOnboarded(true);
      setCurrentRoute("/dashboard");
    } else {
      setIsOnboarded(false);
      if (!selectedOnboarding?.therapyArea) {
        setCurrentRoute("/onboarding/therapy");
      } else if (!selectedOnboarding?.region) {
        setCurrentRoute("/onboarding/region");
      } else if (!selectedOnboarding?.distributionModel) {
        setCurrentRoute("/onboarding/distribution");
      } else {
        setCurrentRoute("/dashboard");
      }
    }
  }, [selectedOnboarding]);

  return (
    <OnboardingContext.Provider
      value={{
        isOnboarded: isOnboarded,
        selectDistribution,
        currentRoute,
        selectRegion,
        selectTherapy,
        selectedOnboarding,
        clearOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = (): OnboardingContextType => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error(
      "useSelectedList must be used within a SelectedListProvider"
    );
  }
  return context;
};
