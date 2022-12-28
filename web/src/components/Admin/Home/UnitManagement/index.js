import { Grid } from "@mui/material";
import React from "react";
import UnitTable from "./UnitTable";

const UnitManagement = ({ unitsByRole }) => {
  const { factories, agents, serviceCenters } = unitsByRole;
  return (
    <Grid container spacing={3} marginBottom={3}>
      <Grid item md={4} xs={12}>
        <UnitTable title="Factory" dataRows={factories} />
      </Grid>
      <Grid item md={4} xs={12}>
        <UnitTable title="Agent" dataRows={agents} />
      </Grid>
      <Grid item md={4} xs={12}>
        <UnitTable title="Service Center" dataRows={serviceCenters} />
      </Grid>
    </Grid>
  );
};

export default UnitManagement;
