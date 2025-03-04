import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import { Skeleton } from "@mui/material";
// import { FaRegHeart } from "react-icons/fa";
import { BsCart3, BsWhatsapp } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";
import { ImFacebook2 } from "react-icons/im";
import { MdOutlineFlashOn } from "react-icons/md";
import { IoMdArrowDropright } from "react-icons/io";
import { Link } from "react-router-dom";
import {
  setSnackBar,
  setSnackBarMessage,
  selectUserAuth,
  setGlobalLoader,
  setEnableAlert,
  setAlertMessage,
  selectAlertMessage,
} from "../../Utils/Redux/productSlice";
import {
  addToCart,
  getCart,
} from "../../Functions/wishlistService";
import axiosInstance from "../../api/axiosInstance";
import SingleProductCard from "../../Components/Cards/SingleProductCard/SingleProductCard";
import SpaceAdjuster from "../../Components/SpaceAdjuster/SpaceAdjuster";
import { Col } from "react-bootstrap";
const SingleProductPage = () => {
  // -----
  const [product, setProduct] = useState([]);
  const [RelatedProducrs, setRelatedproducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [productImgSrc, setProductImgSrc] = useState("");
  const [isImgSelected, setIsImgSelected] = useState("");
  const [outofStockAlret, setOutofStockAlert] = useState(false);
  // const [isInWishlist, setIsInWishlist] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // fake previewImages
  const previewImages = [
    {
      prevImg: "https://i.ebayimg.com/images/g/UKQAAOSweCplMrXA/s-l1600.jpg",
      id: "01",
    },
    {
      prevImg: "https://i.ebayimg.com/images/g/UKQAAOSweCplMrXA/s-l1600.jpg",
      id: "02",
    },
    {
      prevImg: "https://unifirst.com/wp-content/uploads/2023/01/11UM-07.jpg",
      id: "03",
    },
  ];

  const currentUser = useSelector(selectUserAuth);
  const [isInCart, setIsInCart] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkCart = async () => {
      if (!currentUser?.uid) {
        setIsInCart(false);
        return;
      }

      try {
        const cartList = await getCart(currentUser.uid);
        const exists = cartList.some((item) => item.productId === id);
        setIsInCart(exists);
      } catch (error) {
        console.error("Error checking cart:", error);
        setIsInCart(false);
      }
    };

    checkCart();
  }, [currentUser]);

  const handleCart = async () => {
    const { title, price, image, rating } = product;
    dispatch(setGlobalLoader(true));

    if (!currentUser?.uid) {
      // Show alert that user needs to log in
      dispatch(setGlobalLoader(false));
      dispatch(setEnableAlert(true));
      dispatch(setAlertMessage("Please log in to your account"));
      return;
    }

    const cartList = await getCart(currentUser.uid);
    const exists = cartList.some((item) => item.productId === id);

    if (exists) {
      // Show alert that product is already in wishlist
      dispatch(setEnableAlert(true));
      dispatch(setAlertMessage(`${title} is already in your wishlist.`));
      dispatch(setGlobalLoader(false));
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
        dispatch(setGlobalLoader(false));
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

  // const variantImages = [1, 2, 3, 4];
  const colorVariants = ["#8eb4e3", "#40e940", "yellow", "black"];
  const sizes = ["S", "M", "L", "Xl"];
  const { id, category } = useParams();

  // FETCHING SINGLE PRODUCT DETAILS DATA
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axiosInstance.get(`products/${id}`);
        setProduct(response.data);

        setProductImgSrc(response?.data?.image);

        // console.log("SingleProductPage data:", response.data);
      } catch (err) {
        console.log("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetRelatedProducts = async () => {
      try {
        const response = await axiosInstance.get(
          `products/category/${category}`
        );
        setRelatedproducts(response.data);
      } catch (err) {
        console.log("Error fetching related products:", err);
      }
    };
    fetRelatedProducts();
  }, [category]);

  // ADDING FAKESTORE IMAGE TO THE PREVIEW IMAGES ARRAY
  if (previewImages.length > 0) {
    previewImages[0].prevImg = product?.image;
    previewImages[0].id = "00";
  }

  // CHANGINH IMAGE PREVIEW
  const chageImageSrc = (src, id) => {
    setProductImgSrc(src);
    setIsImgSelected(id);
  };

  // NAVIGATE TO CHECKOUT SECTION
  const chechoutProducts = [];
  chechoutProducts.push({ ...product, quantity });  
  const handleCheckout = () => {
    if (currentUser?.uid) {
      navigate("/checkout", { state: { chechoutProducts, quantity } });
    } else {
      dispatch(setEnableAlert(true));
      dispatch(selectAlertMessage("Plese Login to your account to checkout."));
    }
  };

  // Function to increase quantity
  const increaseQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      const outofStock = 5;
      if (newQuantity >= outofStock) {
        setOutofStockAlert(true);
      } else {
        setOutofStockAlert(false);
      }
      return newQuantity;
    });
  };

  // Function to decrease quantity
  const decreaseQuantity = () => {
    setOutofStockAlert(false);
    if (quantity > 1) {
      setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity - 1;

        return newQuantity;
      });
    }
  };

  return (
    <section className=" mt-5 bg-white">
      <SpaceAdjuster />
      <div className="bredcrumbs bg-white" style={{ background: "#f5f5f5" }}>
        <div
          className="container py-1 d-flex align-items-center"
          style={{ fontWeight: "600" }}
        >
          <Link to="/">Home</Link> <IoMdArrowDropright />
          <p className="mb-0">{category}</p> <IoMdArrowDropright /> Products
        </div>
      </div>
      {/* product details */}
      <div className="container mt-lg-5 mt-2">
        <div className="row mt-3">
          {/* product images */}
          <div className="col-md-12 col-lg-6 mb-4 mb-lg-0 ">
            {loading ? (
              <div>
                <Skeleton height={400} width="100%" variant="rectangular" />
                <div className="d-flex mt-3">
                  <Skeleton
                    height={100}
                    width={100}
                    variant="rectangular"
                    sx={{ marginRight: "10px" }}
                  />
                  <Skeleton
                    height={100}
                    width={100}
                    variant="rectangular"
                    sx={{ marginRight: "10px" }}
                  />
                  <Skeleton
                    height={100}
                    width={100}
                    variant="rectangular"
                    sx={{ marginRight: "10px" }}
                  />
                  <Skeleton
                    height={100}
                    width={100}
                    variant="rectangular"
                    sx={{ marginRight: "10px" }}
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="d-lg-flex align-items-center s-p-m-img">
                  <div
                    className="w-100  d-flex align-items-center justify-content-center"
                    style={{
                      border: "1px solid rgb(33 37 41 / 18%)",
                      background: "#fff",
                    }}
                  >
                    <div className=" singlepage-img">
                      <img src={productImgSrc} alt="" />
                    </div>
                  </div>
                </div>
                <div className="s-p_variantImages d-flex mt-2 pe-1">
                  {previewImages.map((i) => {
                    return (
                      <div
                        className={` ${
                          i.id === isImgSelected && "activeBorder"
                        } s-p_variantBox mb-2 me-2`}
                        key={i?.id}
                        onClick={() => chageImageSrc(i?.prevImg, i?.id)}
                      >
                        <img src={i?.prevImg} alt="Previpusimage" />
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
          {/* product details */}
          <div className="col-md-12 col-lg-6">
            <div>
              {/* 1 */}
              <div className="border-bottom py-2">
                <div>
                  {loading ? (
                    <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
                  ) : (
                    <h5 className="subHeadlines">{product?.title}</h5>
                  )}

                  <div className="d-flex">
                    <div className="d-flex justify-content-center align-items-center">
                      <FaStar style={{ color: "#dbdb47" }} />
                      <FaStar style={{ color: "#dbdb47" }} />
                      <FaStar style={{ color: "#dbdb47" }} />
                      <FaStar style={{ color: "#dbdb47" }} />
                    </div>
                    <div className="mx-3">
                      (5) <span>Reviews</span> |
                    </div>
                    <p className="mb-0">Add reviews</p>
                  </div>
                </div>
              </div>
              {/* 2 */}
              <div className="border-bottom py-3">
                {loading ? (
                  <Skeleton
                    variant="text"
                    width={100}
                    sx={{ fontSize: "2rem" }}
                  />
                ) : (
                  <h1 className="price">${product?.price}</h1>
                )}

                {loading ? (
                  <div>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                  </div>
                ) : (
                  <p className="paragraph-content">{product?.description}</p>
                )}
              </div>
              {/* 3 */}
              <div>
                <div className=" d-flex flex-column justify-content-between py-2 ">
                  <div>
                    <p className="my-2">Quantity</p>
                    <div className="d-flex align-items-center mt-2 quantity-btn ">
                      <button
                        onClick={decreaseQuantity}
                        style={{ background: "#fff" }}
                      >
                        -
                      </button>
                      <span className="mx-2">{quantity}</span>
                      <button
                        onClick={increaseQuantity}
                        style={{ background: "#fff" }}
                      >
                        +
                      </button>
                    </div>
                    {outofStockAlret && (
                      <p className="text-danger my-2">Only 4 items left</p>
                    )}
                  </div>

                  <div className="my-2">
                    <p className="my-2">Colors:</p>
                    {loading ? (
                      <div className="d-flex gap-2">
                        <Skeleton width={20} height={30} />
                        <Skeleton width={20} />
                        <Skeleton width={20} />
                        <Skeleton width={20} />
                      </div>
                    ) : (
                      <div className="d-flex">
                        {colorVariants.map((item) => {
                          return (
                            <div
                              className="color_box me-2"
                              key={item}
                              style={{ background: `${item}` }}
                            ></div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div>
                    <p className=" my-2">Size:</p>
                    <div className="d-flex">
                      {loading ? (
                        <div className="d-flex gap-2">
                          <Skeleton width={20} height={30} />
                          <Skeleton width={20} />
                          <Skeleton width={20} />
                          <Skeleton width={20} />
                        </div>
                      ) : (
                        <>
                          {sizes.map((item) => {
                            return (
                              <div
                                className="me-2 color_box d-flex justify-content-center align-items-center"
                                key={item}
                              >
                                {item}
                              </div>
                            );
                          })}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4 d-flex row">
                  <div className="col-sm-6 col-lg-5" onClick={handleCheckout}>
                    {loading ? (
                      <Skeleton height={80} sx={{ borderRadius: "10px" }} />
                    ) : (
                      <button
                        className="singlepage-btn d-flex align-items-center text-white mb-2  me-3"
                        style={{ background: "#8c52ff", border: "none" }}
                      >
                        <MdOutlineFlashOn />
                        <span className="ms-2">BUY NOW</span>
                      </button>
                    )}
                  </div>
                  <div className="col-sm-6 col-lg-5">
                    {loading ? (
                      <Skeleton height={80} sx={{ borderRadius: "10px" }} />
                    ) : (
                      <>
                        {isInCart ? (
                          <button
                            onClick={() => navigate("/cart")}
                            className="singlepage-btn d-flex align-items-center text-dark  me-3"
                            style={{
                              background: "#fff",
                              border: "1px solid #fff",
                            }}
                          >
                            <BsCart3 />
                            <span className="ms-2">Go TO CART</span>
                          </button>
                        ) : (
                          <button
                            onClick={handleCart}
                            className="singlepage-btn d-flex align-items-center text-dark  me-3"
                            style={{
                              background: "#fff",
                              // background: "#8c52ff",
                              border: "1px solid #8c52ff",
                            }}
                          >
                            <BsCart3 />
                            <span className="ms-2">ADD TO CART</span>
                          </button>
                        )}
                      </>
                    )}
                  </div>
                  {/* <div className="col-sm-6 col-lg-2 d-flex justify-content-lg-start align-items-center">
                    <button
                      className=" d-flex align-items-center justify-content-center  text-black"
                      style={{
                        background: "#fff",
                        border: "none",
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    >
                      {isInWishlist ? (
                        <FaHeart fill="red" />
                      ) : (
                        <FaRegHeart onClick={handleWhisList} />
                      )}
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex mt-4 d-none d-sm-block">
            <h6 className="me-3">Share:</h6>
            <ImFacebook2 color="#0165E1" className="me-2 " />
            <FaTwitter color="#0165E1" className="me-2 " />
            <BsWhatsapp color="green" className="me-2 " />
          </div>
        </div>
      </div>
      {/* product specificatoins */}
      <div className="container border-top border-bottom mt-5 ">
        <h2 className="py-4 subHeading">Product Specifications</h2>
        <div className="row">
          <div className="col-sm-12 col-lg-4">
            <div className=" mb-2 py-3 ps-1" style={{ background: "#f5f5f5" }}>
              <h4 className="subHeadlines">INFORMARION</h4>
            </div>
            <div className="mb-2 py-3 ps-1" style={{ background: "#f5f5f5" }}>
              <h4 className="subHeadlines ">CUSTOMER REVIEWS (12)</h4>
            </div>
            <div className="mb-2 py-3 ps-1" style={{ background: "#f5f5f5" }}>
              <h4 className="subHeadlines">SHIPPING & RETURNS</h4>
            </div>
            <div className="mb-2 py-3 ps-1" style={{ background: "#f5f5f5" }}>
              <h4 className="subHeadlines">PRODUCTS TAGS</h4>
            </div>
            <div className="mb-2 py-3 ps-1" style={{ background: "#f5f5f5" }}>
              <h4 className="subHeadlines">CUSTUM TAV</h4>
            </div>
          </div>
          <div className="col-sm-12 col-lg-8">
            <span className="paragraph-content">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </span>
          </div>
        </div>
      </div>

      {/* REALATED PRODUCT */}
      <section className="mt-5 relatedproducts-section  py-5">
        <div className="container">
          <h4 className=" pb-4 custom-border-bottom">Related Products</h4>
          <div className="row mt-4 ">
            {RelatedProducrs.map((_a, i) => {
              return (
                <Col xs={6} lg={3} xxl={2} key={i} className="mb-3 mb-lg-0 border-bottom pb-3 border-end">
                  <SingleProductCard {..._a} customWidth="100%" />
                </Col>                
              );
            })}
          </div>
        </div>
      </section>
    </section>
  );
};

export default SingleProductPage;
