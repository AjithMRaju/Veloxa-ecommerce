import { useLocation } from "react-router-dom";
import Banner from "../../Sections/Banner/Banner";
import SpaceAdjuster from "../../Components/SpaceAdjuster/SpaceAdjuster";
const ProductsListing = () => {
  const location = useLocation();
  const slug = location?.state;
  

  return (
    <div className="bg-white py-5">
      <SpaceAdjuster/>
      <Banner slug={slug} />
    </div>
  );
};

export default ProductsListing;
