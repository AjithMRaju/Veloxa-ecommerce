import { useState } from "react";
import { useSelector } from "react-redux";
import { selectAllInitialProducts } from "../../Utils/Redux/productSlice";
import Upcomings from "../Upcomings/Upcomings";
// import LandingPage from "../LandingPage/LandingPage";
import VideoLandingpage from "../VideoLandingpage/VideoLandingpage";

import Topcategories from "../Topcategories/Topcategories";
import Providings from "../Providings/Providings";
import Trending from "../Trending/Trending";
// import menscClothing from "../../assets/Images/carousel1.png";

const Hero = () => {
  // const [products, setProducts] = useState([]);
  const products = useSelector(selectAllInitialProducts);
  const [error, setError] = useState(false);

  //   fetching products data
  // useEffect(() => {
  //   dispatch(productListingLoadingStatus(true));
  //   fetchProducts();
  // }, []);

  // const fetchProducts = async () => {
  //   try {
  //     const response = await axiosInstance.get("products");
  //     setProducts(response.data);
  //     dispatch(getAllInitialProducts(response?.data));
  //   } catch (error) {
  //     setError(true);
  //     console.log(error.message);
  //   } finally {
  //     dispatch(productListingLoadingStatus(false));
  //   }
  // };

  // reversed array...
  const reversedProducts = [...products].reverse();

  return (
    <div className="app">
      <VideoLandingpage />
      <Topcategories />
      <Upcomings
        title="Best Deals"
        pro={reversedProducts}
        error={error}
        // fetchProducts={fetchProducts}
        setError={setError}
      />
      <Trending title="Hot Sales"/>
      <Upcomings
        title="New Arrival"
        pro={products.slice()}
        error={error}
        // fetchProducts={fetchProducts}
        setError={setError}
      />
      <Providings />
    </div>
  );
};

export default Hero;
