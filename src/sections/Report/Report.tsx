import React, { useEffect, useState } from "react";
import { CustomTable } from "../../components/CustomTable";
import { useQuery } from "@apollo/client";
import { GetAllVaccines } from "../../api/graphql/citizen";
import { Box, CircularProgress } from "@mui/material";
import { IVaccineModel } from "../../api/models/general";

export const Report = () => {
  const { loading, error, data } = useQuery(GetAllVaccines);
  const [vaccines, setVaccines] = useState<IVaccineModel[] | null>(null);

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
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <h1>Error</h1>
      ) : vaccines ? (
        <CustomTable vaccines={vaccines as IVaccineModel[]} />
      ) : null}
    </Box>
  );
};
