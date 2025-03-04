/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { removeWishListItem } from "../../../Functions/removeWishListItem";
import { removeFromCart } from "../../../Functions/wishlistService";
import { useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { RiCloseLargeFill } from "react-icons/ri";
const CCcard = ({
  productId,
  image,
  category,
  title,
  price,
  calculateTotalPrice,
  quantity,
  setToalquantity,
  updateQuantity,
  removeBtn,
  removeBtnCart,
  quantityBtn,
  userID,
  staticQuantityButton,
  // quantitTotal,
}) => {
  const [temQuantity, setTempQuantity] = useState(quantity);
  const dispatch = useDispatch();

  const customFonts = {
    fontSize: "small",
  };

  // Function to increase quantity
  const increaseQuantity = () => {
    setTempQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      updateQuantity(productId, newQuantity);
      calculateTotalPrice(newQuantity); // Update total price
      return newQuantity;
    });
    setToalquantity((prevTotal) => prevTotal + 1);
  };

  // Function to decrease quantity
  const decreaseQuantity = () => {
    if (temQuantity > 1) {
      setTempQuantity((prevQuantity) => {
        const newQuantity = prevQuantity - 1;
        // setToalquantity((prevTotal) => prevTotal - 1);
        updateQuantity(productId, newQuantity);
        calculateTotalPrice(newQuantity); // Update total price
        return newQuantity;
      });
      setToalquantity((prevTotal) => prevTotal - 1);
    }
  };

  return (
    <Row className="py-2 mb-lg-3 mb-2 bg- rounded border justify-content-around justify-content-lg-between position-relative cccard">
      <Col
        xs={2}
        lg={2}
        className="bg-white rounded d-flex align-items-center justify-content-center"
      >
        <Link to={`/SingleProductPage/${productId}/${category}`}>
          <div
            className="bg-white rounded d-flex align-items-center justify-content-center"
            style={{ width: "80px", height: "90px" }}
          >
            <div className="checkOut-img">
              <img src={image} alt="" />
            </div>
          </div>
        </Link>
      </Col>
      <Col
        xs={6}
        lg={6}
        className="d-flex flex-column align-items-start justify-content-center"
      >
        <div className="cccart-text">
          <h6 style={customFonts}>{category}</h6>
          <h5 className="p-title my-3 my-lg-0" style={customFonts}>
            {title}
          </h5>
          <div className="d-flex align-items-center my-3 my-lg-2">
            <p className="mb-0 p-price me-3" style={customFonts}>
              ${price}
            </p>
            <button className="checkout-row_button">19% OFFER</button>
          </div>
        </div>
        {!quantity && (
          <button
            className=" outline-0 rounded-pill bg-white text-dark  py-lg-1 px-lg-2  mt-lg-2 spc-btn"
            style={{
              fontSize: "small",
              border: "1px solid #8c52ff",
              maxWidth: "130px",
            }}
          >
            move to cart
          </button>
        )}
      </Col>
      {quantityBtn && (
        <Col
          xs={3}
          lg={2}
          className="  d-flex align-items-center justify-content-start justify-contentc-lg-enter"
        >
          <div className="d-flex align-items-center mt-2 quantity-btn">
            <button onClick={decreaseQuantity}>-</button>
            <span className="mx-2">{temQuantity}</span>
            <button onClick={increaseQuantity}>+</button>
          </div>
        </Col>
      )}
      {/* remove button */}
      {removeBtn &&
        (removeBtnCart ? (
          <div
            // xs={2}
            // lg={2}
            className="remove   d-flex align-items-center justify-content-start  justify-content-lg-center"
            onClick={() => removeFromCart(userID, productId, dispatch)}
          >
            <button className="">
              <RiCloseLargeFill />
            </button>
          </div>
        ) : (
          <Col
            xs={2}
            lg={2}
            className="remove  d-flex align-items-center justify-content-start  justify-content-lg-center"
            onClick={() => removeWishListItem(userID, productId, dispatch)}
          >
            <button className="">
              <RiCloseLargeFill />
            </button>
          </Col>
        ))}

      {staticQuantityButton && (
        <Col xs={2} className="d-flex align-items-center jusity-content-center">
          <button
            style={{
              width: "30px",
              height: "30px",
              border: "1px solid #6441c7",
              background: "transparent",
              outline: "none",
              borderRadius: "3px",
              fontSize: "small",
            }}
          >
            {temQuantity}
          </button>
        </Col>
      )}
    </Row>
  );
};

export default CCcard;
