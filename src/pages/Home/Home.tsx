import React from "react";
import SummarizeIcon from "@mui/icons-material/Summarize";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import { CustomTabs } from "../../components/CustomTabs";
import { Vaccination } from "../../sections/Vaccination";
import { Report } from "../../sections/Report";
import { MainLayout } from "../../layouts/MainLayout";
import { useUserLogged } from "../../contexts/UserLogged.context";
const TABS = [
  { label: "Vacunación", icon: <VaccinesIcon /> },
  { label: "Reporte", icon: <SummarizeIcon /> },
];
export const Home = () => {
  const { userLogged } = useUserLogged();
  const isAutorized = userLogged !== "";

  return (
    <MainLayout>
      <CustomTabs
        disabledTab={!isAutorized ? 1 : null}
        tabs={TABS}
        content={[<Vaccination isAutorized={isAutorized} />, <Report />]}
      />
    </MainLayout>
  );
};
