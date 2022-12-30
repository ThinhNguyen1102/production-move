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
      text: "Created products",
      value: calculateNumOfProducts(),
      color: "primary.light",
    },
    {
      text: "Sold products",
      value: calculateNumOfSoldProducts(),
      color: "success.light",
    },
    {
      text: "Defective products",
      value: calculateNumOfErrorProducts(),
      color: "error.light",
    },
    {
      text: "Unrepairable defective products",
      value: failureProduct?.length,
      color: "neutral.main",
      typeCard: "card-link",
    },
  ];
  return <Overview overviewData={overviewData} />;
};

export default HomeFactoryOverview;
