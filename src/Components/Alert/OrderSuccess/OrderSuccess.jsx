import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectOrderSuccessAlert,
  setOrderSuccessAlert,
  selectOrderDetailsId,
} from "../../../Utils/Redux/productSlice";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Typography } from "@mui/material";
import { IoCloseSharp } from "react-icons/io5";

const OrderSuccess = () => {
  const open = useSelector(selectOrderSuccessAlert);
  const orderId = useSelector(selectOrderDetailsId);
  console.log("orderId :", orderId);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // ---

  const handleClose = () => {
    dispatch(setOrderSuccessAlert(false));
  };
  const fontSize = {
    fontSize: "small",
  };

  const handleOrderDetails = () => {
    navigate(`/my-order-details/${orderId}`);
    handleClose();
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableScrollLock={true}
      >
        <DialogContent>
          <div className="d-flex flex-column align-items-center justify-content-center">
            <div className="successImg">
              <img
                src="https://www.lappymaker.com/images/greentick-unscreen.gif"
                alt=""
              />
            </div>
            <Typography variant="h5" color="green" gutterBottom>
              Thank you for your order!
            </Typography>
            <Typography variant="body1" gutterBottom>
              Congratulations! Your order has been successfully placed.
            </Typography>
            <div className="d-flex justify-content-center order-success-btn w-100 my-lg-4">
              <button
                style={{
                  background: "#6441c7",
                  fontSize: fontSize.fontSize,
                }}
                className="px-lg-3 py-lg-2 me-lg-3 text-white"
                onClick={handleOrderDetails}
              >
                Order details
              </button>
              <button
                style={{
                  border: "1px solid #6441c7",
                  fontSize: fontSize.fontSize,
                }}
                onClick={() => navigate("/")}
                className="px-lg-3 py-lg-2 bg-white"
              >
                Continue shopping
              </button>
            </div>
          </div>
        </DialogContent>
        <div
          className="position-absolute success-closeIcon"
          onClick={handleClose}
        >
          <IoCloseSharp size={25} fill="#0005" />
        </div>
      </Dialog>
    </Fragment>
  );
};

export default OrderSuccess;
