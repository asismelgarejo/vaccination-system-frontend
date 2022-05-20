import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { FormDialog, ObjFormDialogRef } from "../FormDialog";
import { useRef } from "react";
import { useUserLogged } from "../../contexts/UserLogged.context";
import { Stack } from "@mui/material";

export const CustomAppBar = () => {
  const formDialogRef = useRef<ObjFormDialogRef>(null);
    const { userLogged, setUserLogged } = useUserLogged();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ width: "100%", background: "#21bdba" }}>
        <Toolbar sx={{ maxWidth: "80%", width: "100%", margin: "0 auto" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sistema de vacunación
          </Typography>

          {userLogged !== "" ? (
            <Stack direction="row" spacing={2} sx={{alignItems: "center"}}>
              <Typography sx={{ flexGrow: 1 }}>
                Hola, {userLogged}
              </Typography>
              <Button variant="contained" onClick={() => setUserLogged("")}>
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
