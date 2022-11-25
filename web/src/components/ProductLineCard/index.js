import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductLineById } from "../../redux/actions/productLineAction";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { MenuItem, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createPackage } from "../../redux/actions/packageAction";

export default function ProductLineCard({ productLine, warehouses }) {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isPackageCreate, setIsPackageCreate] = useState(true);
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
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          {auth.user.role === 1 && (
            <>
              <Button>編集</Button>
              <Button color="error" onClick={handleClickOpenDialog}>
                削除
              </Button>
            </>
          )}
          {auth.user.role === 2 && (
            <Button onClick={handleClickOpenDialog}>パッケージ作成</Button>
          )}
        </CardActions>
      </Card>
      {/* Dialog */}
      {isPackageCreate ? (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>パッケージ作成</DialogTitle>
          <DialogContent>
            <DialogContentText mb={1}>
              {`${productLine.model} - RAM: ${productLine.ram} - Memory: ${productLine.memory} - Color: ${productLine.color}`}
            </DialogContentText>
            <TextField
              margin="dense"
              id="warehouseId"
              select
              label="倉庫"
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
              label="数量"
              type="number"
              fullWidth
              variant="standard"
              name="quantity"
              value={quantity}
              onChange={onChangeDataInput}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>キャンセル</Button>
            <Button onClick={handleCreatePackage}>作成</Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            削除してもよろしいですか。
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              この操作は元に戻せません。
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>キャンセル</Button>
            <Button autoFocus onClick={handleDeleteProductLine}>
              削除
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
