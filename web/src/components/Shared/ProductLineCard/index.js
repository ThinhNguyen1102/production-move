import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductLineById } from "../../../redux/actions/productLineAction";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Link, MenuItem, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createPackage } from "../../../redux/actions/packageAction";
import { Link as RouterLink, useLocation } from "react-router-dom";

export default function ProductLineCard({ productLine, warehouses }) {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteProductLine = () => {
    handleCloseDialog();
    dispatch(deleteProductLineById({ auth, id: productLine.id }));
  };

  const [packageData, setPackageData] = useState({
    productLineId: productLine.id,
    warehouseId: "",
    quantity: "",
  });
  const { productLineId, warehouseId, quantity } = packageData;
  const onChangeDataInput = (e) => {
    setPackageData({
      ...packageData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreatePackage = () => {
    handleCloseDialog();
    dispatch(createPackage({ data: packageData, auth }));
  };

  return (
    <>
      <Card>
        <CardMedia
          component="img"
          height="140"
          image="https://image.thanhnien.vn/w1024/Uploaded/2022/aybunux/2022_08_30/1-470.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {productLine.model}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            RAM: {productLine.ram}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Memory: {productLine.memory}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Color: {productLine.color}
          </Typography>
          {auth.user.role === 3 && (
            <Typography variant="body2" color="text.secondary">
              Quantity: {productLine.quantity}
            </Typography>
          )}
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          {auth.user.role === 1 && (
            <>
              <Button>Edit</Button>
              <Button color="error" onClick={handleClickOpenDialog}>
                Delete
              </Button>
            </>
          )}
          {auth.user.role === 2 && (
            <>
              <Button onClick={handleClickOpenDialog}>Create Package</Button>
              <Link
                component={RouterLink}
                to={`/product_line_packages/${productLine.id}`}
                sx={{ textDecoration: "none" }}
              >
                <Button>Detail</Button>
              </Link>
            </>
          )}
          {auth.user.role === 3 && (
            <Link
              component={RouterLink}
              to={`/product_line_products/${productLine.id}`}
              sx={{ textDecoration: "none" }}
            >
              <Button>Detail</Button>
            </Link>
          )}
        </CardActions>
      </Card>
      {/* Dialog */}
      {auth.user.role === 1 && (
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure you want to delete ?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This operation cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button color="error" onClick={handleDeleteProductLine}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {auth.user.role === 2 && (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Create Package</DialogTitle>
          <DialogContent>
            <DialogContentText mb={1}>
              {`${productLine.model} - RAM: ${productLine.ram} - Memory: ${productLine.memory} - Color: ${productLine.color}`}
            </DialogContentText>
            <TextField
              margin="dense"
              id="warehouseId"
              select
              label="Warehouse"
              fullWidth
              variant="standard"
              name="warehouseId"
              value={warehouseId}
              onChange={onChangeDataInput}
            >
              {warehouses.map((warehouseElement) => (
                <MenuItem key={warehouseElement.id} value={warehouseElement.id}>
                  {warehouseElement.address}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              margin="dense"
              id="quantity"
              label="Quantity"
              type="number"
              fullWidth
              variant="standard"
              name="quantity"
              value={quantity}
              onChange={onChangeDataInput}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleCreatePackage}>Create</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
