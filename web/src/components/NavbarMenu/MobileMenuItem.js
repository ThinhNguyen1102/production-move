import { Link, MenuItem, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const MobileMenuItem = ({ navbarMenuItem, handleCloseNavMenu }) => {
  return (
    <Link
      component={RouterLink}
      to={navbarMenuItem.pageLink}
      sx={{
        color: "#000",
        textDecoration: "none",
      }}
      onClick={handleCloseNavMenu}
    >
      <MenuItem>
        {navbarMenuItem.icon}
        <Typography ml={1} textAlign="center">
          {navbarMenuItem.text}
        </Typography>
      </MenuItem>
    </Link>
  );
};

export default MobileMenuItem;
