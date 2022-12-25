import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Chip,
  DialogContentText,
  MenuItem,
  TextField,
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
import {
  acceptRequest,
  createRequest,
  getAllRequestReceive,
  getAllRequestSend,
} from "../../redux/actions/requestAction";
import { getUserByRole } from "../../redux/actions/userAction";
import { roles } from "../../utils/constants";

const initialRequestState = {
  receiverId: "",
  content: "",
};
const initialAcceptRequestState = {
  requestId: "",
  isAccept: "",
};
const Requests = () => {
  const { auth, request, user } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [showRequestState, setShowRequestState] = useState("send");
  const [openDialog, setOpenDialog] = useState(false);
  const [openAcceptDialog, setOpenAcceptDialog] = useState(false);
  const [role, setRole] = useState("");
  const [requestData, setRequestData] = useState(initialRequestState);
  const { receiverId, content } = requestData;
  const [acceptRequestData, setAcceptRequestData] = useState(
    initialAcceptRequestState
  );
  const { requestId, isAccept } = acceptRequestData;

  useEffect(() => {
    if (showRequestState === "receive") {
      dispatch(getAllRequestReceive({ auth }));
    } else {
      dispatch(getAllRequestSend({ auth }));
    }
  }, [dispatch, showRequestState]);

  const onChangeRequestState = (e) => {
    setShowRequestState(e.target.value);
  };
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleClickOpenAcceptDialog = (requestId) => {
    setAcceptRequestData({ ...acceptRequestData, requestId });
    setOpenAcceptDialog(true);
  };
  const handleCloseAcceptDialog = () => {
    setOpenAcceptDialog(false);
  };

  const onChangeRoleInput = (e) => {
    dispatch(getUserByRole({ data: { role: e.target.value }, auth }));
    setRole(e.target.value);
  };

  const onChangeRequestDataInput = (e) => {
    setRequestData({
      ...requestData,
      [e.target.name]: e.target.value,
    });
  };
  const onChangeAcceptRequestDataInput = (e) => {
    setAcceptRequestData({
      ...acceptRequestData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitRequest = () => {
    dispatch(createRequest({ data: requestData, auth }));
    handleCloseDialog();
  };

  const handleAcceptRequest = () => {
    dispatch(acceptRequest({ data: acceptRequestData, auth }));
    handleCloseAcceptDialog();
  };

  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field:
        showRequestState === "receive" ? "sender_request" : "receiver_request",
      headerName: showRequestState === "receive" ? "Sender" : "Receiver",
      width: 150,
      valueGetter: ({ value }) => {
        return value?.name;
      },
    },
    {
      field: "content",
      headerName: "内容",
      width: 300,
    },
    {
      field: "request_status",
      headerName: "状況",
      width: 120,
      renderCell: ({ value }) => {
        if (value === "waiting") {
          return <Chip label="waiting" color="primary" />;
        } else if (value === "approved") {
          return <Chip label="approved" color="success" />;
        } else if (value === "refused") {
          return <Chip label="refused" color="neutral" />;
        }
      },
    },
    {
      field: "edit_status",
      headerName: "Edit Status",
      width: 140,
      renderCell: (params) => params.value,
    },
  ];

  const generateRequestStatus = (isDone, isAccept) => {
    if (!isDone) {
      return "waiting";
    } else {
      return isAccept ? "approved" : "refused";
    }
  };
  const rows = request.requests?.map((req) => ({
    ...req,
    request_status: generateRequestStatus(req.isDone, req.isAccept),
    edit_status: showRequestState === "receive" && (
      <Button
        color="primary"
        onClick={() => handleClickOpenAcceptDialog(req?.id)}
      >
        Edit Status
      </Button>
    ),
  }));
  return (
    <>
      <Box p={3} sx={{ height: "calc(100vh - 144px)", width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent:
              showRequestState === "send" ? "space-between" : "end",
            marginBottom: 3,
          }}
        >
          {showRequestState === "send" && (
            <Button
              variant="contained"
              sx={{ alignSelf: "end" }}
              startIcon={<AddIcon />}
              onClick={handleClickOpenDialog}
            >
              要求作成
            </Button>
          )}
          <ToggleButtonGroup
            color="primary"
            exclusive
            value={showRequestState}
            onChange={onChangeRequestState}
          >
            <ToggleButton value="send">Send</ToggleButton>
            <ToggleButton value="receive">Receive</ToggleButton>
          </ToggleButtonGroup>
        </Box>

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
        <DialogTitle>要求作成</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="role"
            select
            label="権限"
            fullWidth
            variant="standard"
            name="role"
            value={role}
            onChange={onChangeRoleInput}
          >
            {roles.map((r) => {
              if (r.roleValue !== 1 && r.roleValue !== auth.user.role) {
                return (
                  <MenuItem key={r.roleValue} value={r.roleValue}>
                    {r.text}
                  </MenuItem>
                );
              }
            })}
          </TextField>
          <TextField
            disabled={role ? false : true}
            margin="dense"
            id="receiverId"
            select
            label="ユニット"
            fullWidth
            variant="standard"
            name="receiverId"
            value={receiverId}
            onChange={onChangeRequestDataInput}
          >
            {user.users.map((u) => (
              <MenuItem key={u.id} value={u.id}>
                {u.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            multiline
            maxRows={4}
            margin="dense"
            id="content"
            label="内容"
            variant="standard"
            fullWidth
            name="content"
            value={content}
            onChange={onChangeRequestDataInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>キャンセル</Button>
          <Button onClick={handleSubmitRequest}>保存</Button>
        </DialogActions>
      </Dialog>

      {/* accept dialog */}
      <Dialog open={openAcceptDialog} onClose={handleClickOpenAcceptDialog}>
        <DialogTitle>Edit Status Request</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="isAccept"
            select
            label="Status"
            fullWidth
            variant="standard"
            name="isAccept"
            value={isAccept}
            onChange={onChangeAcceptRequestDataInput}
          >
            <MenuItem value={"true"}>Approved</MenuItem>
            <MenuItem value={"false"}>Refused</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAcceptDialog}>キャンセル</Button>
          <Button onClick={handleAcceptRequest}>保存</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Requests;
