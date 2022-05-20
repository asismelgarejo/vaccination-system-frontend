import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import esLocale from "date-fns/locale/es";
import { Controller, useForm } from "react-hook-form";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";
import { useTabsetter } from "../../../contexts/Tabsetter.context";

// MOCKUP
const VaccinationCenters = [{ label: "Hospital Regional de Huacho" }];
const StyledTextField = (props: TextFieldProps) => (
  <TextField {...props} size="small" fullWidth />
);

const FAKE_SERVICE = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("success");
    }, 1000);
  });
};

const RULES = {
  required: {
    value: true,
    message: "Debe completar el campo",
  },
};

const USER = {
  dni: "75958725",
  frLastname: "Melgarejo",
  mrLastname: "Lopez",
  names: "Asis",
  gender: { id: "1", name: "M" },
  birthday: new Date(2001, 1, 16),
  address: "Santa Catalina Barranca",
};

const fieldsetStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(6, 1fr)",
  gridTemplateRow: "repeat(4, auto)",
  columnGap: "1em",
  rowGap: "1em",
  border: "1px solid #AEAEAE",
  boxSizing: "border-box",
  padding: "1em",
  position: "relative",
};
export const RegisterVaccine = () => {
  const [loading, setLoading] = useState(false);
  const { setTabIndex } = useTabsetter();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cellphone: "",
      dose: null,
      fcDose: new Date(),
      vc: {},
      riskFactors: [null],
    },
  });
  const successSumit = async (data: any) => {
    setLoading(true);
    await FAKE_SERVICE();
    setLoading(false);
    alert("Datos guardados exitosamente!");
    setTabIndex(1);
  };

  const onSubmit = handleSubmit(
    (data) => successSumit(data),
    (data) => {
      console.log(">>data", data);
    }
  );
  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column" }}
      onSubmit={onSubmit}
    >
      <Box sx={fieldsetStyles}>
        <Box
          sx={{
            position: "absolute",
            backgroundColor: "white",
            top: "-0.9em",
            left: "1em",
            padding: "0 .4em",
          }}
        >
          <Typography variant="subtitle1" component="div">
            Datos del paciente
          </Typography>
        </Box>
        <Box sx={{ gridColumn: "1 / 2" }}>
          <FormLabel component="p">DNI</FormLabel>
          <StyledTextField
            value={USER.dni}
            inputProps={{ readonly: true, disable: true }}
          />
        </Box>
        <Box sx={{ gridColumn: "1 / span 2" }}>
          <FormLabel component="p">AP. Paterno</FormLabel>
          <StyledTextField
            value={USER.frLastname}
            inputProps={{ readonly: true, disable: true }}
          />
        </Box>
        <Box sx={{ gridColumn: "3 / span 2" }}>
          <FormLabel component="p">AP. Materno</FormLabel>
          <StyledTextField
            value={USER.mrLastname}
            inputProps={{ readonly: true, disable: true }}
          />
        </Box>
        <Box sx={{ gridColumn: "5 / span 2" }}>
          <FormLabel component="p">Nombres</FormLabel>
          <StyledTextField
            value={USER.names}
            inputProps={{ readonly: true, disable: true }}
          />
        </Box>
        <Box sx={{ gridColumn: "1 / span 2" }}>
          <FormLabel component="p">Sexo</FormLabel>
          <RadioGroup row>
            <FormControlLabel
              control={<Radio checked={USER.gender.name === "M"} />}
              label="Masculino"
            />
            <FormControlLabel
              control={<Radio checked={USER.gender.name === "F"} />}
              label="Femenino"
            />
          </RadioGroup>
        </Box>
        <Box sx={{ gridColumn: "3 / span 2" }}>
          <FormLabel component="p">Edad</FormLabel>
          <StyledTextField
            value={`${USER.birthday.toLocaleString()} años`}
            inputProps={{ readonly: true }}
          />
        </Box>
        <Box sx={{ gridColumn: "5 / span 2" }}>
          <FormLabel component="p">Fecha de nacimiento</FormLabel>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
            <DatePicker
              openTo="year"
              views={["year", "month", "day"]}
              value={USER.birthday}
              onChange={() => {
                // setValue("birthday", newValue as Date);
              }}
              renderInput={(params) => (
                <StyledTextField
                  {...params}
                  inputProps={{ readonly: true, disable: true }}
                />
              )}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ gridColumn: "1 / span 2" }}>
          <FormLabel component="p">Celular</FormLabel>
          <Controller
            control={control}
            rules={RULES}
            name="cellphone"
            render={({ field: { onChange, value } }) => (
              <StyledTextField
                onChange={onChange}
                value={value}
                error={Boolean(errors["cellphone"])}
              />
            )}
          />
        </Box>
        <Box sx={{ gridColumn: "3 / -1" }}>
          <FormLabel component="p">Dirección</FormLabel>
          <StyledTextField
            value={USER.address}
            inputProps={{ readonly: true, disable: true }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          ...fieldsetStyles,
          marginTop: "1em",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            backgroundColor: "white",
            top: "-0.9em",
            left: "1em",
            padding: "0 .4em",
          }}
        >
          <Typography variant="subtitle1" component="div">
            Datos específicos
          </Typography>
        </Box>
        <Box sx={{ gridColumn: "1 / 2" }}>
          <FormLabel component="p">Dosis</FormLabel>
          <Controller
            control={control}
            // rules={RULES}
            name="dose"
            render={({ field: { onChange, value } }) => (
              <StyledTextField
                inputProps={{ readonly: true, disable: true }}
                select
                onChange={onChange}
                value={value}
                error={Boolean(errors["dose"])}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </StyledTextField>
            )}
          />
        </Box>
        <Box sx={{ gridColumn: "2 / span 2" }}>
          <FormLabel component="p">Fecha dosis</FormLabel>
          <Controller
            control={control}
            // rules={RULES}
            name="fcDose"
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                locale={esLocale}
              >
                <DatePicker
                  openTo="year"
                  views={["year", "month", "day"]}
                  value={new Date()}
                  onChange={(newValue) => {
                    // setValue("birthday", newValue as Date);
                  }}
                  renderInput={(params) => (
                    <StyledTextField
                      {...params}
                      onChange={onChange}
                      value={value}
                      error={Boolean(errors["fcDose"])}
                    />
                  )}
                />
              </LocalizationProvider>
            )}
          />
        </Box>
        <Box sx={{ gridColumn: "4 / -1" }}>
          <FormLabel component="p">Centro de vacunación</FormLabel>
          <Controller
            control={control}
            // rules={RULES}
            name="vc"
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                disablePortal
                options={VaccinationCenters}
                renderInput={(params) => (
                  <StyledTextField
                    {...params}
                    // onChange={onChange}
                    value={value}
                    // error={Boolean(errors["vc"])}
                  />
                )}
              />
            )}
          />
        </Box>
        <Box sx={{ gridColumn: "1 / -1" }}>
          <FormLabel component="p">Factor de riesgo</FormLabel>
          <Controller
            control={control}
            // rules={RULES}
            name="riskFactors"
            render={({ field: { onChange, value } }) => (
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  value="end"
                  control={<Checkbox />}
                  label="Normal"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="end"
                  control={<Checkbox />}
                  label="80 +"
                  labelPlacement="end"
                />
              </FormGroup>
            )}
          />
        </Box>
      </Box>
      <br />
      <Button
        variant="contained"
        type="submit"
        disabled={loading}
        startIcon={
          loading ? (
            <CircularProgress size={20} color="secondary" />
          ) : (
            <SaveIcon />
          )
        }
        sx={{ marginLeft: "auto" }}
      >
        Guardar
      </Button>
    </Box>
  );
};
