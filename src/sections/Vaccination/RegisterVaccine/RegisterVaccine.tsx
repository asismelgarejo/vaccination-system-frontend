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
import { format, differenceInCalendarYears } from "date-fns";
import Swal from "sweetalert2";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import esLocale from "date-fns/locale/es";
import { Controller, useForm } from "react-hook-form";
import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useState } from "react";
import { useTabsetter } from "../../../contexts/Tabsetter.context";
import { IMaskInput } from "react-imask";
import React from "react";
import {
  DOSES,
  RISK_FACTORS,
  VACCINATION_CENTERS,
} from "../../../mockups/data";
import { FAKE_SERVICE } from "../../../mockups/service";
import { RULES } from "../../../toolbox/constants/rules";
import { useCitizen } from "../../../contexts/Citizen.context";

const StyledTextField = (props: TextFieldProps) => (
  <TextField {...props} size="small" fullWidth />
);

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
interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}
const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
  (props, ref: any) => {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="#00 000 000"
        definitions={{
          "#": /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

export const RegisterVaccine = () => {
  const [loading, setLoading] = useState(false);
  const { citizen } = useCitizen();

  const { setTabIndex } = useTabsetter();
  const age = differenceInCalendarYears(new Date(), new Date(citizen?.birthday as string));
  const citizenDoses = citizen?.vaccines.map((vaccine) => vaccine.dose.id) as string[];
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cellphone: "",
      dose: DOSES[0],
      fcDose: new Date(),
      vc: null,
      riskFactors: ["1"],
    },
  });
  const successSumit = async (data: any) => {
    setLoading(true);
    await FAKE_SERVICE();
    setLoading(false);
    console.log("data", data);
    Swal.fire({
      title: "Datos guardados exitosamente!",
      icon: "success",
      confirmButtonText: "Aceptar",
      preConfirm() {
        setTabIndex(1);
      },
    });
  };

  const onSubmit = handleSubmit(
    (data) => successSumit(data),
    (data) => {
      console.log(">>data", data);
    }
  );
  useEffect(() => {
    const dose = DOSES.find((dose) => !citizenDoses.includes(dose.id));
    setValue("dose", dose as { id: string; name: string });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue]);
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
            defaultValue={citizen?.dni}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
        <Box sx={{ gridColumn: "1 / span 2" }}>
          <FormLabel component="p">AP. Paterno</FormLabel>
          <StyledTextField
            defaultValue={citizen?.fr_lastname}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
        <Box sx={{ gridColumn: "3 / span 2" }}>
          <FormLabel component="p">AP. Materno</FormLabel>
          <StyledTextField
            defaultValue={citizen?.mr_lastname}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
        <Box sx={{ gridColumn: "5 / span 2" }}>
          <FormLabel component="p">Nombres</FormLabel>
          <StyledTextField
            defaultValue={citizen?.names}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
        <Box sx={{ gridColumn: "1 / span 2" }}>
          <FormLabel component="p">Sexo</FormLabel>
          <RadioGroup row>
            <FormControlLabel
              control={
                <Radio
                  checked={citizen?.gender === "M"}
                  inputProps={{
                    readOnly: true,
                  }}
                />
              }
              label="Masculino"
            />
            <FormControlLabel
              control={
                <Radio
                  checked={citizen?.gender === "F"}
                  inputProps={{
                    readOnly: true,
                  }}
                />
              }
              label="Femenino"
            />
          </RadioGroup>
        </Box>
        <Box sx={{ gridColumn: "3 / span 2" }}>
          <FormLabel component="p">Edad</FormLabel>
          <StyledTextField
            defaultValue={`${age} ${age > 1 ? "años" : "año"}`}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
        <Box sx={{ gridColumn: "5 / span 2" }}>
          <FormLabel component="p">Fecha de nacimiento</FormLabel>
          <StyledTextField
            defaultValue={format(
              new Date(citizen?.birthday as string),
              "dd/MM/yyyy"
            )}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
        <Box sx={{ gridColumn: "1 / span 2" }}>
          <FormLabel component="p">Celular</FormLabel>
          <Controller
            control={control}
            rules={RULES}
            name="cellphone"
            render={({ field: { onChange, value } }) => (
              <StyledTextField
                value={value}
                onChange={onChange}
                autoFocus
                name="textmask"
                id="formatted-text-mask-input"
                InputProps={{
                  inputComponent: TextMaskCustom as any,
                }}
                error={Boolean(errors["cellphone"])}
              />
            )}
          />
        </Box>
        <Box sx={{ gridColumn: "3 / -1" }}>
          <FormLabel component="p">Dirección</FormLabel>
          <StyledTextField
            defaultValue={citizen?.address}
            InputProps={{
              readOnly: true,
            }}
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
            rules={RULES}
            name="dose"
            render={({ field: { onChange, value } }) => (
              <StyledTextField
                inputProps={{ readOnly: true }}
                select
                onChange={(event) => {
                  const ID = event?.target?.value ?? null;
                  const selectedOpt = ID
                    ? DOSES.find((opt) => opt.id === ID)
                    : DOSES[0];
                  setValue("dose", selectedOpt as { id: string; name: string });
                }}
                value={value.id}
                error={Boolean(errors["dose"])}
              >
                {DOSES.map((dose) => (
                  <MenuItem
                    key={dose.id}
                    value={dose.id}
                    disabled={citizenDoses.includes(dose.id)}
                  >
                    {dose.name}
                  </MenuItem>
                ))}
              </StyledTextField>
            )}
          />
        </Box>
        <Box sx={{ gridColumn: "2 / span 2" }}>
          <FormLabel component="p">Fecha dosis</FormLabel>
          <Controller
            control={control}
            name="fcDose"
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                locale={esLocale}
              >
                <DatePicker
                  value={value}
                  onChange={(newValue) => {
                    setValue("fcDose", newValue as Date);
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
            rules={RULES}
            name="vc"
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                disablePortal
                value={value}
                getOptionLabel={(v_c) => v_c.name}
                options={VACCINATION_CENTERS}
                onChange={(e, option) => {
                  setValue("vc", option as any);
                }}
                renderInput={(params) => (
                  <StyledTextField {...params} error={Boolean(errors["vc"])} />
                )}
              />
            )}
          />
        </Box>
        <Box sx={{ gridColumn: "1 / -1" }}>
          <FormLabel component="p">Factor de riesgo</FormLabel>
          <Controller
            control={control}
            rules={RULES}
            name="riskFactors"
            render={({ field: { onChange, value } }) => (
              <FormGroup aria-label="position" row>
                {RISK_FACTORS.map((r_f) => (
                  <FormControlLabel
                    checked={value.includes(r_f.id)}
                    key={r_f.id}
                    control={<Checkbox />}
                    label={r_f.name}
                    onChange={(event: any) => {
                      let rsfs = getValues("riskFactors");
                      const checked = event.target!.checked;
                      if (!checked) {
                        rsfs = rsfs.filter((idrf) => idrf !== r_f.id);
                      } else {
                        rsfs.push(r_f.id);
                      }
                      setValue("riskFactors", rsfs);
                    }}
                    labelPlacement="end"
                  />
                ))}
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
