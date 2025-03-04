import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setShowLogin,
  selectUserAuth,
  selectCartpoducts,
  getCartProducts,
  selectAllInitialProducts,
} from "../../Utils/Redux/productSlice";
import { getCart } from "../../Functions/wishlistService";
import emptyCart from "../../assets/Images/pngwing.com.png";
import CCcard from "../../Components/Cards/CCcard/CCcard";
import SingleProductCard from "../../Components/Cards/SingleProductCard/SingleProductCard";
import SpaceAdjuster from "../../Components/SpaceAdjuster/SpaceAdjuster";
import { Col } from "react-bootstrap";
// ---
const Cartpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectUserAuth);
  const cartProducts = useSelector(selectCartpoducts);
  const exploreMoreProducts = useSelector(selectAllInitialProducts);
  const [quantitTotal, setToalquantity] = useState(0);
  const [eachItemQuantity, setEachitemQuantity] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);
  const [error, setError] = useState(null);
  const chechoutProducts = cartProducts;

  // ---
  useEffect(() => {
    const initialQuantities = cartProducts.map((product) => ({
      productId: product?.productId,
      productQuantity: product?.quantity,
    }));
    setEachitemQuantity(initialQuantities);
  }, [cartProducts]);

  // useEffect(() => {
  //   const checkWishlist = async () => {
  //     if (currentUser) {
  //       const cartList = await getCart(currentUser.uid);
  //       dispatch(getCartProducts(cartList));
  //     }
  //   };

  //   checkWishlist();
  // }, [currentUser]);

  useEffect(() => {
    const checkWishlist = async () => {
      if (currentUser) {
        setCartLoading(true); // Set loading to true before fetching data
        try {
          const cartList = await getCart(currentUser.uid);
          dispatch(getCartProducts(cartList));
        } catch (error) {
          console.error("Error fetching cart:", error);
          setError("Failed to fetch cart data. Please try again.");
        } finally {
          setCartLoading(false);
        }
      }
    };

    checkWishlist();
  }, [currentUser, dispatch]);

  useEffect(() => {
    setToalquantity(
      cartProducts.reduce((total, cart) => {
        return total + cart?.quantity;
      }, 0)
    );
  }, [cartProducts]);

  // CALCULATION OF CART PRODUCTS SUBTOTAL
  const totalPrice = () =>
    cartProducts?.reduce((total, cart) => {
      return total + cart?.price * quantitTotal; // Use cart.quantity instead of quantitTotal
    }, 0);

  const subtotal = totalPrice();
  const gst = subtotal * 0.19; // 19% GST
  const shippingFee = gst + 4.99;
  const totalAmount = Math.floor(shippingFee); // Total amount including GST

  const handleLogin = () => {
    dispatch(setShowLogin(true));
  };

  const updateQuantity = (productId, newQuantity) => {
    setEachitemQuantity((prevQuantities) => {
      const existingProductIndex = prevQuantities.findIndex(
        (item) => item?.productId === productId
      );

      if (existingProductIndex !== -1) {
        const updatedQuantities = [...prevQuantities];
        updatedQuantities[existingProductIndex].productQuantity = newQuantity;
        return updatedQuantities;
      } else {
        // return [...prevQuantities, { productId, productQuantity: newQuantity }];
        return [
          ...prevQuantities,
          {
            productId,
            productQuantity:
              newQuantity ||
              cartProducts?.find((p) => p.id === productId)?.quantity,
          },
        ];
      }
    });
  };

  if (cartLoading) {
    return (
      <section
        style={{ width: "100vw", height: "100vh" }}
        className="d-flex align-items-center justify-content-center"
      >
        <p>Loading...</p>
      </section>
    );
  }
  if (error) {
    return (
      <section
        style={{ width: "100vw", height: "100vh" }}
        className="d-flex align-items-center justify-content-center"
      >
        <p className="text-danger">{error}</p>
      </section>
    );
  }

  return (
    <section className="cart-section bg-white my-lg-">
      <SpaceAdjuster />
      <div className="container ">
        {currentUser ? (
          cartProducts.length === 0 ? (
            <div className="w-100 d-flex justify-content-center flex-column align-items-center">
              <div className="emptyCartImag">
                <img src={emptyCart} alt="" />
              </div>
              <h1>Oops! Your cart is empty</h1>
              <button
                type="button"
                className="emptyCart my-5"
                onClick={() =>
                  navigate("/productsListing", { state: "electronics" })
                }
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="row">
              <div className="col-md-12 col-lg-8 checkout-row">
                <div className="d-flex justify-content- align-items-center  mt-5 pb-4">
                  <h4 className="me-3">Your Cart</h4>
                  <h6>{cartProducts?.length} items</h6>
                </div>

                <div className="row align-items-center justify-content-center justify-content-lg-start px-1 px-lg-3">
                  {cartProducts.map((cart, _i) => {
                    return (
                      <CCcard
                        {...cart}
                        setToalquantity={setToalquantity}
                        quantity={cart?.quantity}
                        quantityBtn={true}
                        removeBtn={true}
                        key={_i}
                        userID={currentUser?.uid}
                        updateQuantity={updateQuantity}
                        removeBtnCart
                        calculateTotalPrice={totalPrice} // Pass the total price function
                      />
                    );
                  })}
                </div>
              </div>
              <div className="col-md-12 col-lg-4 p-3">
                <div className="checkout- p-2">
                  <div className="card checkout">
                    <label className="title">Checkout</label>
                    <div className="details">
                      <span>Total Products</span>
                      <span>{quantitTotal}</span>
                      <span>Including GST:</span>
                      <span>19%</span>
                      <span>Shipping fees:</span>
                      <span>4.99$</span>
                    </div>
                    <div className="checkout--footer">
                      <label className="price text-white">
                        <sup>$</sup>
                        {totalAmount}
                      </label>
                      <button
                        className="checkout-btn "
                        onClick={() =>
                          navigate("/checkout", {
                            state: {
                              chechoutProducts,
                              eachItemQuantity,
                            },
                          })
                        }
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="d-flex align-items-center justify-content-center notificationCard-container my-5">
            <div className="notificationCard">
              <p className="notificationHeading">Push notifications</p>
              <svg className="bellIcon" viewBox="0 0 448 512">
                <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"></path>
              </svg>
              <p className="notificationPara px-5">
                Allow push notifications <br />
                so you will get latest updates
              </p>
              <div className="buttonContainer">
                <button className="AllowBtn" onClick={handleLogin}>
                  Login
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* --- */}
      <div className="container py-5">
        <h3 className="border-bottom pb-3">Explore More</h3>
        <div className="row mt-lg-3 mt-3 ">
          {exploreMoreProducts
            .filter((eachItem) => eachItem.category === "women's clothing")
            .map((eachItem) => {
              return (
                <Col
                  key={eachItem?.id}
                  xs={6}
                  lg={3}
                  xxl={2}
                  className="mb-xxl-3 mb-lg-4 mb-3 border-end border-bottom pb-3"
                >
                  <SingleProductCard {...eachItem} customWidth="100%" />
                </Col>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Cartpage;
