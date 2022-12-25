export const roles = [
  { roleValue: 1, text: "管理者" },
  { roleValue: 2, text: "工場" },
  { roleValue: 3, text: "エージェント" },
  { roleValue: 4, text: "保証センター" },
];

export const typeErrorCodeList = ["ERR-SC", "ERR-HE", "ERR-CH"];

export const defineRoutesByRole = [
  ["/", "/product_line", "/accounts"],
  [
    "/",
    "/product_line",
    "/warehouses",
    "/error_products",
    "/product_line_packages",
    "/shipping",
    "/requests",
  ],
  [
    "/",
    "/product_line",
    "/warehouses",
    "/product_line_products",
    "/products_sold",
    "/shipping",
    "/requests",
    "/package_management",
  ],
  ["/", "/warehouses", "/product_guarantee", "/shipping", "/requests"],
];
