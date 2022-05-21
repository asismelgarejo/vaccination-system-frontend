import React from "react";
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
import { useEffect } from "react";
import { useTabsetter } from "../../../contexts/Tabsetter.context";
import { IMaskInput } from "react-imask";
import { RULES } from "../../../toolbox/constants/rules";
import { useCitizen } from "../../../contexts/Citizen.context";
import { useMutation, useQuery } from "@apollo/client";
import {
  GetAllDoses,
  GetAllRFs,
  GetAllVCs,
} from "../../../api/graphql/generic";
import { ISelectGeneric } from "../../../toolbox/interfaces/interfaces";
import { RegisterVaccineSchema } from "../../../api/graphql/vaccine";
import { useUserLogged } from "../../../contexts/UserLogged.context";
import { GetAllVaccines } from "../../../api/graphql/citizen";

const StyledTextField = (props: TextFieldProps) => (
  <TextField {...props} size="small" fullWidth />
);
const rf_60_69 = ["rf_normal", "rf_70_79", "rf_80_more"];
const rf_70_79 = ["rf_normal", "rf_60_69", "rf_80_more"];
const rf_80_more = ["rf_normal", "rf_60_69", "rf_70_79"];
const fieldsetStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridAutoRows: "auto",
  columnGap: "8px",
  rowGap: "1em",
  border: "1px solid #AEAEAE",
  boxSizing: "border-box",
  padding: "1em",
  position: "relative",
  "@media screen and (min-width: 600px)": {
    gridTemplateColumns: "repeat(6, 1fr)",
    gridTemplateRow: "repeat(4, auto)",
    columnGap: "1em",
  },
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
  const { citizen } = useCitizen();
  const { userLogged } = useUserLogged();
  const { loading: loadingRFs, data: riskFactors } = useQuery(GetAllRFs);
  const { loading: loadingVCs, data: vaccinationCenters } = useQuery(GetAllVCs);
  const { loading: loadingDoses, data: doses } = useQuery(GetAllDoses);
  const [
    execRegisterVaccine,
    { loading: loadingRegister, error: errorVaccineRegister },
  ] = useMutation(RegisterVaccineSchema, {
    refetchQueries: [{ query: GetAllVaccines }],
  });
  const loading = loadingRegister;
  const loader = loadingRFs || loadingVCs || loadingDoses;
  const RISK_FACTORS = riskFactors?.getAllRFs;
  const VACCINATION_CENTERS = vaccinationCenters?.getAllVCs;
  const DOSES = doses?.getAllDoses;
  const { setTabIndex } = useTabsetter();
  const age = differenceInCalendarYears(
    new Date(),
    new Date(citizen?.birthday as string)
  );
  const citizenDoses = citizen?.vaccines.map(
    (vaccine) => vaccine.dose?.id
  ) as string[];
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cellphone: "",
      dose: DOSES ? DOSES[0] : null,
      fcDose: new Date(),
      vc: null,
      riskFactors: ["rf_normal"],
    },
  });
  const successSumit = async (data: any) => {
    try {
      await execRegisterVaccine({
        variables: {
          userId: userLogged?.id,
          doseId: data.dose.id,
          vcId: data.vc.id,
          citizenId: citizen?.id,
          ref_cel_number: data.cellphone.split(" ").join(""),
          fc_dosis: data.fcDose,
          rFactorIds: data.riskFactors,
        },
      });
      Swal.fire({
        title: "Datos guardados exitosamente!",
        icon: "success",
        confirmButtonText: "Aceptar",
        preConfirm() {
          setTabIndex(1);
        },
      });
    } catch (err) {
      Swal.fire({
        title: "Ha ocurrido un error :(",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const onSubmit = handleSubmit(
    (data) => successSumit(data),
    (data) => {}
  );
  useEffect(() => {
    if (DOSES) {
      const dose = DOSES.find(
        (dose: ISelectGeneric) => !citizenDoses.includes(dose.id)
      );
      setValue("dose", dose as ISelectGeneric);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue, DOSES, citizenDoses]);

  useEffect(() => {
    if (errorVaccineRegister) {
      Swal.fire({
        title: "Ha ocurrido un error :(",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  }, [errorVaccineRegister]);

  if (loader || !DOSES || !RISK_FACTORS || !VACCINATION_CENTERS) {
    return <CircularProgress />;
  }
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
        <Box
          sx={{
            gridColumn: "1 / 2",
          }}
        >
          <FormLabel component="p">DNI</FormLabel>
          <StyledTextField
            defaultValue={citizen?.dni}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
        <Box
          sx={{
            gridColumn: "1 / -1",
            "@media screen and (min-width: 600px)": {
              gridColumn: "1 / span 2",
            },
          }}
        >
          <FormLabel component="p">AP. Paterno</FormLabel>
          <StyledTextField
            defaultValue={citizen?.fr_lastname}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
        <Box
          sx={{
            gridColumn: "1 / -1",
            "@media screen and (min-width: 600px)": {
              gridColumn: "3 / span 2",
            },
          }}
        >
          <FormLabel component="p">AP. Materno</FormLabel>
          <StyledTextField
            defaultValue={citizen?.mr_lastname}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
        <Box
          sx={{
            gridColumn: "1 / -1",
            "@media screen and (min-width: 600px)": {
              gridColumn: "5 / span 2",
            },
          }}
        >
          <FormLabel component="p">Nombres</FormLabel>
          <StyledTextField
            defaultValue={citizen?.names}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
        <Box
          sx={{
            gridColumn: "1 / -1",
            "@media screen and (min-width: 600px)": {
              gridColumn: "1 / span 2",
            },
          }}
        >
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
        <Box
          sx={{
            gridColumn: "1 / -1",
            "@media screen and (min-width: 600px)": {
              gridColumn: "3 / span 2",
            },
          }}
        >
          <FormLabel component="p">Edad</FormLabel>
          <StyledTextField
            defaultValue={`${age} ${age > 1 ? "años" : "año"}`}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
        <Box
          sx={{
            gridColumn: "1 / -1",
            "@media screen and (min-width: 600px)": {
              gridColumn: "5 / span 2",
            },
          }}
        >
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
        <Box
          sx={{
            gridColumn: "1 / -1",
            "@media screen and (min-width: 600px)": {
              gridColumn: "1 / span 2",
            },
          }}
        >
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
        <Box
          sx={{
            gridColumn: "1 / -1",
            "@media screen and (min-width: 600px)": {
              gridColumn: "3 / -1",
            },
          }}
        >
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
                select
                onChange={(event) => {
                  const ID = event?.target?.value ?? null;
                  const selectedOpt = ID
                    ? DOSES
                      ? DOSES.find((opt: ISelectGeneric) => opt.id === ID)
                      : DOSES[0]
                    : null;
                  setValue("dose", selectedOpt as { id: string; name: string });
                }}
                value={value?.id}
                error={Boolean(errors["dose"])}
              >
                {DOSES.map((dose: ISelectGeneric) => (
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
        <Box
          sx={{
            gridColumn: "1 / -1",
            "@media screen and (min-width: 600px)": {
              gridColumn: "2 / span 2",
            },
          }}
        >
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
        <Box
          sx={{
            gridColumn: "1 / -1",
            "@media screen and (min-width: 600px)": {
              gridColumn: "4 / -1",
            },
          }}
        >
          <FormLabel component="p">Centro de vacunación</FormLabel>
          <Controller
            control={control}
            rules={RULES}
            name="vc"
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                disablePortal
                value={value}
                getOptionLabel={(v_c: ISelectGeneric) => v_c.name}
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
                {RISK_FACTORS.map((r_f: ISelectGeneric) => (
                  <FormControlLabel
                    checked={value.includes(r_f.code)}
                    key={r_f.id}
                    control={<Checkbox inputProps={{ name: r_f.code }} />}
                    label={r_f.name}
                    onChange={(event: any) => {
                      let rsfs = [...getValues("riskFactors")];
                      const cbxChecked = event.target!.checked;
                      const cbxName = event.target!.name;
                      if (!cbxChecked) {
                        rsfs = rsfs.filter((rf_code) => rf_code !== r_f.code);
                      } else {
                        switch (cbxName) {
                          case "rf_normal":
                            rsfs = ["rf_normal"];
                            break;
                          case "rf_60_69":
                            rsfs = rsfs.filter(
                              (rf_code) => !rf_60_69.includes(rf_code)
                            );
                            rsfs.push(r_f.code);
                            break;
                          case "rf_70_79":
                            rsfs = rsfs.filter(
                              (rf_code) => !rf_70_79.includes(rf_code)
                            );
                            rsfs.push(r_f.code);
                            break;
                          case "rf_80_more":
                            rsfs = rsfs.filter(
                              (rf_code) => !rf_80_more.includes(rf_code)
                            );
                            rsfs.push(r_f.code);
                            break;
                          default: {
                            rsfs = rsfs.filter(
                              (rf_code) => rf_code !== "rf_normal"
                            );
                            rsfs.push(r_f.code);
                          }
                        }
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
