import { Box, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCenterStatisticProduct } from "../../../redux/actions/statisticAction";
import HomeCenterChart from "./HomeChart";
import HomeCenterOverview from "./Overview";

const AgentHome = () => {
  const { auth, statistic } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCenterStatisticProduct({ auth }));
  }, [dispatch]);

  const { statisticProduct } = statistic;

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
        <HomeCenterOverview statisticProduct={statisticProduct} />
        <HomeCenterChart statisticProduct={statisticProduct} />
      </Box>
    </Container>
  );
};

export default AgentHome;
