import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import BarChartIcon from "@mui/icons-material/BarChart";
import WarehouseIcon from "@mui/icons-material/Warehouse";

const navbarMenuItems = [
  [
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
  ],
  [
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
      icon: <WarehouseIcon />,
      text: "倉庫",
      pageLink: "/warehouses",
    },
  ],
];

export default navbarMenuItems;
