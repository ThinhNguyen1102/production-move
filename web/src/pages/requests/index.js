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
import AddIcon from "@mui/icons-material/Add";

const Requests = () => {
  return (
    <>
      <Box p={3} sx={{ height: "calc(100vh - 144px)", width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
            marginBottom: 3,
          }}
        >
          <Button
            variant="contained"
            sx={{ alignSelf: "end" }}
            startIcon={<AddIcon />}
            // onClick={handleClickOpenDialog}
          >
            要求作成
          </Button>
          <ToggleButtonGroup
            color="primary"
            exclusive
            // value={showShippingState}
            // onChange={onChangeShippingState}
          >
            <ToggleButton value="receive">到着</ToggleButton>
            <ToggleButton value="send">運送中</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* <DataGrid
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
        /> */}
      </Box>
      {/* dialog */}
      {/* <Dialog open={openDialog} onClose={handleCloseDialog}>
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
      </Dialog> */}
    </>
  );
};

export default Requests;
