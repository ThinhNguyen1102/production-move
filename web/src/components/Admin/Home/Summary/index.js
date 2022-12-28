import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";

const Summary = () => {
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
        <Grid item sm={4} xs={12}>
          <Card sx={{ borderLeft: 8, borderColor: "primary.light" }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Tong san pham tren toan quoc
              </Typography>
              <Typography variant="h5" component="div">
                122
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={4} xs={12}>
          <Card sx={{ borderLeft: 8, borderColor: "success.light" }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Tong san pham ban duoc
              </Typography>
              <Typography variant="h5" component="div">
                41
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={4} xs={12}>
          <Card sx={{ borderLeft: 8, borderColor: "error.light" }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Tong san pham bi loi
              </Typography>
              <Typography variant="h5" component="div">
                23
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Summary;
