import { Box, Card, CardContent, Grid, Typography, Link } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const Overview = ({ overviewData }) => {
  const generateCardByType = (item) => {
    if (item.typeCard === "card-link") {
      return (
        <Link
          component={RouterLink}
          to="/error_products"
          sx={{
            textDecoration: "none",
          }}
        >
          <Card sx={{ borderLeft: 8, borderColor: `${item.color}` }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                {item.text}
              </Typography>
              <Typography variant="h5" component="div">
                {item.value}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      );
    } else {
      return (
        <Card sx={{ borderLeft: 8, borderColor: `${item.color}` }}>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              {item.text}
            </Typography>
            <Typography variant="h5" component="div">
              {item.value}
            </Typography>
          </CardContent>
        </Card>
      );
    }
  };

  return (
    <Box>
      <Typography
        variant="h5"
        component="div"
        sx={{ fontWeight: 500 }}
        gutterBottom
      >
        Overview
      </Typography>
      <Grid container spacing={3}>
        {overviewData.map((item, index) => (
          <Grid
            item
            lg={12 / overviewData?.length}
            sm={overviewData?.length % 2 === 0 ? 6 : 12 / overviewData?.length}
            xs={12}
            key={index}
          >
            {generateCardByType(item)}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Overview;
