import React, { useEffect } from "react";
import SummarizeIcon from "@mui/icons-material/Summarize";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import { CustomTabs } from "../../components/CustomTabs";
import { Vaccination } from "../../sections/Vaccination";
import { Report } from "../../sections/Report";
import { MainLayout } from "../../layouts/MainLayout";
import {
  useRefreshContextMe,
  useUserLogged,
} from "../../contexts/UserLogged.context";
import { useQuery } from "@apollo/client";
import { GetAllDoses, GetAllRFs, GetAllVCs } from "../../api/graphql/generic";
const TABS = [
  { label: "Vacunación", icon: <VaccinesIcon /> },
  { label: "Reporte", icon: <SummarizeIcon /> },
];
export const Home = () => {
  const { userLogged } = useUserLogged();
  const isAutorized = !!userLogged;
  const { execMe } = useRefreshContextMe();
  useQuery(GetAllRFs);
  useQuery(GetAllVCs);
  useQuery(GetAllDoses);
  useEffect(() => {
    execMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
