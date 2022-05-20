import { Alert, AlertProps, IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

interface ICustomAlertsProps extends AlertProps {
  closeAction(): void;
  message: string;
}

export const CustomAlerts: React.FC<ICustomAlertsProps> = (props) => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert
        severity={props.severity}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => props.closeAction()}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {props.message}
      </Alert>
    </Stack>
  );
};
