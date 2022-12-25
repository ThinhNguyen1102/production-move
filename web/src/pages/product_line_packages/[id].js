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
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { getUserByRole } from "../../redux/actions/userAction";
import { getAllWarehouseByUnit } from "../../redux/actions/warehouseAction";

const columns = [
  { field: "package_id", headerName: "Package_ID", width: 160 },
  {
    field: "quantity",
    headerName: "数量",
    width: 80,
  },
  {
    field: "move_to_agent",
    headerName: "エージェントへの発送",
    width: 180,
    renderCell: (params) => {
      return (
        <Button
          color="primary"
          endIcon={<LocalShippingIcon />}
          onClick={params.value.onClick}
        >
          発送
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
        <DialogTitle>エージェントへの発送</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="unitId"
            select
            label="エージェント"
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
            label="倉庫"
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
          <Button onClick={handleCloseDialog}>キャンセル</Button>
          <Button autoFocus onClick={handleMoveToAgent}>
            発送
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductLinePackages;
