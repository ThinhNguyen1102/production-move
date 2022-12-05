import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  DialogContentText,
  MenuItem,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOwnProductSold,
  moveProduct,
} from "../../redux/actions/productAction";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { getUserByRole } from "../../redux/actions/userAction";
import { getAllWarehouseByUnit } from "../../redux/actions/warehouseAction";
import FeedbackIcon from "@mui/icons-material/Feedback";
import SendIcon from "@mui/icons-material/Send";

const columns = [
  { field: "prod_id", headerName: "Product_ID", width: 160 },
  { field: "package_id", headerName: "Package_ID", width: 160 },
  {
    field: "move_to_agent",
    headerName: "エージェントへの運送",
    width: 180,
    renderCell: (params) => params.value,
  },
  {
    field: "move_to_factory",
    headerName: "工場への運送",
    width: 180,
    renderCell: (params) => params.value,
  },
];

// stt-06: sua xong, gui ve agent
const initialShippingState = {
  prodId: "",
  unitId: "",
  warehouseId: "",
  statusCode: "STT-05",
};
const ProductGuarantee = () => {
  const { auth, product } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [shippingData, setShippingData] = useState(initialShippingState);

  useEffect(() => {
    dispatch(getAllOwnProductSold({ auth }));
  }, [dispatch]);

  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpenDialog = (prodId) => {
    chooseProduct(prodId);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const chooseProduct = (prodId) => {};

  const handleMove = () => {
    dispatch(moveProduct({ data: shippingData, auth }));
    handleCloseDialog();
  };

  const rows = product.products.map((prod) => ({
    ...prod,
    move_to_agent: (
      <Button
        color="primary"
        endIcon={<SendIcon />}
        onClick={() => handleClickOpenDialog(prod.prod_id)}
      >
        運送
      </Button>
    ),
    move_to_factory: (
      <Button
        color="primary"
        endIcon={<SendIcon />}
        onClick={() => handleClickOpenDialog(prod.prod_id)}
      >
        運送
      </Button>
    ),
  }));

  return (
    <>
      <Box p={3} sx={{ height: "calc(100vh - 72px)", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.prod_id}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </Box>
      {/* dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>エージェントへの運送</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>キャンセル</Button>
          <Button onClick={handleMove}>保存</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductGuarantee;
