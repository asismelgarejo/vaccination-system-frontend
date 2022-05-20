import { createContext, useState, useContext } from "react";

const TabsetterContext = createContext({
  setTabIndex: (num: number) => {},
  tabIndex: 0,
});

interface ITabsetterProviderProps {
  children: React.ReactNode;
}

export const TabsetterProvider: React.FC<ITabsetterProviderProps> = ({
  children,
}) => {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <TabsetterContext.Provider value={{ tabIndex, setTabIndex }}>
      {children}
    </TabsetterContext.Provider>
  );
};

export const useTabsetter = () => {
  const { tabIndex, setTabIndex } = useContext(TabsetterContext);
  return { tabIndex, setTabIndex };
};
