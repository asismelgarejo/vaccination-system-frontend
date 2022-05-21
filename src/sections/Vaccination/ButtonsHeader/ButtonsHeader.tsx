import { Button } from "@mui/material";
import { Box } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
interface IButtonsHeaderProps {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  hidePrevButton?: boolean;
  hideNextButton?: boolean;
  prevAction?(): void;
  nextAction?(): void;
}

export const ButtonsHeader: React.FC<IButtonsHeaderProps> = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column-reverse",
        "@media screen and (min-width: 600px)": {
          flexDirection: "row",
          justifyContent: "space-between",
        },
      }}
    >
      {!props?.hidePrevButton && (
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => {
            if (props?.prevAction) {
              props?.prevAction();
            }
            props.setActiveStep((prev) => prev - 1);
          }}
        >
          Volver
        </Button>
      )}
      {!props?.hideNextButton && (
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          sx={{
            marginBottom: "1em",
            "@media screen and (min-width: 600px)": {
              marginLeft: "auto",
              marginBottom: "0",
            },
          }}
          onClick={() => props.setActiveStep((prev) => prev + 1)}
        >
          Ir a registrar vacuna
        </Button>
      )}
    </Box>
  );
};
