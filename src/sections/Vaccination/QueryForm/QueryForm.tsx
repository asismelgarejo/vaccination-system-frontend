import { Box, Button, TextField, Typography } from "@mui/material";
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
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { dni: "", birthday: new Date() },
  });

  const successSumit = (data: any) => {
    console.log(">>data", data);
    props.setActiveStep(1);
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
                  onChange={onChange}
                  value={value}
                  error={Boolean(errors["dni"])}
                  size="small"
                  id="dni"
                  fullWidth
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
            startIcon={<DoubleArrowIcon />}
            variant="contained"
            type="submit"
            fullWidth
          >
            Consultar
          </Button>
        </Box>
      </div>
    </div>
  );
};
