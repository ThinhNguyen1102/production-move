import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import BarChartIcon from "@mui/icons-material/BarChart";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import DevicesIcon from "@mui/icons-material/Devices";
import PaidIcon from "@mui/icons-material/Paid";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const navbarMenuItems = [
  [
    {
      icon: <BarChartIcon />,
      text: "商品統計",
      pageLink: "/",
    },
    {
      icon: <DevicesIcon />,
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
      icon: <DevicesIcon />,
      text: "商品ライン",
      pageLink: "/product_line",
    },
    {
      icon: <WarehouseIcon />,
      text: "倉庫",
      pageLink: "/warehouses",
    },
    {
      icon: <LocalShippingIcon />,
      text: "運送管理",
      pageLink: "/shipping",
    },
  ],
  [
    {
      icon: <BarChartIcon />,
      text: "商品統計",
      pageLink: "/",
    },
    {
      icon: <DevicesIcon />,
      text: "商品ライン",
      pageLink: "/product_line",
    },
    {
      icon: <PaidIcon />,
      text: "販売した商品",
      pageLink: "/products_sold",
    },
    {
      icon: <WarehouseIcon />,
      text: "倉庫",
      pageLink: "/warehouses",
    },
    {
      icon: <LocalShippingIcon />,
      text: "運送管理",
      pageLink: "/shipping",
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
      text: "商品保証",
      pageLink: "/product_guarantee",
    },
    {
      icon: <WarehouseIcon />,
      text: "倉庫",
      pageLink: "/warehouses",
    },
    {
      icon: <LocalShippingIcon />,
      text: "運送管理",
      pageLink: "/shipping",
    },
  ],
];

export default navbarMenuItems;
