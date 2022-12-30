import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, DialogContentText } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOwnProductByPl,
  sellProduct,
} from "../../redux/actions/productAction";
import SellIcon from "@mui/icons-material/Sell";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import BackButton from "../../components/Shared/BackButton";

const columns = [
  { field: "prod_id", headerName: "Product_ID", width: 160 },
  { field: "package_id", headerName: "Package_ID", width: 160 },
  {
    field: "sell_product",
    headerName: "Sell",
    width: 130,
    renderCell: (params) => {
      return (
        <Button
          color="primary"
          startIcon={<SellIcon />}
          onClick={params.value.onClick}
        >
          Sell
        </Button>
      );
    },
  },
];

const initialState = {
  prodId: "",
  customerName: "",
  customerPhone: "",
  customerAddress: "",
  customerEmail: "",
};
const ProductLineProducts = () => {
  const { auth, product } = useSelector((state) => state);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOwnProductByPl({ data: { productLineId: id }, auth }));
  }, [dispatch]);

  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpenDialog = (prodId) => {
    chooseProduct(prodId);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const chooseProduct = (prodId) => {
    setSalesData({
      ...salesData,
      prodId,
    });
  };

  const handleSellProduct = () => {
    dispatch(sellProduct({ data: salesData, auth }));
    handleCloseDialog();
  };

  const [salesData, setSalesData] = useState(initialState);
  const {
    prodId,
    customerName,
    customerPhone,
    customerAddress,
    customerEmail,
  } = salesData;
  const onChangeDataInput = (e) => {
    setSalesData({
      ...salesData,
      [e.target.name]: e.target.value,
    });
  };

  const rows = product.products.map((prod) => ({
    ...prod,
    sell_product: { onClick: () => handleClickOpenDialog(prod.prod_id) },
  }));
  return (
    <>
      <Box p={3} sx={{ height: "calc(100vh - 144px)", width: "100%" }}>
        <BackButton to="/product_line" />
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.prod_id}
          pageSize={12}
          rowsPerPageOptions={[12]}
        />
      </Box>
      {/* dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>Sell Product</DialogTitle>
        <DialogContent>
          <DialogContentText>Customer Information:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="customerName"
            label="Name"
            fullWidth
            variant="standard"
            name="customerName"
            value={customerName}
            onChange={onChangeDataInput}
          />
          <TextField
            autoFocus
            margin="dense"
            id="customerPhone"
            label="Phone Number"
            fullWidth
            variant="standard"
            name="customerPhone"
            value={customerPhone}
            onChange={onChangeDataInput}
          />
          <TextField
            autoFocus
            margin="dense"
            id="customerEmail"
            label="Email"
            fullWidth
            variant="standard"
            type="email"
            name="customerEmail"
            value={customerEmail}
            onChange={onChangeDataInput}
          />
          <TextField
            autoFocus
            margin="dense"
            id="customerAddress"
            label="Address"
            fullWidth
            variant="standard"
            name="customerAddress"
            value={customerAddress}
            onChange={onChangeDataInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSellProduct}>Sell</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductLineProducts;
