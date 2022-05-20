import { Box } from "@mui/material";
import React from "react";
import { CustomAppBar } from "../../components/CustomAppBar";
import { Footer } from "../../components/Footer";
interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box>
      <CustomAppBar />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gridTemplateRows: "1fr minmax(150px, auto)",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Box sx={{ width: "80%", margin: "0 auto", padding: "2em 0" }}>{children}</Box>
        <Footer />
      </Box>
    </Box>
  );
};
