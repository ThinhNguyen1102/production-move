import { Button } from "@mui/material";
import React from "react";

const columns = [
  { field: "prod_id", headerName: "Product_ID", width: 160 },
  { field: "package_id", headerName: "Package_ID", width: 160 },
  {
    field: "sell_product",
    headerName: "削除",
    width: 130,
    renderCell: (params) => {
      return (
        <Button color="primary" onClick={params.value.onClick}>
          Sell
        </Button>
      );
    },
  },
];
const ProductGuarantee = () => {
  return (
    <>
      {/* <Box p={3} sx={{ height: "calc(100vh - 72px)", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.package_id}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </Box> */}
    </>
  );
};

export default ProductGuarantee;
