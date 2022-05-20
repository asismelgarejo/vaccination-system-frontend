import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Controller, useForm } from "react-hook-form";
import { Stack } from "@mui/material";

export interface ObjFormDialog {
  showDialog(): void;
  closeDialog(): void;
}

interface IFormDialogProps {
  ref: React.Ref<ObjFormDialog>;
}

export const FormDialog: React.FC<IFormDialogProps> = React.forwardRef(
  (props, ref) => {
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
      setOpen(false);
    };

    const successSumit = (data: any) => {
      console.log(">>data", data);
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
      formState: { errors },
    } = useForm({
      defaultValues: { email: "", password: "" },
    });
    const onSubmit = handleSubmit(
      (data) => successSumit(data),
      () => {}
    );
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{paddingBottom: "0"}}>Iniciar sesión</DialogTitle>
        <DialogContent>
          <br/>
          <Stack onSubmit={onSubmit} component="form" spacing={2}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <TextField
                  onChange={onChange}
                  value={value}
                  error={Boolean(errors["email"])}
                  size="small"
                  id="email"
                  fullWidth
                  placeholder="Email"
                  label="Email"
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <TextField
                  onChange={onChange}
                  value={value}
                  error={Boolean(errors["password"])}
                  size="small"
                  id="password"
                  fullWidth
                  placeholder="Password"
                  label="Password"
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Stack sx={{ width: "100%", padding: "0 1em 1em" }} spacing={1}>
            <Button onClick={handleClose} variant="contained">
              Iniciar sesión
            </Button>
            <Button onClick={handleClose} variant="outlined">
              Cancelar
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    );
  }
);
