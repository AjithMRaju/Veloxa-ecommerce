/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { IoPricetags } from "react-icons/io5";
import { CiStar } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectUserAuth,
  setAlertMessage,
  setEnableAlert,
  setGlobalLoader,
  setSnackBar,
  setSnackBarMessage,
} from "../../../Utils/Redux/productSlice";
import {
  addToCart,
  addToWishlist,
  getCart,
  getWishlist,
} from "../../../Functions/wishlistService";
import SniperLoading from "../../Loaders/SniperLoading";

const SingleProductCard = ({
  image,
  category,
  title,
  customWidth,
  rating,
  price,
  id,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUserAuth);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [loading, setLoading] = useState(false);

  const quantity = 1;

  const bestSellerTag = rating?.rate >= 4.1 ? true : false;

  useEffect(() => {
    const checkWishlist = async () => {
      if (currentUser) {
        const wishlist = await getWishlist(currentUser?.uid);
        const exists = wishlist?.some((item) => item?.productId === id);
        setIsInWishlist(exists);
      }
    };

    checkWishlist();
  }, [id, currentUser]);

  // product adding to wishList
  const handleWhisList = async () => {
    dispatch(setGlobalLoader(true));
    if (!currentUser?.uid) {
      // Show alert that user needs to log in
      dispatch(setGlobalLoader(false));
      dispatch(setEnableAlert(true));
      dispatch(
        setAlertMessage("Please log in to add products to your wishlist.")
      );
      return;
    }

    const wishlist = await getWishlist(currentUser.uid);
    const exists = wishlist.some((item) => item.productId === id);

    if (exists) {
      // Show alert that product is already in wishlist
      dispatch(setEnableAlert(true));
      dispatch(setAlertMessage(`${title} is already in your wishlist.`));
      dispatch(setGlobalLoader(false));
    } else {
      // Add product to wishlist
      const result = await addToWishlist(currentUser?.uid, id, dispatch, {
        title,
        price,
        image,
        rating,
        category,
      });

      if (!result.exists) {
        // Show success alert
        dispatch(setSnackBar(true));
        dispatch(setSnackBarMessage("Added to Wishlist"));

        dispatch(setGlobalLoader(false));
        setIsInWishlist(true);
      } else {
        // Handle error if needed
        dispatch(setEnableAlert(true));
        dispatch(
          setAlertMessage(
            "Failed to add product to wishlist. Please try again."
          )
        );
      }
    }
  };

  // TO DO
  // *
  // *
  // *
  // *
  // ADD TO CART

  useEffect(() => {
    const checkCart = async () => {
      if (currentUser) {
        const wishlist = await getCart(currentUser?.uid);
        const exists = wishlist?.some((item) => item?.productId === id);
        setIsInCart(exists);
      }
    };

    checkCart();
  }, [id, currentUser]);

  const handleCart = async () => {
    // dispatch(setGlobalLoader(true));
    setLoading(true);

    if (!currentUser?.uid) {
      // Show alert that user needs to log in
      // dispatch(setGlobalLoader(false));
      setLoading(false);
      dispatch(setEnableAlert(true));
      dispatch(setAlertMessage("Please log in to your account"));
      return;
    }

    const cartList = await getCart(currentUser.uid);
    const exists = cartList.some((item) => item.productId === id);

    if (exists) {
      // Show alert that product is already in wishlist
      dispatch(setEnableAlert(true));
      dispatch(setAlertMessage(`${title} is already in your cart.`));
      // dispatch(setGlobalLoader(false));
      setLoading(false);
    } else {
      // Add product to wishlist
      const result = await addToCart(currentUser.uid, id, {
        title,
        price,
        image,
        rating,
        quantity,
      });

      if (!result.exists) {
        // Show success alert
        dispatch(setSnackBar(true));
        dispatch(setSnackBarMessage("Added to your Cart"));
        // dispatch(setGlobalLoader(false));
        setLoading(false);
        setIsInCart(true);
      } else {
        // Handle error if needed
        dispatch(setEnableAlert(true));
        dispatch(
          setAlertMessage("Failed to add product to cart. Please try again.")
        );
      }
    }
  };

  const renderBestsellerTag = () => {
    return (
      <div
        className="position-absolute text-white px-2 py-1 bestseller-tag"
        style={{
          background: "linear-gradient(90deg, #000000 0%, #6441c7 90%)",
          fontSize: "small",
          borderRadius: "5px",
          top: "5px",
          left: "5px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <IoPricetags className="me-2" />
        Best Seller
        <div className="shining-effect"></div>
      </div>
    );
  };

  return (
    <div
      className=" bg- h-auto p-3 rounded me-2 me-lg-0  mb-"
      style={{
        width: location?.pathname === "/productsListing" ? "100%" : customWidth,
        background: "rgb(161 161 161 / 24%)",
      }}
      // style={{ width: customWidth, background: "rgb(161 161 161 / 24%)" }}
    >
      <div className="w-100 spc position-relative">
        <Link to={`/SingleProductPage/${id}/${category}`}>
          <div
            className="w-100 bg-white p-2 spc-img"
            style={{
              height: "150px",
              borderRadius: "7px",
              overflow: "hidden",
            }}
          >
            <img
              src={image}
              alt=""
              className="w-100 h-100 "
              style={{ objectFit: "contain" }}
            />
          </div>
          <div>
            <p className="my-2 text-secondary" style={{ fontSize: "small" }}>
              {category}
            </p>
            <h6 className="fs-h6 text-nowrap overflow-hidden text-truncate">
              {title}
            </h6>
            <div className="d-flex align-items-center">
              <p className="pe-2" style={{ fontWeight: "700" }}>
                $ {price}
              </p>{" "}
              |
              <p style={{ fontWeight: "700" }} className="ps-1">
                <CiStar className="mb-1" /> {rating?.rate}
              </p>
            </div>
          </div>
        </Link>
        <div className="d-flex mt-3 w-100 justify-content-between align-items-center">
          <div>
            {isInWishlist ? (
              <FaHeart fill="#8c52ff" />
            ) : (
              <FaRegHeart size={20} onClick={handleWhisList} fill="#b3b3b3" />
            )}
          </div>
          {!isInCart ? (
            <button
              className="border-0 outline-0 rounded-pill  text-white  p-2 px-lg-4  spc-btn"
              style={{ fontSize: "small" }}
              onClick={handleCart}
            >
              {!loading ? "Add to Cart" : <SniperLoading />}
            </button>
          ) : (
            <button
              className=" outline-0 rounded-pill bg-white text-dark   p-2 px-lg-4 spc-btn"
              style={{ fontSize: "small", border: "1px solid #8c52ff" }}
              onClick={() => navigate("/cart")}
            >
              Go to Cart
            </button>
          )}
        </div>
        {/* rendering best seller tag */}
        {bestSellerTag && renderBestsellerTag()}
      </div>
    </div>
  );
};

export default SingleProductCard;
