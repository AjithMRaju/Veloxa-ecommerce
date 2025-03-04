import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  setEnableAlert,
  selcetEnableAlert,
  selectAlertMessage,
} from "../../Utils/Redux/productSlice";

export default function AlertDialog() {
  const dispatch = useDispatch();
  const open = useSelector(selcetEnableAlert);
  const message = useSelector(selectAlertMessage);

  const handleClose = () => {
    dispatch(setEnableAlert(false));
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title"></DialogTitle> */}
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "red", textAlign: "center" }}
          >
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
