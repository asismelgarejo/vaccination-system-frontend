import { createContext, useState, useContext } from "react";

const SteppersetterContext = createContext({
  setActiveStep: (num: number) => {},
  activeStep: 0,
});

interface ISteppersetterProviderProps {
  children: React.ReactNode;
}

export const SteppersetterProvider: React.FC<ISteppersetterProviderProps> = ({
  children,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <SteppersetterContext.Provider value={{ activeStep, setActiveStep }}>
      {children}
    </SteppersetterContext.Provider>
  );
};

export const useSteppersetter = () => {
  const { activeStep, setActiveStep } = useContext(SteppersetterContext);
  return { activeStep, setActiveStep };
};
