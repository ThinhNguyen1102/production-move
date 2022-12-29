import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import BarChartIcon from "@mui/icons-material/BarChart";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import DevicesIcon from "@mui/icons-material/Devices";
import PaidIcon from "@mui/icons-material/Paid";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SystemSecurityUpdateWarningIcon from "@mui/icons-material/SystemSecurityUpdateWarning";
import AssignmentIcon from "@mui/icons-material/Assignment";
import InventoryIcon from "@mui/icons-material/Inventory";

const navbarMenuItems = [
  [
    {
      icon: <DevicesIcon />,
      text: "Product Line",
      pageLink: "/product_line",
    },
    {
      icon: <ManageAccountsIcon />,
      text: "Accounts",
      pageLink: "/accounts",
    },
  ],
  [
    {
      icon: <DevicesIcon />,
      text: "Product Line",
      pageLink: "/product_line",
    },
    {
      icon: <InventoryIcon />,
      text: "Package",
      pageLink: "/package_management",
    },
    {
      icon: <WarehouseIcon />,
      text: "Warehouse",
      pageLink: "/warehouses",
    },
    {
      icon: <LocalShippingIcon />,
      text: "Transport",
      pageLink: "/shipping",
    },
    {
      icon: <AssignmentIcon />,
      text: "Request",
      pageLink: "/requests",
    },
  ],
  [
    {
      icon: <DevicesIcon />,
      text: "Product Line",
      pageLink: "/product_line",
    },
    {
      icon: <InventoryIcon />,
      text: "Package",
      pageLink: "/package_management",
    },
    {
      icon: <PaidIcon />,
      text: "Sold Product",
      pageLink: "/products_sold",
    },
    {
      icon: <WarehouseIcon />,
      text: "Warehouse",
      pageLink: "/warehouses",
    },
    {
      icon: <LocalShippingIcon />,
      text: "Transport",
      pageLink: "/shipping",
    },
    {
      icon: <AssignmentIcon />,
      text: "Request",
      pageLink: "/requests",
    },
  ],
  [
    {
      icon: <PrecisionManufacturingIcon />,
      text: "Guarantee",
      pageLink: "/product_guarantee",
    },
    {
      icon: <WarehouseIcon />,
      text: "Warehouse",
      pageLink: "/warehouses",
    },
    {
      icon: <LocalShippingIcon />,
      text: "Transport",
      pageLink: "/shipping",
    },
    {
      icon: <AssignmentIcon />,
      text: "Request",
      pageLink: "/requests",
    },
  ],
];

export default navbarMenuItems;
