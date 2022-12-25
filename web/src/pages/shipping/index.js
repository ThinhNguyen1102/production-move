import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Chip,
  DialogContentText,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  acceptPackage,
  acceptProduct,
  getAllTransportReceive,
  getAllTransportSend,
} from "../../redux/actions/transportAction";

const Shipping = () => {
  const { auth, transport } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [showShippingState, setShowShippingState] = useState("receive");
  const [openDialog, setOpenDialog] = useState(false);
  const [transportId, setTransportId] = useState("");
  const [isPackageOrProduct, setIsPackageOrProduct] = useState("");

  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: showShippingState === "receive" ? "oldUnit" : "newUnit",
      headerName:
        showShippingState === "receive" ? "前のユニット" : "次のユニット",
      width: 150,
      valueGetter: ({ value }) => {
        return value?.name;
      },
    },
    {
      field: "is_shipping",
      headerName: "状況",
      width: 120,
      renderCell: ({ value }) => {
        if (showShippingState === "receive") {
          return value ? (
            <Chip label="到着" color="primary" />
          ) : (
            <Chip label="完成" color="success" />
          );
        } else {
          return value ? (
            <Chip label="運送中" color="primary" />
          ) : (
            <Chip label="完成" color="success" />
          );
        }
      },
    },
    {
      field: "description",
      headerName: "説明",
      width: 320,
      renderCell: ({ row }) => {
        let id,
          model,
          quantity_in_stock = "";
        if (row.product_transport && !row.package_transport) {
          id = row.product_transport.prod_id;
          model = row.product_transport.productLine_product.model;
        } else if (!row.product_transport && row.package_transport) {
          id = row.package_transport.package_id;
          model = row.package_transport.productLine_package.model;
          quantity_in_stock = row.package_transport.quantity_in_stock;
        }

        return (
          <Box>
            <Typography>{id}</Typography>
            <Typography>{`モデル: ${model}`}</Typography>
            {quantity_in_stock && (
              <Typography>{`Quantity in Stock: ${quantity_in_stock}`}</Typography>
            )}
          </Box>
        );
      },
    },
    {
      field: "accept_action",
      headerName: "アクション",
      width: 140,
      renderCell: (params) => params.value,
    },
  ];
  const rows = transport?.transports?.map((tran) => ({
    ...tran,
    accept_action:
      showShippingState === "receive" &&
      (tran?.is_shipping ? (
        <Button
          color="primary"
          onClick={() =>
            handleClickOpenDialog(
              tran?.id,
              tran?.package_transport?.package_id,
              tran?.product_transport?.prod_id
            )
          }
        >
          受け入れる
        </Button>
      ) : (
        <Button disabled>受け入れた</Button>
      )),
  }));
  console.log(rows);

  useEffect(() => {
    if (showShippingState === "receive") {
      dispatch(getAllTransportReceive({ auth }));
    } else {
      dispatch(getAllTransportSend({ auth }));
    }
  }, [dispatch, showShippingState]);

  const onChangeShippingState = (e) => {
    setShowShippingState(e.target.value);
  };

  const handleClickOpenDialog = (tranId, packageId, prodId) => {
    console.log(packageId, prodId);
    if (packageId && !prodId) {
      setIsPackageOrProduct("package");
    } else if (!packageId && prodId) {
      setIsPackageOrProduct("product");
    }
    setTransportId(tranId);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleAccept = () => {
    console.log("isPackageOrProduct", isPackageOrProduct);
    if (isPackageOrProduct === "package") {
      dispatch(acceptPackage({ data: { transportId }, auth }));
    } else if (isPackageOrProduct === "product") {
      dispatch(acceptProduct({ data: { transportId }, auth }));
    }
    handleCloseDialog();
  };

  return (
    <>
      <Box
        p={3}
        sx={{
          height: "calc(100vh - 144px)",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ToggleButtonGroup
          sx={{ marginBottom: 3, alignSelf: "end" }}
          color="primary"
          exclusive
          value={showShippingState}
          onChange={onChangeShippingState}
        >
          <ToggleButton value="receive">到着</ToggleButton>
          <ToggleButton value="send">運送中</ToggleButton>
        </ToggleButtonGroup>

        <DataGrid
          sx={{
            "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
              py: "8px",
            },
          }}
          rows={rows}
          columns={columns}
          pageSize={12}
          rowsPerPageOptions={[12]}
          getRowHeight={() => "auto"}
        />
      </Box>
      {/* dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>受け入れ</DialogTitle>
        <DialogContent>
          <DialogContentText>この操作は元に戻せません。</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>キャンセル</Button>
          <Button autoFocus onClick={handleAccept}>
            確認
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Shipping;
