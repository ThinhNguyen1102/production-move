import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, Button, Typography } from "@mui/material";
import ProductLineCard from "../../components/Shared/ProductLineCard";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductLine,
  getAllOwnProductLine,
  getAllProductLine,
} from "../../redux/actions/productLineAction";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import { getAllOwnWarehouse } from "../../redux/actions/warehouseAction";

const initialState = {
  model: "",
  ram: "",
  memory: "",
  color: "",
  description: "",
  price: 0,
};
const ProductLine = () => {
  const { auth, productLine, warehouse } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth.user.role === 3) {
      dispatch(getAllOwnProductLine({ auth }));
    } else {
      dispatch(getAllProductLine({ auth }));
    }
    dispatch(getAllOwnWarehouse({ auth }));
  }, [dispatch]);

  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleSubmit = () => {
    dispatch(createProductLine({ data: productLineData, auth }));
    handleCloseDialog();
  };

  const [productLineData, setProductLineData] = useState(initialState);
  const { model, ram, memory, color, description, price } = productLineData;
  const onChangeDataInput = (e) => {
    setProductLineData({
      ...productLineData,
      [e.target.name]: e.target.value,
    });
  };
  console.log("productLine:", productLine);
  return (
    <>
      <Box p={3}>
        {auth.user.role === 1 && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ marginBottom: 3 }}
            onClick={handleClickOpenDialog}
          >
            Add product line
          </Button>
        )}

        <Grid container spacing={3}>
          {productLine.productLines.map((productLineElement, index) => (
            <Grid sx={12} sm={6} md={4} lg={3} xl={2} key={index}>
              <ProductLineCard
                productLine={productLineElement}
                warehouses={warehouse.warehouses}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add product line</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="model"
            label="Model"
            fullWidth
            variant="standard"
            name="model"
            value={model}
            onChange={onChangeDataInput}
          />
          <TextField
            autoFocus
            margin="dense"
            id="ram"
            label="RAM"
            fullWidth
            variant="standard"
            type="number"
            name="ram"
            value={ram}
            onChange={onChangeDataInput}
          />
          <TextField
            autoFocus
            margin="dense"
            id="memory"
            label="Memory"
            fullWidth
            type="number"
            variant="standard"
            name="memory"
            value={memory}
            onChange={onChangeDataInput}
          />
          <TextField
            autoFocus
            margin="dense"
            id="color"
            label="Color"
            fullWidth
            variant="standard"
            name="color"
            value={color}
            onChange={onChangeDataInput}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            fullWidth
            variant="standard"
            name="description"
            value={description}
            onChange={onChangeDataInput}
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price"
            fullWidth
            variant="standard"
            name="price"
            type="number"
            value={price}
            onChange={onChangeDataInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductLine;
