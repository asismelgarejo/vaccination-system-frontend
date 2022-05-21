import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React from "react";

export interface ObjStatsDialog {
  showDialog(): void;
  closeDialog(): void;
}
interface IStatsDialogProps {
  ref: React.Ref<ObjStatsDialog>;
}
export const StatsDialog: React.FC<IStatsDialogProps> = React.forwardRef(
  (props, ref) => {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
      setOpen(false);
    };
    React.useImperativeHandle(ref, () => ({
      showDialog() {
        setOpen(true);
      },
      closeDialog() {
        setOpen(false);
      },
    }));

    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ paddingBottom: "0" }}>Estadísticas</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    );
  }
);
