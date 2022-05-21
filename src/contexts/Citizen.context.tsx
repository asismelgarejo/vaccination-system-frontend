import { createContext, useState, useContext } from "react";
import { ICitizenModel } from "../api/models/general";

interface IContext {
  setCitizen(num: ICitizenModel | null): void;
  citizen: ICitizenModel | null;
}

const CitizenContext = createContext<IContext>({
  setCitizen: (num: ICitizenModel | null) => {},
  citizen: null,
});

interface ICitizenProviderProps {
  children: React.ReactNode;
}

export const CitizenProvider: React.FC<ICitizenProviderProps> = ({
  children,
}) => {
  const [citizen, setCitizen] = useState<ICitizenModel | null>(null);
  return (
    <CitizenContext.Provider value={{ citizen, setCitizen }}>
      {children}
    </CitizenContext.Provider>
  );
};

export const useCitizen = () => {
  const { citizen, setCitizen } = useContext(CitizenContext);
  return { citizen, setCitizen };
};
