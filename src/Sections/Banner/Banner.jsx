import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { sortOptions } from "../../Utils/Data/Data";
import {
  getAllInitialProducts,
  productListingLoadingStatus,
} from "../../Utils/Redux/productSlice";
import axiosInstance from "../../api/axiosInstance";
import Productlisting from "../ProductListing/Productlisting";
import Skeleton from "@mui/material/Skeleton";
import FilterOffcanvas from "../../Components/Offcanvas/FilterOffcanvas/FilterOffcanvas";
// ---
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// eslint-disable-next-line react/prop-types
const Banner = ({ slug }) => {
  const dispatch = useDispatch();
  const [initailBtn, setInitialBtn] = useState("electronics");
  const [category, setCategory] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  // ---
  const setBtnActive = (data) => {
    setInitialBtn(data);
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // FETCHING CATEGORY DATA
  useEffect(() => {
    setInitialBtn(slug);
    setIsloading(true);
    const fetchDeta = async () => {
      try {
        const response = await axiosInstance.get("products/categories");
        setCategory(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsloading(false);
      }
    };

    fetchDeta();
    fectProductsByCategory(`products/category/${slug}`);
  }, []);

  // FETCHING PRODUCTS BASED CATEGORIES
  const fectProductsByCategory = async (slug) => {
    dispatch(productListingLoadingStatus(true));
    try {
      const response = await axiosInstance.get(slug);

      dispatch(getAllInitialProducts(response.data));
      setProducts(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(productListingLoadingStatus(false));
    }
  };

  // SORTING FUNCTION
  const handleSort = (type) => {
    const sortedArray = [...products];
    if (type === "lowest-price") {
      sortedArray.sort((a, b) => a.price - b.price);
    } else if (type === "highest-price") {
      sortedArray.sort((a, b) => b.price - a.price);
    } else if (type === "top-rating") {
      sortedArray.sort((a, b) => b.rating?.rate - a.rating?.rate);
    }
    dispatch(getAllInitialProducts(sortedArray));
  };

  return (
    <div className="bg-white">
      <section className="mt-lg-5 ">
        {/* category buttons for large devices */}
        <div
          className="category-btns-wrapper border-bottom my-4 my-lg-0   py-3 pb-lg-3 container d-lg-flex justify-content-lg-between "
          style={{ top: 0, background: "" }}
        >
          <div className="category-btns d-flex justify-content-lg-center align-items-center  row">
            {isLoading && (
              <>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    className="skull-parant mb-3 me-lg-4 col-6 col-lg-3 "
                    key={index}
                  >
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="100%"
                    />
                  </div>
                ))}
              </>
            )}

            {!isLoading &&
              category?.map((items, i) => (
                <div
                  key={i}
                  className={`${
                    items === initailBtn ? "activeBtn" : "category-btn"
                  } mb-3 col-6 col-lg-3 `}
                  onClick={() => {
                    setBtnActive(items),
                      fectProductsByCategory(`products/category/${items}`);
                  }}
                >
                  <button className="p-2">{items}</button>
                </div>
              ))}
          </div>

          <div className="category-filterbtn d-flex align-items-center justify-content-center">
            <FilterOffcanvas />
            <FormControl sx={{ m: 1, width: 200 }} size="small">
              <InputLabel id="demo-select-small-label">SORT</InputLabel>
              <Select
                labelId="sort-select-label"
                id="sort-select-label"
                label="Sort By"
                value={selectedOption}
                onChange={handleChange}
                // sx={{ borderRadius: "50px" }}
                MenuProps={{
                  disableScrollLock: true, // Prevents scroll lock on body
                }}
                sx={{
                  borderRadius: "50px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6441c7", // Initial border color
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6441c7", // Hover border color
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6441c7", // Focused border color
                  },
                }}
              >
                {sortOptions.map((option, _i) => {
                  return (
                    <MenuItem
                      key={_i}
                      value={option.type}
                      onClick={() => handleSort(option.type)}
                      sx={{
                        "&.Mui-selected": {
                          backgroundColor: "#6441c7",
                          color: "#fff",
                        },
                        "&:hover": {
                          backgroundColor: "#6441c7",
                          color: "#fff",
                        },
                      }}
                    >
                      {option.options}{" "}
                    </MenuItem>
                  );
                })}

                <MenuItem value="Discount" disabled>
                  Discount
                </MenuItem>
                <MenuItem value="Relevance" disabled>
                  Relevance
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        <Productlisting fectProductsByCategory={fectProductsByCategory} />
      </section>
    </div>
  );
};

export default Banner;
