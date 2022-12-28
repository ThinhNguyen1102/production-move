import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UnitTable from "./UnitTable";
import { getAllUnitInfomation } from "../../../../redux/actions/statisticAction";

const UnitManagement = () => {
  const { auth, statistic } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUnitInfomation({ auth }));
  }, [dispatch]);

  const { factories, agents, serviceCenters } = statistic.unitsByRole;
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
