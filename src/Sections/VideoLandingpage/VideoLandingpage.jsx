import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { setReferrAndEarnBOx } from "../../Utils/Redux/productSlice";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import Carousel from "react-bootstrap/Carousel";
import LimgOne from "../../assets/Images/LimgOne.jpg";
import LimgTwo from "../../assets/Images/MakeupPoster.jpg";
import LimgThree from "../../assets/Images/ShopingPoster.jpg";
// --
import { FaCaretDown, FaLocationDot } from "react-icons/fa6";
import { TfiGift } from "react-icons/tfi";
import { IoMdNotifications } from "react-icons/io";
import { BiSolidCategory } from "react-icons/bi";
import WomanMakeup from "../../assets/Images/WomenMakeup.jpg";
import introBanner from "../../assets/Images/introBanner.jpg";
// ---
const VideoLandingpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const images = [
    {
      image: LimgTwo,
      path: "",
    },
    {
      image: LimgThree,
      path: "",
    },
    {
      image: LimgOne,
      path: "",
    },
  ];

  const tempImg = [
    {
      img: WomanMakeup,
    },
    {
      img: introBanner,
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 4 slides on large devices
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024, // Tablets
        settings: {
          slidesToShow: 1, // Show 2 slides on tablets
          slidesToScroll: 1,
          arrows: false,
          // dots: true,
          // infinite: true,
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.length) {
      navigate("/searchQuery", { state: { query } });
    }
  };

  return (
    <section
      className="d-flex align-items-center justify-content-center position-relative position-sm-static"
      // style={{ width: "100vw", height: "100vh" }}
    >
      {/* for destop devices */}
      <div className="d-none d-lg-block">
        <div className="position-relative">
          <Carousel fade controls={false} indicators={false}>
            {tempImg.map((image, index) => (
              <Carousel.Item key={index} style={{ height: "100vh" }}>
                <img
                  className="d-block "
                  src={image.img}
                  alt={`Slide ${index + 1}`}
                  style={{
                    objectFit: "cover",
                    height: "100vh",
                    width: "100vw ",
                  }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div
          className="w-100 bottom-0 position-absolute start-0 bg- "
          style={{
            zIndex: "9",
            background:
              "linear-gradient(0deg, rgb(0 0 0) 0%, rgb(0 0 0 / 0%) 90%)",
          }}
        >
          <div className="container">
            <div className="row">
              {images.map((eachItem, _i) => {
                return (
                  <div className="col-lg-4 p-2" key={_i}>
                    <div>
                      <img
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "10px",
                          overflow: "hidden",
                          cursor: "pointer",
                        }}
                        src={eachItem.image}
                        alt=""
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="d-block d-lg-none w-100 h-100 ">
        <div
          className="container py-5"
          style={{
            background:
              "linear-gradient(61deg, rgba(17,17,17,1) 39%, rgba(100,65,199,1) 90%)",
            borderRadius: "0 0 20px 20px",
          }}
        >
          <div className="row">
            <div className="col-6">
              <div>
                <h6 className="text-white">Location</h6>
              </div>
              <div className="d-flex align-items-center my-3">
                <FaLocationDot fill="white" size={20} className="me-2" />
                <h6 className="text-white mb-0">New York,USA</h6>
                <FaCaretDown className="ms-2" fill="white" size={20} />
              </div>
            </div>
            {/* -- */}
            <div className="col-6 d-flex justify-content-around">
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "10px",
                  background: "rgb(111 58 215 / 25%)",
                  // background: "#3f1296",
                }}
                onClick={() => dispatch(setReferrAndEarnBOx(true))}
              >
                <TfiGift size={30} fill="#b3b3b3" />
              </div>
              <div
                className="d-flex align-items-center justify-content-center position-relative"
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "10px",
                  background: "rgb(111 58 215 / 25%)",
                  // background: "#3f1296",
                }}
              >
                <IoMdNotifications
                  size={30}
                  fill="#b3b3b3"
                  onClick={() => navigate("/notification")}
                />
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-9">
              <div className="mobile-search">
                <form
                  className="InputContainer"
                  onSubmit={(e) => handleSearch(e)}
                >
                  <input
                    type="text"
                    name="search"
                    className="input"
                    id="input"
                    placeholder="Search for Products, Brands"
                    onChange={(e) => setQuery(e.target.value)}
                  />

                  <label className="labelforsearch">
                    <svg viewBox="0 0 512 512" className="searchIcon">
                      <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
                    </svg>
                  </label>

                  <div className="border"></div>

                  <button type="button" className="micButton">
                    <svg viewBox="0 0 384 512" className="micIcon">
                      <path d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z"></path>
                    </svg>
                  </button>
                </form>
              </div>
            </div>
            <div className="col-3">
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "10px",
                  background: "rgb(111 58 215 / 25%)",
                  // background: "#3f1296",
                }}
              >
                <BiSolidCategory size={30} fill="#b3b3b3" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="container">
            <h3 className="upcoming-title">Special Offers</h3>
            <Slider {...settings}>
              {images.map((eachImage, _i) => {
                return (
                  <div key={_i} style={{ height: "50px" }}>
                    <Link to="#">
                      <img
                        src={eachImage.image}
                        className="h-100 w-100"
                        alt=""
                        style={{
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />
                    </Link>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoLandingpage;
