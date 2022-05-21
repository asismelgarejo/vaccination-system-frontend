import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { FormDialog, ObjFormDialogRef } from "../FormDialog";
import { useRef, useState } from "react";
import {
  useRefreshContextMe,
  useUserLogged,
} from "../../contexts/UserLogged.context";
import { CircularProgress, Stack } from "@mui/material";
import { useMutation } from "@apollo/client";
import { LogoutMutation, Me } from "../../api/graphql/user";
import Swal from "sweetalert2";

export const CustomAppBar = () => {
  const [loading, setLoading] = useState(false);
  const formDialogRef = useRef<ObjFormDialogRef>(null);
  const { userLogged } = useUserLogged();
  const [execLogout] = useMutation(LogoutMutation, {
    refetchQueries: [{ query: Me }],
  });
  const { deleteMe } = useRefreshContextMe();
  const name = userLogged?.citizen?.names;
  const handleLogout = async () => {
    const {
      data: { logout: logoutData },
    } = await execLogout({ variables: { email: userLogged?.email } });
    if (logoutData.status === "success") {
      deleteMe();
      setLoading(false);
    } else {
      setLoading(false);
       Swal.fire({
         title: "Error al cerrar sesión",
         icon: "error",
         confirmButtonText: "Aceptar",
       });
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ width: "100%", background: "#21bdba" }}>
        <Toolbar sx={{ maxWidth: "80%", width: "100%", margin: "0 auto" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sistema de vacunación
          </Typography>

          {userLogged ? (
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <Typography sx={{ flexGrow: 1 }}>Hola, {name}</Typography>
              <Button
                variant="contained"
                onClick={() => handleLogout()}
                disabled={loading}
                startIcon={
                  loading ? (
                    <CircularProgress size={20} color="secondary" />
                  ) : null
                }
              >
                Cerrar sesión
              </Button>
            </Stack>
          ) : (
            <Button
              variant="contained"
              onClick={() =>
                formDialogRef && formDialogRef.current?.showDialog()
              }
            >
              Iniciar sesión
            </Button>
          )}
          <FormDialog ref={formDialogRef} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
