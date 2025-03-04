/* eslint-disable react/prop-types */
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { removeWishListItem } from "../../../Functions/removeWishListItem";
import { RiCloseLargeFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";
import { IoIosCart } from "react-icons/io";
// ---
const CheckboxCard = ({
  productId,
  category,
  image,
  title,
  price,
  removeBtn,
  userID,
  isChecked,
  existsInCart,
  onCheckboxChange,
}) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(isChecked || existsInCart);

  useEffect(() => {
    setChecked(isChecked || existsInCart);
  }, [isChecked, existsInCart]);

  const customFonts = {
    fontSize: "small",
  };

  const handleChange = (e) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    onCheckboxChange(productId, title, isChecked);
  };

  return (
    <Row className="py-2 mb-lg-3 mb-2 bg- rounded border justify-content-between justify-content-lg-between position-relative cccard">
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
          <h6 className="text-secondary" style={customFonts}>
            {category}
          </h6>
          <h5 className="p-title my-3 my-lg-0" style={customFonts}>
            {title}
          </h5>
          <div className="d-flex align-items-center my-3 my-lg-2">
            <p className="mb-0 p-price me-3" style={customFonts}>
              ${price}
            </p>
          </div>
          {existsInCart && (
            <p className="text-secondary" style={customFonts}>
              <IoIosCart fill="#6441c7" className="me-2"/>
              in cart
            </p>
          )}
        </div>
      </Col>

      <Col
        xs={2}
        lg={2}
        className="d-flex align-items-center justify-content-center"
      >
        <Checkbox
          checked={checked}
          onChange={handleChange}
          disabled={existsInCart}
          sx={{
            color: "#6441c7",
            "&.Mui-checked": {
              color: "#6441c7",
            },
            "&:hover": {
              backgroundColor: "rgba(100, 65, 199, 0.1)",
            },
          }}
        />
      </Col>

      {removeBtn && (
        <div
          className="remove  d-flex align-items-center justify-content-start  justify-content-lg-center"
          onClick={() => removeWishListItem(userID, productId, dispatch)}
        >
          <button className="">
            <RiCloseLargeFill />
          </button>
        </div>
      )}
    </Row>
  );
};

export default CheckboxCard;
