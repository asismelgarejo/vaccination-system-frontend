import React from "react";
import SummarizeIcon from "@mui/icons-material/Summarize";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import { CustomTabs } from "../../components/CustomTabs";
import { Vaccination } from "../../sections/Vaccination";
import { Report } from "../../sections/Report";
import { MainLayout } from "../../layouts/MainLayout";
const TABS = [
  { label: "Vacunación", icon: <VaccinesIcon /> },
  { label: "Reporte", icon: <SummarizeIcon /> },
];
export const Home = () => {
  return (
    <MainLayout>
      <CustomTabs tabs={TABS} content={[<Vaccination />, <Report />]} />
    </MainLayout>
  );
};
