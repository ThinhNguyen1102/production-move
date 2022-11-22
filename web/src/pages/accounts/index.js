import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { Button, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createUser, getAllUser } from "../../redux/actions/userAction";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "name",
    headerName: "名前",
    width: 150,
  },
  {
    field: "email",
    headerName: "マールアドレス",
    width: 250,
  },
  {
    field: "phone_number",
    headerName: "電話番号",
    width: 130,
  },
  {
    field: "role",
    headerName: "権限",
    width: 80,
  },
  {
    field: "address",
    headerName: "住所",
    width: 280,
  },
];
const roles = [
  { roleValue: 1, text: "管理者" },
  { roleValue: 2, text: "工場" },
  { roleValue: 3, text: "エージェント" },
  { roleValue: 4, text: "保険センター" },
];
const initialState = {
  name: "",
  email: "",
  address: "",
  phone_number: "",
  role: 1,
  password: "",
  confirmPassword: "",
};
const Accounts = () => {
  const { auth, user } = useSelector((state) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUser({ auth }));
  }, [dispatch]);

  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleSubmit = () => {
    dispatch(createUser({ data: userData, auth }));
    handleCloseDialog();
  };

  console.log(user.users);
  const rows = user.users;

  const [userData, setUserData] = useState(initialState);
  const {
    name,
    email,
    address,
    phone_number,
    role,
    password,
    confirmPassword,
  } = userData;
  const onChangeDataInput = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Box p={3} sx={{ height: 600, width: "100%" }}>
        <Button
          variant="contained"
          startIcon={<PersonAddAlt1Icon />}
          sx={{ marginBottom: 3 }}
          onClick={handleClickOpenDialog}
        >
          アカウント追加
        </Button>

        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={12}
          rowsPerPageOptions={[12]}
        />
      </Box>

      {/* dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>アカウント追加</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="名前"
            fullWidth
            variant="standard"
            name="name"
            value={name}
            onChange={onChangeDataInput}
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="メールアドレス"
            type="email"
            fullWidth
            variant="standard"
            name="email"
            value={email}
            onChange={onChangeDataInput}
          />
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
            onChange={onChangeDataInput}
          >
            {roles.map((option) => (
              <MenuItem key={option.roleValue} value={option.roleValue}>
                {option.text}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="パスワード"
            type="password"
            fullWidth
            variant="standard"
            name="password"
            value={password}
            onChange={onChangeDataInput}
          />
          <TextField
            autoFocus
            margin="dense"
            id="confirmPassword"
            label="パスワード（確認用）"
            type="password"
            fullWidth
            variant="standard"
            name="confirmPassword"
            value={confirmPassword}
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

export default Accounts;
