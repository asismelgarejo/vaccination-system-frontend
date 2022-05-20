import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  TextField,
  Typography,
} from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import esLocale from "date-fns/locale/es";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import FormLabel from "@mui/material/FormLabel";
import {
  CarnetDeVacunacion,
  MinsaLogo,
} from "../../../toolbox/constants/images";
import styles from "./QueryForm.module.scss";
import { Controller, useForm } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { FAKE_SERVICE } from "../../../mockups/service";
import { useState } from "react";
import { CustomAlerts } from "../../../components/CustomAlerts";
const RULES = {
  required: {
    value: true,
    message: "Debe completar el campo",
  },
};

interface IQueryFormProps {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

export const QueryForm: React.FC<IQueryFormProps> = (props) => {
  const [error, setError] = useState({ isError: false, message: "" });
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: { dni: "", birthday: new Date() },
  });

  const successSumit = async (data: any) => {
    console.log(">>data", data);
    setLoading(true);
    const response = await FAKE_SERVICE("success");
    if (response === "success") {
      setLoading(false);
      props.setActiveStep(1);
    } else {
      setLoading(false);
      setError({ isError: true, message: "Usuario con DNI no encontrado" });
    }
  };

  const onSubmit = handleSubmit(
    (data) => successSumit(data),
    () => {}
  );
  return (
    <div className={styles.QueryForm}>
      <div className={styles.QueryFormBackground}>
        <img
          src={MinsaLogo}
          alt={"MinsaLogo"}
          className={styles.MinsaLogo}
          onDragStart={(e) => e.preventDefault()}
        />
        <img
          src={CarnetDeVacunacion}
          alt={"CarnetDeVacunacion"}
          className={styles.CarnetDeVacunacion}
          onDragStart={(e) => e.preventDefault()}
        />
      </div>
      <div className={styles.QueryFormForm}>
        <Typography variant="h6">Ingrese los datos solicitados</Typography>
        <Collapse in={error.isError}>
          <CustomAlerts
            severity="error"
            closeAction={() => {
              setError({ isError: false, message: "" });
            }}
            message={error.message}
          />
        </Collapse>
        <br />
        <Box onSubmit={onSubmit} component="form">
          <Box>
            <FormLabel htmlFor="dni" sx={{ display: "block" }}>
              Número de documento
            </FormLabel>
            <Controller
              control={control}
              rules={RULES}
              name="dni"
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  autoFocus
                  error={Boolean(errors["dni"])}
                  size="small"
                  placeholder="DNI"
                  onChange={(e) => {
                    if (e.target.validity.valid)
                      setValue("dni", e.target.value, { shouldDirty: true });
                  }}
                  id="dni"
                  fullWidth
                  helperText={errors["dni"]?.message ?? ""}
                  inputProps={{
                    pattern: "^[0-9]{0,8}$",
                  }}
                />
              )}
            />
          </Box>
          <br />
          <Box>
            <FormLabel htmlFor="birthday" sx={{ display: "block" }}>
              Fecha de nacimiento
            </FormLabel>
            <Controller
              control={control}
              rules={RULES}
              name="birthday"
              render={({ field: { onChange, value } }) => (
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  locale={esLocale}
                >
                  <DatePicker
                    openTo="year"
                    views={["year", "month", "day"]}
                    value={value}
                    onChange={(newValue) => {
                      setValue("birthday", newValue as Date);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        onChange={onChange}
                        value={value}
                        error={Boolean(errors["birthday"])}
                        size="small"
                        id="birthday"
                        fullWidth
                        helperText={errors["birthday"]?.message ?? ""}
                      />
                    )}
                  />
                </LocalizationProvider>
              )}
            />
          </Box>
          <br />
          <br />
          <Button
            variant="contained"
            type="submit"
            disabled={!isDirty || loading}
            fullWidth
            startIcon={
              loading ? (
                <CircularProgress size={20} color="secondary" />
              ) : (
                <DoubleArrowIcon />
              )
            }
          >
            Consultar
          </Button>
        </Box>
      </div>
    </div>
  );
};
