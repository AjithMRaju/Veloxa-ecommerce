import { Fragment } from "react";
import { Alert, IconButton } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSnackBar,
  setSnackBar,
  selectSnackbarMsg,
} from "../../Utils/Redux/productSlice";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";

const SnackbarMesg = () => {
  const Open = useSelector(selectSnackBar);
  const AlertMessage = useSelector(selectSnackbarMsg);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setSnackBar(false));
  };

  const action = (
    <Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <IoClose fontSize="large" />
      </IconButton>
    </Fragment>
  );

  return (
    <div>
      <Snackbar
        open={Open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={handleClose}
        // message="Added to WishList"
        action={action}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {AlertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackbarMesg;
