import { Box, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminStatisticProduct,
  getAllUnitInfomation,
} from "../../../redux/actions/statisticAction";
import HomeChart from "./HomeChart";
import Overview from "./Overview";
import UnitManagement from "./UnitManagement";

const AdminHome = () => {
  const { auth, statistic } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminStatisticProduct({ auth }));
    dispatch(getAllUnitInfomation({ auth }));
  }, [dispatch]);

  const { statisticProduct, unitsByRole } = statistic;

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
        <Overview statisticProduct={statisticProduct} />
        <HomeChart statisticProduct={statisticProduct} />
        <UnitManagement unitsByRole={unitsByRole} />
      </Box>
    </Container>
  );
};

export default AdminHome;
