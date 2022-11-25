import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllPackageByUnit } from "../../redux/actions/packageAction";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const columns = [
  { field: "package_id", headerName: "Package_ID", width: 150 },
  {
    field: "quantity",
    headerName: "数量",
    width: 150,
  },
];
const ProductLinePackage = () => {
  const { id } = useParams();
  const { auth, packageReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPackageByUnit({ data: { productLineId: id }, auth }));
  }, [dispatch]);

  const rows = packageReducer.packages;
  return (
    <Box p={3} sx={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.package_id}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </Box>
  );
};

export default ProductLinePackage;
