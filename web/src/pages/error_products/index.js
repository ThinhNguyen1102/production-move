import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { getAllOwnProductSold } from "../../redux/actions/productAction";

const columns = [
  { field: "prod_id", headerName: "Product_ID", width: 160 },
  { field: "package_id", headerName: "Package_ID", width: 160 },
];

const ErrorProducts = () => {
  const { auth, product } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOwnProductSold({ auth }));
  }, [dispatch]);

  const rows = product.products;
  return (
    <>
      <Box p={3} sx={{ height: "calc(100vh - 72px)", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.prod_id}
          pageSize={11}
          rowsPerPageOptions={[11]}
        />
      </Box>
    </>
  );
};

export default ErrorProducts;
