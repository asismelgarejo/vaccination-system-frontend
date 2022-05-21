import { Avatar, Box, Divider, Typography } from "@mui/material";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";
import RoomIcon from "@mui/icons-material/Room";
import { styled } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import es from "date-fns/locale/es";

import { useCitizen } from "../../../contexts/Citizen.context";
import { differenceInCalendarYears, format } from "date-fns";

const StyledBox = styled(Box)({ background: "#E7F6F5", padding: ".4em 0" });
const StyledTypography = styled(Typography)({
  display: "flex",
  alignItems: "center",
});

export const VaccinationCard = () => {
  const { citizen } = useCitizen();
  const age = differenceInCalendarYears(
    new Date(),
    new Date(citizen?.birthday as string)
  );
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -20 }}
        // exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              padding: ".5em",
              border: "1px solid #AEAEAE",
              borderRadius: ".4em",
              overflow: "hidden",
              boxSizing: "border-box",
              "@media screen and (min-width: 600px)": {
                flexDirection: "row",
              },
            }}
          >
            <Box sx={{ padding: "0 2em" }}>
              <Avatar sx={{ width: 60, height: 60 }} />
            </Box>
            <Box sx={{ width: "100%" }}>
              <Typography variant="h6">
                {`${citizen?.fr_lastname} ${citizen?.mr_lastname} ${citizen?.names}`.toUpperCase()}
              </Typography>
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
                  {format(new Date(citizen?.birthday as string), "dd/MM/yyyy")}
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
                  {`${age} ${age > 1 ? "años" : "año"}`}
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
            <motion.div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                rowGap: "1px",
                background: "#AEAEAE",
                borderRadius: ".4em",
                overflow: "hidden",
              }}
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.15,
                delay: 0.2,
              }}
            >
              {citizen?.vaccines.map((vaccine) => (
                <StyledBox key={vaccine.id}>
                  <StyledTypography>
                    <ArrowCircleRightOutlinedIcon fontSize="small" />
                    {vaccine?.dose.name}
                  </StyledTypography>
                  <Box sx={{ paddingLeft: "1em" }}>
                    <StyledTypography>
                      <ShieldOutlinedIcon fontSize="small" />
                      {format(
                        new Date(vaccine.fc_dosis),
                        "d 'de' MMMM 'del' yyyy",
                        {
                          locale: es,
                        }
                      )}
                    </StyledTypography>
                    <StyledTypography>
                      <MedicationOutlinedIcon fontSize="small" />
                      Vacuna contra covid
                    </StyledTypography>
                    <StyledTypography>
                      <RoomIcon fontSize="small" />
                      {vaccine.vc.name.toUpperCase()}
                    </StyledTypography>
                  </Box>
                </StyledBox>
              ))}
            </motion.div>
          </Box>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};
