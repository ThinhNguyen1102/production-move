import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getAllPackageByProductLineUnit,
  movePackage,
} from "../../redux/actions/packageAction";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getUserByRole } from "../../redux/actions/userAction";
import { getAllWarehouseByUnit } from "../../redux/actions/warehouseAction";
import SendIcon from "@mui/icons-material/Send";

const columns = [
  { field: "package_id", headerName: "Package_ID", width: 160 },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 80,
  },
  {
    field: "move_to_agent",
    headerName: "Export to Agent",
    width: 180,
    renderCell: (params) => {
      return (
        <Button
          color="primary"
          endIcon={<SendIcon />}
          onClick={params.value.onClick}
        >
          Move
        </Button>
      );
    },
  },
];

const initialState = {
  unitId: "",
  packageId: "",
  warehouseId: "",
  statusCode: "STT-02",
};
const ProductLinePackages = () => {
  const { id } = useParams();
  const { auth, packageReducer, user, warehouse } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getAllPackageByProductLineUnit({ data: { productLineId: id }, auth })
    );
    dispatch(getUserByRole({ data: { role: 3 }, auth }));
  }, [dispatch]);

  const [shippingData, setShippingData] = useState(initialState);
  const { unitId, packageId, warehouseId } = shippingData;

  const onChangeDataInput = (e) => {
    if (e.target.name === "unitId") {
      dispatch(
        getAllWarehouseByUnit({ data: { unitId: e.target.value }, auth })
      );
    }
    setShippingData({
      ...shippingData,
      [e.target.name]: e.target.value,
    });
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = (packageId) => {
    choosePackage(packageId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const choosePackage = (packageId) => {
    setShippingData({
      ...shippingData,
      packageId,
    });
  };

  const handleMoveToAgent = () => {
    dispatch(movePackage({ data: shippingData, auth }));
    handleCloseDialog();
  };

  const rows = packageReducer.packages.map((pk) => ({
    ...pk,
    move_to_agent: {
      onClick: () => handleClickOpenDialog(pk.package_id),
    },
  }));
  return (
    <>
      <Box p={3} sx={{ height: "calc(100vh - 72px)", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.package_id}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </Box>
      {/* dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Export to Agent</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="unitId"
            select
            label="Agent"
            fullWidth
            variant="standard"
            name="unitId"
            value={unitId}
            onChange={onChangeDataInput}
          >
            {user.users.map((agent) => (
              <MenuItem key={agent.id} value={agent.id}>
                {agent.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            disabled={unitId ? false : true}
            margin="dense"
            id="warehouseId"
            select
            label="Warehouse"
            fullWidth
            variant="standard"
            name="warehouseId"
            value={warehouseId}
            onChange={onChangeDataInput}
          >
            {warehouse.warehouses.map((wh) => (
              <MenuItem key={wh.id} value={wh.id}>
                {wh.address}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button autoFocus onClick={handleMoveToAgent}>
            Move
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductLinePackages;
