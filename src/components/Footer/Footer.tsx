import { Divider, Box, Typography, Stack } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
export const Footer = () => {
  return (
    <Box
      sx={{
        background: "#21bdba",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          maxWidth: "78%",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          padding: "1em 0",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" component="div" sx={{ color: "#fff" }}>
          Contacta al desarrollador
        </Typography>
        <br />
        <Stack direction="row" spacing={2}>
          <a
            href="https://www.linkedin.com/in/asis-melgarejo-5010b31a7/"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedInIcon fontSize="large" sx={{ color: "#fff" }} />
          </a>
          <a
            href="https://www.instagram.com/asismelgarejo/"
            target="_blank"
            rel="noreferrer"
          >
            <InstagramIcon fontSize="large" sx={{ color: "#fff" }} />
          </a>
          <a
            href="https://twitter.com/asismelgarejo"
            target="_blank"
            rel="noreferrer"
          >
            <TwitterIcon fontSize="large" sx={{ color: "#fff" }} />
          </a>
          <a
            href="https://github.com/asismelgarejo"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon fontSize="large" sx={{ color: "#fff" }} />
          </a>
          <a
            href="https://www.youtube.com/@asismelgarejo"
            target="_blank"
            rel="noreferrer"
          >
            <YouTubeIcon fontSize="large" sx={{ color: "#fff" }} />
          </a>
        </Stack>
        <br />
      </Box>
      <Divider variant="middle" />
      <Box
        sx={{
          maxWidth: "78%",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          padding: "1em 0",
        }}
      >
        <Typography variant="caption" sx={{ color: "#fff" }}>
          Asis Melgarejo&ensp;&copy;&ensp;2022
        </Typography>
      </Box>
    </Box>
  );
};
