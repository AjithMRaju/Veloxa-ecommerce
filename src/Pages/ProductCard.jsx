/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoStarOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { addToWishlist, getWishlist } from "../Functions/wishlistService";
import { useDispatch, useSelector } from "react-redux";
import {
  setEnableAlert,
  setAlertMessage,
  selectUserAuth,
  setGlobalLoader,
  setSnackBar,
  setSnackBarMessage,
} from "../Utils/Redux/productSlice";

// eslint-disable-next-line react/prop-types
const ProductCard = ({ image, title, price, id, category, rating }) => {
  const dispatch = useDispatch();

  const currentUser = useSelector(selectUserAuth);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const checkWishlist = async () => {
      if (currentUser) {
        const wishlist = await getWishlist(currentUser?.uid);
        const exists = wishlist?.some((item) => item.productId === id);
        setIsInWishlist(exists);
      }
    };

    checkWishlist();
  }, [id, currentUser]);

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

  return (
    <div className="productCard pt-4 py-lg-0 position-relative ">
      <Link to={`/SingleProductPage/${id}/${category}`}>
        <div className="productImg mb-4 p-4 p-lg-3">
          <img src={image} alt="" />
        </div>
      </Link>
      <div className="card_details p-2">
        <div className="p-title">
          <span>{title}</span>
        </div>
        {/* <div className="p_rate">{rating?.rate}</div> */}
        <div className="p-price mt-2">$ {price} </div>
      </div>
      <div className="fav_icon" style={{ cursor: "pointer" }}>
        {isInWishlist ? (
          <FaHeart fill="red" />
        ) : (
          <FaRegHeart onClick={handleWhisList} />
        )}
      </div>
      <div className="rating- ">
        <IoStarOutline fontSize="large" color="#10c410" className="me-1" />
        {rating?.rate}
      </div>
    </div>
  );
};

export default ProductCard;
