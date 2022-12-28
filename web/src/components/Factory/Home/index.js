import { Box, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOwnProductSold } from "../../../redux/actions/productAction";
import { getFactoryStatisticProduct } from "../../../redux/actions/statisticAction";
import HomeFactoryChart from "./HomeChart";
import HomeFactoryOverview from "./Overview";

const FactoryHome = () => {
  const { auth, statistic, product } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFactoryStatisticProduct({ auth }));
    dispatch(getAllOwnProductSold({ auth }));
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
        <HomeFactoryOverview
          statisticProduct={statisticProduct}
          failureProduct={product.products}
        />
        <HomeFactoryChart statisticProduct={statisticProduct} />
      </Box>
    </Container>
  );
};

export default FactoryHome;
