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

export default function ProductLineCard({ productLine }) {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleDeleteProductLine = () => {
    handleClose();
    dispatch(deleteProductLineById({ auth, id: productLine.id }));
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
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
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button>編集</Button>
          <Button color="error" onClick={handleClickOpenDialog}>
            削除
          </Button>
        </CardActions>
      </Card>
      {/* Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleClose}
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
          <Button onClick={handleClose}>キャンセル</Button>
          <Button autoFocus onClick={handleDeleteProductLine}>
            削除
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
