import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { FormDialog, ObjFormDialogRef } from "../FormDialog";
import { useRef } from "react";

export const CustomAppBar = () => {
  const formDialogRef = useRef<ObjFormDialogRef>(null);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ width: "100%", background: "#21bdba" }}>
        <Toolbar sx={{ maxWidth: "80%", width: "100%", margin: "0 auto" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sistema de vacunación
          </Typography>
          <Button
            variant="contained"
            onClick={() => formDialogRef && formDialogRef.current?.showDialog()}
          >
            Iniciar sesión
          </Button>
          <FormDialog ref={formDialogRef} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
