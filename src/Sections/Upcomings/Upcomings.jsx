/* eslint-disable react/prop-types */
import { selectProductListingLoading } from "../../Utils/Redux/productSlice";
import { useSelector } from "react-redux";
import { IoMdRefresh } from "react-icons/io";
import { useState } from "react";
import { FaHandshakeSimple } from "react-icons/fa6";
import SingleProductCard from "../../Components/Cards/SingleProductCard/SingleProductCard";
import ProductLoadingSkull from "../../Components/Loadings/ProductLoadingSkull/ProductLoadingSkull";
import Slider from "react-slick";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Upcomings = ({ title, pro, error, fetchProducts, setError }) => {
  const isProductLoading = useSelector(selectProductListingLoading);

  const handleRefresh = () => {
    setError(false);
    fetchProducts();
  };



  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3, // Show 4 slides on large devices
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024, // Tablets
        settings: {
          slidesToShow: 3, // Show 2 slides on tablets
          slidesToScroll: 1,
          arrows: false,
          // dots: true,
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

  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  // Calculate the total number of pages
  const totalPages = Math.ceil(pro.length / itemsPerPage);

  // Get the current page's data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = pro.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <section className="my-5">
      <div
        className="container p-lg-0 p-4  d-none d-lg-block "
        style={{ borderRadius: "10px" }}
      >
        <h3 className="mb-3 upcoming-title">
          <FaHandshakeSimple size={25} className="me-2" />
          {title}
        </h3>
        {isProductLoading ? (
          <div className="row">
            <ProductLoadingSkull skullCount={4} />
          </div>
        ) : (
          <div className="row ">
            {currentData.map((eachItem) => {
              return (
                <div
                  className="col-lg-3 col-xxl-2 col-sm-12 me- mb-4 border-end border-bottom pb-4 d-flex justify-content-"
                  key={eachItem?.id}
                >
                  <SingleProductCard {...eachItem} customWidth="100%" />
                </div>
              );
            })}
            <div className="d-flex justify-content-center">
              <Stack spacing={2}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  variant="outlined"
                  shape="rounded"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      color: "#6441c7", //
                    },
                    "& .MuiPaginationItem-page.Mui-selected": {
                      backgroundColor: "#6441c7",
                      color: "#fff",
                    },
                    "& .MuiPaginationItem-page:hover": {
                      backgroundColor: "#6441c7",
                      color: "#fff",
                    },
                  }}
                />
              </Stack>
            </div>
          </div>
        )}
        {error && (
          <div className="d-flex flex-column align-items-center justify-content-center">
            <h5 className="text-danger">Oops somthing was worng!!</h5>
            <button className="refreshButn" onClick={handleRefresh}>
              <IoMdRefresh fontSize="large" className="me-2" />
              Refresh
            </button>
          </div>
        )}
      </div>

      {/* for mobile devices */}
      <div className="container d-block d-lg-none">
        <h3 className="mb-3 upcoming-title">{title}</h3>
        <Slider {...settings}>
          {pro.map((eachItem) => {
            return (
              <div
                key={eachItem?.id}
                className="me-1"
                style={{ width: "12rem" }}
              >
                <SingleProductCard
                  {...eachItem}
                  // key={eachItem?.id}
                  // customWidth="12rem"
                />
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};

export default Upcomings;
