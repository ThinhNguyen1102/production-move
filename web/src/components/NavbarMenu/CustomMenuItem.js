import { Link, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const CustomMenuItem = ({ navbarMenuItem }) => {
  return (
    <Link
      component={RouterLink}
      to={navbarMenuItem.pageLink}
      p={1}
      sx={{
        width: "110px",
        color: "#fff",
        textDecoration: "none",
        display: "flex",
        gap: 1,
        flexDirection: "column",
        alignItems: "center",
        borderRight: "1px solid rgba(255, 255, 255, 0.2)",
        "&:hover": {},
      }}
    >
      {navbarMenuItem.icon}
      <Typography sx={{ fontSize: "12px" }}>{navbarMenuItem.text}</Typography>
    </Link>
  );
};

export default CustomMenuItem;
