/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { selectAllInitialProducts } from "../../Utils/Redux/productSlice";
import SingleProductCard from "../../Components/Cards/SingleProductCard/SingleProductCard";
import Slider from "react-slick";
import { ImFire } from "react-icons/im";
const Trending = ({ title }) => {
  const rating = 4.1;
  const tredningProducts = useSelector(selectAllInitialProducts);
  const filterdTrendingProducts = tredningProducts.filter(
    (item) => item.rating?.rate >= rating
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Show 4 slides on large devices
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024, // Tablets
        settings: {
          slidesToShow: 3, // Show 2 slides on tablets
          slidesToScroll: 1,
          arrows: false,
          //   dots: true,
          // infinite: true,
        },
      },
      {
        breakpoint: 600, // Mobile devices
        settings: {
          slidesToShow: 2, // Show 1 slide on mobile devices
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <section className="my-5">
      <div className="container p- p-lg-0">
        <h3
          className="mb-4 upcoming-title px-3 py-1 tex d-flex "
          style={{
            background: "#e3def1",
            width: "max-content",
            borderRadius: "50px",
          }}
        >
          {" "}
          <ImFire className="me-1" />
          {title}
        </h3>
        <div className="row p-lg-0  rounded  ">
          <div className="col-lg-4">
            <div
              className="w-100 p- rounded overflow-hidden"
              style={{ height: "322px" }}
            >
              <img
                src="https://i.pinimg.com/originals/04/21/8f/04218f50e28d06f0a442da7b81949848.png"
                alt=""
                className="w-100 h-100"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="col-lg-8 mt-3 mt-lg-0  bg- bg- rounded py- ">
            <Slider {...settings}>
              {filterdTrendingProducts?.map((eachItem) => {
                return (
                  <div key={eachItem?.id} className="px-1">
                    <SingleProductCard
                      {...eachItem}
                      customWidth="100%"
                      // key={eachItem?.id}
                    />
                  </div>
                );
              })}
            </Slider>
          </div>
          {/* {filterdTrendingProducts?.map((eachItem) => {
            return (
              <div
                className="col-xxl-2 col-xs-6 col-lg-3  mb-3 pb-3"
                key={eachItem?.id}
              >
                <SingleProductCard {...eachItem} customWidth="100%" />
              </div>
            );
          })} */}
        </div>
      </div>
    </section>
  );
};

export default Trending;
