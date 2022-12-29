import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import Overview from "../../../Shared/Home/Overview";

const HomeFactoryOverview = ({ statisticProduct, failureProduct }) => {
  const calculateNumOfProducts = () => {
    return statisticProduct?.reduce(
      (total, item) => total + item.numOfProduct,
      0
    );
  };
  const calculateNumOfSoldProducts = () => {
    return statisticProduct?.reduce(
      (total, item) => total + item.numOfSoldProduct,
      0
    );
  };
  const calculateNumOfErrorProducts = () => {
    return statisticProduct?.reduce(
      (total, item) => total + item.numOfErrorProduct,
      0
    );
  };

  const overviewData = [
    {
      text: "San pham san xuat",
      value: calculateNumOfProducts(),
      color: "primary.light",
    },
    {
      text: "San pham ban duoc",
      value: calculateNumOfSoldProducts(),
      color: "success.light",
    },
    {
      text: "San pham loi",
      value: calculateNumOfErrorProducts(),
      color: "error.light",
    },
    {
      text: "San pham loi khong sua duoc",
      value: failureProduct?.length,
      color: "neutral.main",
      typeCard: "card-link",
    },
  ];
  return <Overview overviewData={overviewData} />;
};

export default HomeFactoryOverview;
