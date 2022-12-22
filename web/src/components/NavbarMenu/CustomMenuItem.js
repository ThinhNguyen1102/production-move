import { Link, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

const CustomMenuItem = ({ navbarMenuItem }) => {
  const location = useLocation();
  let routePathPattern = location.pathname;

  return (
    <Link
      component={RouterLink}
      to={navbarMenuItem.pageLink}
      sx={{
        padding: "12px 8px",
        width: "100px",
        color: "#fff",
        textDecoration: "none",
        display: "flex",
        gap: "4px",
        flexDirection: "column",
        alignItems: "center",
        borderRight: "1px solid rgba(255, 255, 255, 0.2)",
        backgroundColor: `${
          routePathPattern === navbarMenuItem.pageLink
            ? "primary.dark"
            : "primary.main"
        }`,
      }}
    >
      {navbarMenuItem.icon}
      <Typography sx={{ fontSize: "12px" }}>{navbarMenuItem.text}</Typography>
    </Link>
  );
};

export default CustomMenuItem;
