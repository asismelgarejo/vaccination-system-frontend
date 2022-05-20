import React, { useState } from "react";
import { Box } from "@mui/material";
import { CustomStepper } from "../../components/CustomStepper";
import StorageIcon from "@mui/icons-material/Storage";
import PersonIcon from "@mui/icons-material/Person";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { QueryForm } from "./QueryForm";
import { VaccinationCard } from "./VaccinationCard";
import { ButtonsHeader } from "./ButtonsHeader";
import { RegisterVaccine } from "./RegisterVaccine";
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

export const Vaccination = () => {
  const [activeStep, setActiveStep] = useState(0);
  const Views = [
    <QueryForm setActiveStep={setActiveStep} />,
    <VaccinationCard />,
    <RegisterVaccine />,
  ];
  const view = Views[activeStep];
  return (
    <Box>
      <CustomStepper steps={steps} activeStep={activeStep} />
      <Box sx={{ maxWidth: "75%", margin: "0 auto" }}>
        <br />
        {activeStep !== 0 && (
          <ButtonsHeader
            setActiveStep={setActiveStep}
            hideNextButton={Views.length - 1 === activeStep}
          />
        )}
        <br />
        {view}
      </Box>
    </Box>
  );
};
