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
  fixProduct,
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
import BuildIcon from "@mui/icons-material/Build";
import VerifiedIcon from "@mui/icons-material/Verified";

const columns = [
  { field: "prod_id", headerName: "Product_ID", width: 160 },
  { field: "package_id", headerName: "Package_ID", width: 160 },
  {
    field: "fix",
    headerName: "修理",
    width: 120,
    renderCell: (params) => params.value,
  },
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

// stt-06: sua thanh cong, gui ve agent
// stt-08: khong sua duoc gui ve factory
const initialShippingState = {
  prodId: "",
  unitId: "",
  warehouseId: "",
  statusCode: "",
};
const ProductGuarantee = () => {
  const { auth, product, warehouse } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [shippingData, setShippingData] = useState(initialShippingState);
  const [unitName, setUnitName] = useState("");

  useEffect(() => {
    dispatch(getAllOwnProductSold({ auth }));
  }, [dispatch]);

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = (prod, statusCode) => {
    const unitSelected =
      statusCode === "STT-08"
        ? prod?.package_product?.userCreated_package
        : prod?.soldStatus_product?.store_soldStatus;

    setShippingData({
      ...shippingData,
      unitId: unitSelected?.id,
      prodId: prod?.prod_id,
      statusCode,
    });

    dispatch(
      getAllWarehouseByUnit({
        data: { unitId: unitSelected?.id },
        auth,
      })
    );
    setUnitName(unitSelected?.name);
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
  const handleFixProduct = (prodId) => {
    dispatch(fixProduct({ data: { productId: prodId }, auth }));
  };
  const handleMove = () => {
    dispatch(moveProduct({ data: shippingData, auth }));
    handleCloseDialog();
  };

  const rows = product.products.map((prod) => ({
    ...prod,
    fix: prod.soldStatus_product?.currError_id ? (
      <Tooltip
        title={`エラーの説明： ${prod.soldStatus_product?.error_soldStatus?.description}`}
      >
        <Button
          color="error"
          startIcon={<BuildIcon />}
          onClick={() => handleFixProduct(prod?.prod_id)}
        >
          修理
        </Button>
      </Tooltip>
    ) : (
      <Tooltip title={`Repair successfully !`}>
        <VerifiedIcon color="success" />
      </Tooltip>
    ),
    move_to_agent: (
      <Button
        color="primary"
        endIcon={<SendIcon />}
        onClick={() => handleClickOpenDialog(prod, "STT-06")}
        disabled={prod.soldStatus_product?.currError_id ? true : false}
      >
        運送
      </Button>
    ),
    move_to_factory: (
      <Button
        color="primary"
        endIcon={<SendIcon />}
        onClick={() => handleClickOpenDialog(prod, "STT-08")}
        disabled={!prod.soldStatus_product?.currError_id ? true : false}
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
        <DialogTitle>{`${
          shippingData.statusCode === "STT-06"
            ? "エージェントへの運送"
            : "工場への運送"
        }`}</DialogTitle>
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
            value={shippingData.warehouseId}
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

export default ProductGuarantee;
