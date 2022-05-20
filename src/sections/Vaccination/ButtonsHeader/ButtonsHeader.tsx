import { Button } from "@mui/material";
import { Box } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
interface IButtonsHeaderProps {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  hidePrevButton?: boolean;
  hideNextButton?: boolean;
}

export const ButtonsHeader: React.FC<IButtonsHeaderProps> = (props) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      {!props?.hidePrevButton && (
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => props.setActiveStep((prev) => prev - 1)}
        >
          Volver
        </Button>
      )}
      {!props?.hideNextButton && (
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          sx={{ marginLeft: "auto" }}
          onClick={() => props.setActiveStep((prev) => prev + 1)}
        >
          Ir a registrar vacuna
        </Button>
      )}
    </Box>
  );
};
