import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IVaccineModel } from "../../api/models/general";
import { differenceInCalendarYears } from "date-fns";

function formatVaccine(vaccine: IVaccineModel) {
  const f_names = `${vaccine.citizen.fr_lastname} ${vaccine.citizen.mr_lastname} ${vaccine.citizen.names}`;
  const f_birthday = vaccine.citizen.birthday;
  const f_dose = vaccine.fc_dosis;
  const age = differenceInCalendarYears(
    new Date(),
    new Date(vaccine.citizen.birthday)
  );
  const riskFactors = vaccine.riskFactors
    .reduce((prev, next) => prev + ", " + next.name, "")
    .slice(2);
  return {
    dni: vaccine.citizen.dni,
    names: f_names,
    gender: vaccine.citizen.gender,
    birthday: f_birthday,
    cellphone: vaccine.ref_cel_number,
    vc: vaccine.vc.name,
    f_dose,
    dose: vaccine.dose.name,
    age,
    riskFactors,
  };
}

interface ICustomTableProps {
  vaccines: IVaccineModel[];
}

export const CustomTable: React.FC<ICustomTableProps> = (props) => {
  const rows = props.vaccines.map((vaccine) => formatVaccine(vaccine));
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>DNI</TableCell>
            <TableCell>Apellidos y nombres</TableCell>
            <TableCell>Edad</TableCell>
            <TableCell>Sexo</TableCell>
            <TableCell>Fecha de nacimiento</TableCell>
            <TableCell>Celular</TableCell>
            <TableCell>Dosis</TableCell>
            <TableCell>Fecha de dosis</TableCell>
            <TableCell>Centro de vacunación</TableCell>
            <TableCell>Factor de riesgo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.dni}
              </TableCell>
              <TableCell>{row.names}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell align="center">{row.gender}</TableCell>
              <TableCell>{row.birthday}</TableCell>
              <TableCell>{row.cellphone}</TableCell>
              <TableCell>{row.dose}</TableCell>
              <TableCell>{row.f_dose}</TableCell>
              <TableCell>{row.vc}</TableCell>
              <TableCell>{row.riskFactors}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
