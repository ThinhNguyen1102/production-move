import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import { changePassword, logout } from "../../redux/actions/authAction";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CustomMenuItem from "./CustomMenuItem";
import MobileMenuItem from "./MobileMenuItem";
import BarChartIcon from "@mui/icons-material/BarChart";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import WarehouseIcon from "@mui/icons-material/Warehouse";

const navbarMenuItems = [
  {
    icon: <BarChartIcon />,
    text: "商品統計",
    pageLink: "/",
  },
  {
    icon: <PrecisionManufacturingIcon />,
    text: "商品ライン",
    pageLink: "/product_line",
  },
  {
    icon: <ManageAccountsIcon />,
    text: "アカウント管理",
    pageLink: "/accounts",
  },
  {
    icon: <WarehouseIcon />,
    text: "倉庫",
    pageLink: "/warehouses",
  },
];
const initialState = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};
function NavbarMenu() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpenDialog = () => {
    handleCloseUserMenu();
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [changePasswordData, setChangePasswordData] = useState(initialState);

  const { oldPassword, newPassword, confirmNewPassword } = changePasswordData;

  const onChangeDataInput = (e) => {
    setChangePasswordData({
      ...changePasswordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitFormChangePassword = () => {
    dispatch(changePassword({ changePasswordData, auth }));
    handleCloseDialog();
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {navbarMenuItems.map((navbarMenuItem, index) => (
                  <MobileMenuItem
                    key={index}
                    navbarMenuItem={navbarMenuItem}
                    handleCloseNavMenu={handleCloseNavMenu}
                  />
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                borderLeft: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              {navbarMenuItems.map((navbarMenuItem, index) => (
                <CustomMenuItem key={index} navbarMenuItem={navbarMenuItem} />
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <IconButton sx={{ mr: 2, color: "#fff" }}>
                <NotificationsNoneOutlinedIcon />
              </IconButton>
              <Button
                onClick={handleOpenUserMenu}
                variant="text"
                endIcon={
                  !Boolean(anchorElUser) ? (
                    <KeyboardArrowDownIcon />
                  ) : (
                    <KeyboardArrowUpIcon />
                  )
                }
                sx={{ color: "#fff" }}
              >
                {auth.user.name}
              </Button>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleClickOpenDialog}>
                  <EditIcon />
                  <Typography ml={1} textAlign="center">
                    パスワード変更
                  </Typography>
                </MenuItem>

                <MenuItem onClick={() => dispatch(logout())}>
                  <LogoutIcon />
                  <Typography ml={1} textAlign="center">
                    ログアウト
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* change password dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>パスワード変更</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="oldPassword"
            label="現在のパスワード"
            type="password"
            fullWidth
            variant="standard"
            name="oldPassword"
            value={oldPassword}
            onChange={onChangeDataInput}
          />
          <TextField
            autoFocus
            margin="dense"
            id="newPassword"
            label="新しいパスワード"
            type="password"
            fullWidth
            variant="standard"
            name="newPassword"
            value={newPassword}
            onChange={onChangeDataInput}
          />
          <TextField
            autoFocus
            margin="dense"
            id="confirmNewPassword"
            label="新しいパスワード（確認用）"
            type="password"
            fullWidth
            variant="standard"
            name="confirmNewPassword"
            value={confirmNewPassword}
            onChange={onChangeDataInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>キャンセル</Button>
          <Button onClick={handleSubmitFormChangePassword}>保存</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default NavbarMenu;
