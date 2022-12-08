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

  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field:
        showShippingState === "receive"
          ? "oldUnit_pTransport"
          : "newUnit_pTransport",
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
      renderCell: (params) => {
        const productTransport = params.row.product_pTransport;
        return (
          <Box>
            <Typography>{`ID: ${productTransport.prod_id}`}</Typography>
            <Typography>{`Model: ${productTransport.productLine_product.model}`}</Typography>
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
  const rows = transport.transports.map((tran) => ({
    ...tran,
    accept_action:
      showShippingState === "receive" &&
      (tran?.is_shipping ? (
        <Button color="primary" onClick={() => handleClickOpenDialog(tran?.id)}>
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

  const handleClickOpenDialog = (tranId) => {
    setTransportId(tranId);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleAccept = () => {
    dispatch(acceptProduct({ data: { transportId }, auth }));
    handleCloseDialog();
  };

  return (
    <>
      <Box p={3} sx={{ height: "calc(100vh - 144px)", width: "100%" }}>
        <ToggleButtonGroup
          sx={{ marginBottom: 3 }}
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
