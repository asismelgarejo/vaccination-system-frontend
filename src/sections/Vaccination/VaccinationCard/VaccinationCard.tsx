import { Avatar, Box, Divider, Typography } from "@mui/material";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";
import RoomIcon from "@mui/icons-material/Room";
import { styled } from "@mui/material/styles";

const StyledBox = styled(Box)({ background: "#E7F6F5", padding: ".4em 0" });
const StyledTypography = styled(Typography)({
  display: "flex",
  alignItems: "center",
});

export const VaccinationCard = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          padding: ".5em",
          border: "1px solid #AEAEAE",
          borderRadius: ".4em",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        <Box sx={{ padding: "0 2em" }}>
          <Avatar sx={{ width: 60, height: 60 }} />
        </Box>
        <Box sx={{ width: "100%" }}>
          <Typography variant="h6">MELGAREJO LOPEZ ASIS</Typography>
          <Divider />
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold" }}
              component="span"
            >
              Fec. Nac.:&ensp;
            </Typography>
            <Typography variant="subtitle1" component="span">
              16/01/2001
            </Typography>
          </Box>
          <Divider />
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold" }}
              component="span"
            >
              Edad:&ensp;
            </Typography>
            <Typography variant="subtitle1" component="span">
              21 años
            </Typography>
          </Box>
          <Divider />
        </Box>
      </Box>
      <Box
        sx={{
          padding: ".5em",
          border: "1px solid #AEAEAE",
          borderRadius: ".4em",
          overflow: "hidden",
          marginTop: "1em",
        }}
      >
        <StyledTypography variant="h6">
          <CoronavirusIcon fontSize="medium" />
          Vacuna contra Covid
        </StyledTypography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
            rowGap: "1px",
            background: "#AEAEAE",
            borderRadius: ".4em",
            overflow: "hidden",
          }}
        >
          <StyledBox>
            <StyledTypography>
              <ArrowCircleRightOutlinedIcon fontSize="small" />1<sup>a</sup>{" "}
              dosis
            </StyledTypography>
            <Box sx={{ paddingLeft: "1em" }}>
              <StyledTypography>
                <ShieldOutlinedIcon fontSize="small" />
                Domingo 29 de Ago. del 2021
              </StyledTypography>
              <StyledTypography>
                <MedicationOutlinedIcon fontSize="small" />
                Vacuna contra covid
              </StyledTypography>
              <StyledTypography>
                <RoomIcon fontSize="small" />
                LIMA - IEP SAN JOSE
              </StyledTypography>
            </Box>
          </StyledBox>
          <StyledBox>
            <StyledTypography>
              <ArrowCircleRightOutlinedIcon fontSize="small" />1<sup>a</sup>{" "}
              dosis
            </StyledTypography>
            <Box sx={{ paddingLeft: "1em" }}>
              <StyledTypography>
                <ShieldOutlinedIcon fontSize="small" />
                Domingo 29 de Ago. del 2021
              </StyledTypography>
              <StyledTypography>
                <MedicationOutlinedIcon fontSize="small" />
                Vacuna contra covid
              </StyledTypography>
              <StyledTypography>
                <RoomIcon fontSize="small" />
                LIMA - IEP SAN JOSE
              </StyledTypography>
            </Box>
          </StyledBox>
        </Box>
      </Box>
    </Box>
  );
};
