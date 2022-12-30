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
import { changePassword, logout } from "../../../redux/actions/authAction";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import CustomMenuItem from "./CustomMenuItem";
import MobileMenuItem from "./MobileMenuItem";
import navbarMenuItems from "./navbarMenuItems";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";

const initialState = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};
function NavbarMenu() {
  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpenDialog = () => {
    handleCloseUserMenu();
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setChangePasswordData({ ...initialState });
    setOpenDialog(false);
  };

  const [changePasswordData, setChangePasswordData] = useState(initialState);

  const { oldPassword, newPassword, confirmNewPassword } = changePasswordData;

  const isNotBlankFields = () => {
    return oldPassword.trim() && newPassword.trim() && confirmNewPassword.trim()
      ? true
      : false;
  };

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
          <Toolbar
            disableGutters
            sx={{
              justifyContent: { xs: "space-between" },
            }}
          >
            <Link
              component={RouterLink}
              to={"/"}
              sx={{
                padding: "4px",
                color: "#fff",
                textDecoration: "none",
                display: "flex",
                gap: "4px",
                alignItems: "center",
                display: { xs: "none", md: "flex" },
                marginRight: "12px",
              }}
            >
              <AdbIcon />
              <Typography variant="h6" sx={{ fontSize: "18px" }}>
                BigCorp
              </Typography>
            </Link>

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
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
                {navbarMenuItems[[auth.user.role - 1]].map(
                  (navbarMenuItem, index) => (
                    <MobileMenuItem
                      key={index}
                      navbarMenuItem={navbarMenuItem}
                      handleCloseNavMenu={handleCloseNavMenu}
                    />
                  )
                )}
              </Menu>
            </Box>
            <Link
              component={RouterLink}
              to={"/"}
              sx={{
                padding: "4px",
                color: "#fff",
                textDecoration: "none",
                gap: "4px",
                alignItems: "center",
                display: { xs: "flex", md: "none" },
              }}
            >
              <AdbIcon />
              <Typography variant="h6" sx={{ fontSize: "18px" }}>
                BigCorp
              </Typography>
            </Link>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                borderLeft: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              {navbarMenuItems[auth.user.role - 1].map(
                (navbarMenuItem, index) => (
                  <CustomMenuItem key={index} navbarMenuItem={navbarMenuItem} />
                )
              )}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
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
                    Change Password
                  </Typography>
                </MenuItem>

                <MenuItem onClick={() => dispatch(logout())}>
                  <LogoutIcon />
                  <Typography ml={1} textAlign="center">
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* change password dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="oldPassword"
            label="Old Password"
            type="password"
            fullWidth
            variant="standard"
            name="oldPassword"
            value={oldPassword}
            onChange={onChangeDataInput}
          />
          <TextField
            required
            margin="dense"
            id="newPassword"
            label="New Password"
            type="password"
            fullWidth
            variant="standard"
            name="newPassword"
            value={newPassword}
            onChange={onChangeDataInput}
          />
          <TextField
            required
            margin="dense"
            id="confirmNewPassword"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="standard"
            name="confirmNewPassword"
            value={confirmNewPassword}
            onChange={onChangeDataInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            disabled={!isNotBlankFields()}
            onClick={handleSubmitFormChangePassword}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default NavbarMenu;
