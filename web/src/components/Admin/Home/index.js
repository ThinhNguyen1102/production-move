import { Box, Container, Typography } from "@mui/material";
import React from "react";
import HomeChart from "./HomeChart";
import Summary from "./Summary";
import UnitManagement from "./UnitManagement";

const AdminHome = () => {
  return (
    <Container maxWidth="xl">
      <Box
        py={3}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Summary />
        <HomeChart />
        <UnitManagement />
      </Box>
    </Container>
  );
};

export default AdminHome;
