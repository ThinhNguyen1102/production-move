import { Box, Button, DialogContentText, MenuItem } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPackageByUnit,
  movePackage,
} from "../../redux/actions/packageAction";
import SendIcon from "@mui/icons-material/Send";
import { getAllWarehouseByUnit } from "../../redux/actions/warehouseAction";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";

const columns = [
  { field: "package_id", headerName: "Package_ID", width: 160 },
  {
    field: "quantity_in_stock",
    headerName: "Quantity in Stock",
    width: 150,
  },
  {
    field: "move_to_factory",
    headerName: "工場に戻る",
    width: 180,
    renderCell: (params) => {
      return (
        <Button
          color="primary"
          endIcon={<SendIcon />}
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
  statusCode: "STT-10",
};
const PackageManagement = () => {
  const { auth, packageReducer, warehouse } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [shippingData, setShippingData] = useState(initialState);
  const [unitName, setUnitName] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const { unitId, warehouseId } = shippingData;

  useEffect(() => {
    dispatch(getAllPackageByUnit({ auth }));
  }, [dispatch]);

  const handleClickOpenDialog = (pk) => {
    setShippingData({
      ...shippingData,
      unitId: pk?.unit_created_id,
      packageId: pk?.package_id,
    });

    dispatch(
      getAllWarehouseByUnit({
        data: { unitId: pk?.unit_created_id },
        auth,
      })
    );
    setUnitName(pk?.unit_created_id);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const onChangeShippingDataInput = (e) => {
    setShippingData({
      ...shippingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMove = () => {
    dispatch(movePackage({ data: shippingData, auth }));
    handleCloseDialog();
  };

  const rows = packageReducer.packages.map((pk) => ({
    ...pk,
    move_to_factory: {
      onClick: () => handleClickOpenDialog(pk),
    },
  }));
  return (
    <>
      <Box p={3} sx={{ height: "calc(100vh - 72px)", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.package_id}
          pageSize={12}
          rowsPerPageOptions={[12]}
        />
      </Box>
      {/* dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>工場に戻る</DialogTitle>
        <DialogContent>
          <DialogContentText>{unitName}</DialogContentText>
          <TextField
            margin="dense"
            id="warehouseId"
            select
            label="倉庫"
            fullWidth
            variant="standard"
            name="warehouseId"
            value={warehouseId}
            onChange={onChangeShippingDataInput}
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
          <Button onClick={handleMove}>保存</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PackageManagement;
