import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData({
  dni,
  names,
  fr_lastname,
  mr_lastname,
  gender,
  birthday,
  cellphone,
  vc,
  age,
  fcDose,
  dose,
  riskFactors,
}: {
  dni: string;
  names: string;
  fr_lastname: string;
  mr_lastname: string;
  age: string;
  dose: string;
  gender: string;
  birthday: Date;
  cellphone: string;
  fcDose: Date;
  vc: string;
  riskFactors: string[];
}) {
  const f_names = `${fr_lastname} ${mr_lastname} ${names}`;
  const f_birthday = birthday.toLocaleDateString();
  const f_dose = fcDose.toLocaleDateString();
  return {
    dni,
    names: f_names,
    gender,
    birthday: f_birthday,
    cellphone,
    vc,
    f_dose,
    dose,
    age,
    riskFactors,
  };
}

const rows = [
  createData({
    dni: "75958725",
    names: "Asis",
    fr_lastname: "Melgarejo",
    mr_lastname: "Lopez",
    gender: "M",
    birthday: new Date(),
    fcDose: new Date(),
    dose: "1ra dosis",
    cellphone: "933414725",
    vc: "Hospital de Barranca",
    riskFactors: ["Normal", "Normal 2"],
    age: "21 años",
  }),
];

export const CustomTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
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
              <TableCell>{row.riskFactors.join(", ")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
