import React, { useEffect, useRef, useState } from "react";
import { CustomTable } from "../../components/CustomTable";
import { useQuery } from "@apollo/client";
import { GetAllVaccines } from "../../api/graphql/citizen";
import { Box, CircularProgress, Fab } from "@mui/material";
import { IVaccineModel } from "../../api/models/general";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { StatsDialog, ObjStatsDialogRef } from "../../components/StatsDialog";
export const Report = () => {
  const { loading, error, data } = useQuery(GetAllVaccines);
  const [vaccines, setVaccines] = useState<IVaccineModel[] | null>(null);
  const statsDialogRef = useRef<ObjStatsDialogRef>(null);
  useEffect(() => {
    if (data && data.getAllVaccines) {
      setVaccines(data.getAllVaccines);
    }
  }, [data]);
  return (
    <Box
      sx={{
        maxWidth: "calc(84vw)",
      }}
    >
      {vaccines && vaccines?.length > 0 && (
        <Fab
          color="primary"
          variant="extended"
          onClick={() => statsDialogRef && statsDialogRef.current?.showDialog()}
        >
          <QueryStatsIcon />
          Ver estadísticas
        </Fab>
      )}
      <br />
      <br />
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <h1>Error</h1>
      ) : vaccines ? (
        <CustomTable vaccines={vaccines as IVaccineModel[]} />
      ) : null}
      <StatsDialog ref={statsDialogRef} />
    </Box>
  );
};
