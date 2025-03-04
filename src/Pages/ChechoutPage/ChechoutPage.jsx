/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setAlertMessage,
  setEnableAlert,
  selectDeliveryAddress,
  selectUserAuth,
  getDeliveryAdrress,
  setOrderSuccessAlert,
  setGlobalLoader,
  // setOrderDetailsId,
} from "../../Utils/Redux/productSlice";
import {
  getAddress,
  removeDeliveryAddress,
  addOrderToFirestore,
} from "../../Functions/wishlistService";
// import { RiAddLine } from "react-icons/ri";
import {
  Box,
  Card,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { couponOffers } from "../../Utils/Data/Data";
import Checkbox from "@mui/material/Checkbox";
import CCcard from "../../Components/Cards/CCcard/CCcard";
import AddForm from "../../Components/userDetails/AddForm";
import Slider from "react-slick";
import SpaceAdjuster from "../../Components/SpaceAdjuster/SpaceAdjuster";
import { FaCcApplePay } from "react-icons/fa";
import { FaCcPaypal } from "react-icons/fa6";
import { RiCloseLargeLine } from "react-icons/ri";
// import { addDoc, collection } from "firebase/firestore";
// import { db } from "../../Utils/Firbase/firebaseConfig";
// -----
const ChechoutPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  // const navigate = useNavigate();
  const currentUser = useSelector(selectUserAuth);
  const temAdress = useSelector(selectDeliveryAddress);
  const product = location.state?.chechoutProducts;
  const eachItemQuantity = location.state?.eachItemQuantity;
  // --------
  const [selectedOffers, setSelectedOffers] = useState([]);
  const [offerAnimation, setOfferAnimation] = useState(false);
  const [offerState, setOfferstate] = useState(false);
  const [quantity, setQuantity] = useState();
  const [payment, setPayment] = useState("");
  const [deliveryAdress, setDeliveryAddress] = useState([]);
  console.log("deliveryAdress :", deliveryAdress);

  // --------

  useEffect(() => {
    const checkAdress = async () => {
      try {
        const addresses = await getAddress(currentUser?.uid);
        setDeliveryAddress(addresses);
        dispatch(getDeliveryAdrress(addresses));
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
      }
    };
    checkAdress();
  }, [deliveryAdress]);

  // CALCULATE TOTAL QUANTITY
  useEffect(() => {
    setQuantity(
      product?.reduce((total, cart) => {
        return total + cart?.quantity;
      }, 0)
    );
  }, [product]);

  // CALCULATION OF CART PRODUCTS SUBTOTAL
  const totalPrice = () =>
    product?.reduce((total, cart) => {
      return total + cart?.price * cart?.quantity;
    }, 0);

  const subtotal = totalPrice();
  const gst = subtotal * 0.19; // 19% GST
  const shippingFee = gst + 4.99;
  const totalAmount = Math.floor(shippingFee); // Total amount including GST

  // HANDLE OFFER
  const handleOffer = (e) => {
    e.preventDefault();
    setOfferAnimation(true);
    setInterval(() => {
      setOfferAnimation(false);
      setOfferstate(true);
    }, 3000);
  };

  const handleCheckboxChange = (offer) => {
    setSelectedOffers((prev) =>
      prev.includes(offer)
        ? prev.filter((item) => item !== offer)
        : [...prev, offer]
    );
  };

  const handleOrder = async () => {
    dispatch(setGlobalLoader(true));
    // Check if deliveryAdress has values and payment method is selected
    if (deliveryAdress.length > 0 && payment.length > 0) {
      try {
        // Create the order details object
        const orderDetails = {
          userId: currentUser?.uid, // Add the user ID
          products: product?.map((item) => ({
            productId: item.productId || 0,
            title: item.title,
            image: item.image,
            quantity:
              eachItemQuantity?.find(
                (eachItem) => eachItem?.productId === item?.productId
              )?.productQuantity || item?.quantity,
            price: item.price,
          })),
          deliveryAddress: deliveryAdress[0], // Assuming the first address is selected
          paymentMethod: payment,
          subtotal: subtotal,
          gst: gst,
          shippingFee: shippingFee,
          totalAmount: totalAmount,
          orderCreatedAt: new Date().toISOString(), // Add the order creation timestamp
        };

        // Add the order to Firestore
        await addOrderToFirestore(orderDetails, dispatch);

        // Show success message or navigate to a success page
        dispatch(setGlobalLoader(false));
        dispatch(setOrderSuccessAlert(true));
      } catch (error) {
        dispatch(setGlobalLoader(false));
        console.error("Failed to place order: ", error);
        dispatch(setEnableAlert(true));
        dispatch(setAlertMessage("Failed to place order. Please try again."));
      } finally {
        dispatch(setGlobalLoader(false));
      }
    } else {
      if (deliveryAdress.length === 0) {
        dispatch(setGlobalLoader(false));
        dispatch(setEnableAlert(true));
        dispatch(setAlertMessage("Please select your address..."));
      } else if (payment.length === 0) {
        dispatch(setGlobalLoader(false));
        dispatch(setEnableAlert(true));
        dispatch(setAlertMessage("Please choose a payment method..."));
      }
    }
  };

  // TESTING

  return (
    <section className="checkout-wrapper bg-white py-4">
      <SpaceAdjuster />
      <div className="container">
        <div className="row  p-lg-4">
          <div className="col-lg-8 checkout-row p-4">
            {product?.map((items, _i) => {
              const newQuantity = eachItemQuantity?.find(
                (eachItem) => eachItem?.productId === items?.productId
              );

              return (
                <CCcard
                  key={_i}
                  {...items}
                  // calculateTotalPrice={calculateTotalPrice}
                  setQuantity={setQuantity}
                  quantity={newQuantity?.productQuantity || items?.quantity}
                  staticQuantityButton
                />
              );
            })}
            {/* ADDRESS */}
            <div className="check-btns d-flex justify-content-between align-items-center mt-5">
              <p>Select Delivery Address</p>
              <div>
                <AddForm />
              </div>
            </div>
            <DefaultAddress temAdress={temAdress} />

            <div className="my-5">
              <p>Choose payment method</p>
              <UpiPayment setPayment={setPayment} payment={payment} />
            </div>
          </div>

          {/* checkout summary */}
          <div className="col-lg-4 ">
            <div className="checkout- p-2">
              <div className="card checkout">
                <label className="title">Checkout</label>
                <div className="details">
                  <span>Total Products</span>
                  <span>{quantity}</span>
                  <span>Including GST:</span>
                  <span>19%</span>
                  <span>Shipping fees:</span>
                  <span>4.99</span>
                </div>
                <div className="checkout--footer">
                  <label className="price text-white">
                    <sup>$</sup>
                    {totalAmount}
                  </label>
                  <button className="checkout-btn" onClick={handleOrder}>
                    Place Order
                  </button>
                </div>
              </div>
              {/* COUPENS APPLY */}
              <div
                style={{
                  border: "2px dotted #00000030",
                  background: "white",
                }}
                className="mt-5 offer-wraper"
              >
                <Box sx={{ p: 3, height: "100%" }}>
                  <Typography variant="h6" gutterBottom>
                    Apply Coupons
                  </Typography>
                  <div className="my-3 apply-coupon">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={selectedOffers.map((offer) => offer.code)}
                    />
                    <button onClick={handleOffer}>Apply</button>
                  </div>
                  <div className="fkd">
                    {!offerState ? (
                      <>
                        {!offerAnimation ? (
                          <>
                            <p className="my-3 font-nomral">
                              Available coupons
                            </p>
                            {couponOffers.map((offer, index) => (
                              <Box key={index} sx={{ mb: 2 }}>
                                <FormControlLabel
                                  sx={{
                                    display: "flex",
                                    alignItems: "start",
                                  }}
                                  control={
                                    <Checkbox
                                      sx={{
                                        padding: "0 15px 0 0",
                                      }}
                                      checked={selectedOffers.includes(offer)}
                                      onChange={() =>
                                        handleCheckboxChange(offer)
                                      }
                                    />
                                  }
                                  label={
                                    <Box>
                                      <Typography className="text-dark">
                                        Savings : {offer.savings}
                                      </Typography>
                                      <Typography className="text-dark">
                                        {offer.code}
                                      </Typography>
                                      <Typography variant="body2">
                                        {offer.description}
                                      </Typography>
                                      <Typography
                                        variant="caption"
                                        color="primary"
                                      >
                                        {offer.terms}
                                      </Typography>
                                    </Box>
                                  }
                                />
                              </Box>
                            ))}
                          </>
                        ) : (
                          <Box
                            sx={{
                              display: "flex",
                              width: "100%",
                              height: "400px",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <CircularProgress color="success" />
                          </Box>
                        )}
                      </>
                    ) : (
                      <p className="text-danger text-center">
                        Offers are not available
                      </p>
                    )}
                  </div>
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChechoutPage;

// ADDRESS
export const DefaultAddress = () => {
  const [selectAdrres, setSelectAddress] = useState(0);
  const currentUser = useSelector(selectUserAuth);
  const temAdress = useSelector(selectDeliveryAddress);
  const disaptch = useDispatch();

  // selecting the address
  const activeAddress = (id) => {
    setSelectAddress(id);
  };

  const handleRemoveAddress = async (addressId) => {
    try {
      await removeDeliveryAddress(currentUser.uid, addressId, disaptch);
    } catch (error) {
      console.error("Failed to remove address:", error);
    }
  };

  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3, // Show 4 slides on large devices
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Tablets
        settings: {
          slidesToShow: 2, // Show 2 slides on tablets
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600, // Mobile devices
        settings: {
          slidesToShow: 1, // Show 1 slide on mobile devices
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="slider-container mt-5 ">
      <Slider {...settings}>
        {temAdress?.length > 0 ? (
          temAdress?.map((address, index) => {
            return (
              <div key={index} className=" mb-4 ">
                <div
                  className={`${
                    index === selectAdrres
                      ? "active-address-box"
                      : "address-box"
                  } p-3 position-relative details mx-2`}
                  // className="address-box p-3 position-relative"
                  onClick={() => activeAddress(index)}
                >
                  <h5 className="mb-2 addressIndex"> {index + 1}</h5>
                  <p className="mb-0">Name: {address.name}</p>
                  <p className="mb-0">Age: {address.age}</p>
                  <p className="mb-0">Gender: {address.gender}</p>
                  <p className="mb-0">Phone: {address.phoneNumber}</p>
                  <p className="mb-0">House No: {address.houseNumber}</p>
                  <p className="mb-0">{address.state}</p>
                  <p className="mb-0">{address.country}</p>
                  <p className="mb-0">Pincod: {address.pincode}</p>
                  <div
                    className="remove-icon"
                    onClick={() => handleRemoveAddress(address?.id)}
                  >
                    <RiCloseLargeLine />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-danger text-center" style={{ fontWeight: "700" }}>
            No default address available. Please add an address.
          </p>
        )}
      </Slider>
    </div>
  );
};

// PAYMENT
export const UpiPayment = ({ setPayment }) => {
  const [selectedMethod, setSelectedMethod] = useState("");

  const handleChange = (event) => {
    setSelectedMethod(event.target.value);
    setPayment(event.target.value);
  };

  return (
    <div className="payment-container my-3 p-3">
      <Box
        sx={{
          maxWidth: 400,
          p: 2,
          bgcolor: "white",
          borderRadius: 2,
        }}
      >
        <RadioGroup value={selectedMethod} onChange={handleChange}>
          <Card
            variant="outlined"
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              p: 2,
              borderRadius: 2,
              borderColor: selectedMethod === "applePay" ? "green" : "grey.300",
            }}
          >
            <FormControlLabel
              value="applePay"
              control={<Radio />}
              label={
                <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
                  <FaCcApplePay size={50} />
                  <Typography ml={1}>Apple Pay</Typography>
                </Box>
              }
              sx={{ flexGrow: 1, m: 0 }}
            />
          </Card>
          <Card
            variant="outlined"
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              borderRadius: 2,
              borderColor: selectedMethod === "paypal" ? "green" : "grey.300",
            }}
          >
            <FormControlLabel
              value="paypal"
              control={<Radio />}
              label={
                <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
                  <FaCcPaypal size={50} />
                  <Typography ml={1}>PayPal</Typography>
                </Box>
              }
            />
          </Card>
        </RadioGroup>
      </Box>
    </div>
  );
};
