import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  createWarehouses,
  getAllOwnWarehouse,
} from "../../redux/actions/warehouseAction";

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "address",
    headerName: "住所",
    width: 300,
  },
  {
    field: "phone_number",
    headerName: "電話番号",
    width: 130,
  },
];
const initialState = {
  address: "",
  phone_number: "",
};
const Warehouse = () => {
  const { auth, warehouse } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOwnWarehouse({ auth }));
  }, [dispatch]);

  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleSubmit = () => {
    dispatch(createWarehouses({ data: warehouseData, auth }));
    handleCloseDialog();
  };

  const [warehouseData, setWarehouseData] = useState(initialState);
  const { address, phone_number } = warehouseData;
  const onChangeDataInput = (e) => {
    setWarehouseData({
      ...warehouseData,
      [e.target.name]: e.target.value,
    });
  };

  console.log("WAREHOUSE", warehouse.warehouses);
  const rows = warehouse.warehouses;
  return (
    <>
      <Box p={3} sx={{ height: 600, width: "100%" }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ marginBottom: 3 }}
          onClick={handleClickOpenDialog}
        >
          倉庫追加
        </Button>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </Box>
      {/* dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>商品ライン追加</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="address"
            label="住所"
            fullWidth
            variant="standard"
            name="address"
            value={address}
            onChange={onChangeDataInput}
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone_number"
            label="電話番号"
            fullWidth
            variant="standard"
            name="phone_number"
            value={phone_number}
            onChange={onChangeDataInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>キャンセル</Button>
          <Button onClick={handleSubmit}>保存</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Warehouse;
