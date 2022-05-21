import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Controller, useForm } from "react-hook-form";
import { CircularProgress, Collapse, Stack } from "@mui/material";
import { RULES } from "../../toolbox/constants/rules";
import { CustomAlerts } from "../CustomAlerts";
import {
  useRefreshContextMe,
} from "../../contexts/UserLogged.context";
import { LoginMutation, Me } from "../../api/graphql/user";
import { useMutation } from "@apollo/client";

export interface ObjFormDialog {
  showDialog(): void;
  closeDialog(): void;
}

interface IFormDialogProps {
  ref: React.Ref<ObjFormDialog>;
}

export const FormDialog: React.FC<IFormDialogProps> = React.forwardRef(
  (props, ref) => {
    const [execLogin] = useMutation(LoginMutation, {
      refetchQueries: [{ query: Me }],
    });
    const { execMe } = useRefreshContextMe();

    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState({ isError: false, message: "" });
    const [loading, setLoading] = React.useState(false);
    const handleClose = () => {
      setOpen(false);
    };

    const successSumit = async (data: any) => {
      setLoading(true);
      const {
        data: { login: loginData },
      } = await execLogin({
        variables: { email: data.email, password: data.password },
      });
      if (loginData?.status === "success") {
        setLoading(false);
        setValue("password", "");
        setValue("email", "");
        execMe();
        setOpen(false);
      } else {
        setLoading(false);
        setError({ isError: true, message: "Datos incorrectos" });
      }
    };

    React.useImperativeHandle(ref, () => ({
      showDialog() {
        setOpen(true);
      },
      closeDialog() {
        setOpen(false);
      },
    }));

    const {
      handleSubmit,
      control,
      setValue,
      formState: { errors, isDirty },
    } = useForm({
      defaultValues: { email: "", password: "" },
    });
    const onSubmit = handleSubmit(
      (data) => successSumit(data),
      () => {}
    );

    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ paddingBottom: "0" }}>Iniciar sesión</DialogTitle>
        <DialogContent>
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
          <br />
          <Stack onSubmit={onSubmit} component="form" spacing={2}>
            <Controller
              control={control}
              name="email"
              rules={RULES}
              render={({ field: { onChange, value } }) => (
                <TextField
                  onChange={onChange}
                  value={value}
                  error={Boolean(errors["email"])}
                  size="small"
                  id="email"
                  fullWidth
                  label="Email"
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={RULES}
              render={({ field: { onChange, value } }) => (
                <TextField
                  onChange={onChange}
                  value={value}
                  error={Boolean(errors["password"])}
                  size="small"
                  id="password"
                  fullWidth
                  label="Contraseña"
                  type="password"
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Stack sx={{ width: "100%", padding: "0 1em 1em" }} spacing={1}>
            <Button
              variant="contained"
              onClick={() => handleSubmit(onSubmit as any)()}
              disabled={!isDirty || loading}
              startIcon={
                loading ? (
                  <CircularProgress size={20} color="secondary" />
                ) : null
              }
            >
              Iniciar sesión
            </Button>
            <Button onClick={handleClose} variant="outlined" disabled={loading}>
              Cancelar
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    );
  }
);
