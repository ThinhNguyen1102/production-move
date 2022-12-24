const defineRoutesByRole = [
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
  ],
  ["/", "/warehouses", "/product_guarantee", "/shipping", "/requests"],
];

export default defineRoutesByRole;
