import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { CustomStepper } from "../../components/CustomStepper";
import StorageIcon from "@mui/icons-material/Storage";
import PersonIcon from "@mui/icons-material/Person";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { QueryForm } from "./QueryForm";
import { VaccinationCard } from "./VaccinationCard";
import { ButtonsHeader } from "./ButtonsHeader";
import { RegisterVaccine } from "./RegisterVaccine";
import { TAutorization } from "../../toolbox/interfaces/interfaces";
import { useCitizen } from "../../contexts/Citizen.context";
import { useSteppersetter } from "../../contexts/Steppersetter.context";
const steps = [
  {
    label: "Consultar",
    icon: <StorageIcon fontSize="small" />,
  },
  {
    label: "Carnet de vacunación",
    icon: <PersonIcon fontSize="small" />,
  },
  {
    label: "Registrar vacuna",
    icon: <MedicalServicesIcon fontSize="small" />,
  },
];

type TVaccinationProps = TAutorization;
export const Vaccination: React.FC<TVaccinationProps> = (props) => {
  const { activeStep, setActiveStep } = useSteppersetter();
  const { setCitizen, citizen } = useCitizen();
  const [hideNextButton, setHideNextButton] = useState(false);
  const Views = [
    <QueryForm
      setActiveStep={setActiveStep as Dispatch<SetStateAction<number>>}
    />,
    <VaccinationCard />,
    <RegisterVaccine />,
  ];
  const view = Views[activeStep];
  const isLastStep = Views.length - 1 <= activeStep
  const authorization = props.isAutorized;

  useEffect(() => {
    const condition = !authorization || isLastStep;
    if (condition) {
      setHideNextButton(true);
      return;
    }
    if (citizen?.vaccines && citizen?.vaccines?.length >= 4) {
      setHideNextButton(true);
      return;
    }
    setHideNextButton(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [citizen]);
  return (
    <Box>
      <CustomStepper steps={steps} activeStep={activeStep} />
      <Box
        sx={{
          maxWidth: "100%",
          "@media screen and (min-width: 600px)": {
            maxWidth: "75%",
            margin: "0 auto",
          },
        }}
      >
        <br />
        {activeStep !== 0 && (
          <ButtonsHeader
            setActiveStep={setActiveStep as Dispatch<SetStateAction<number>>}
            prevAction={() => {
              if (activeStep === 1) {
                setCitizen(null);
              }
            }}
            hideNextButton={hideNextButton || isLastStep}
          />
        )}
        <br />
        {view}
      </Box>
    </Box>
  );
};
