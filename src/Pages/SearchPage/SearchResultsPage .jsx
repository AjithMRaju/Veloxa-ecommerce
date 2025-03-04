import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllInitialProducts } from "../../Utils/Redux/productSlice";
import SingleProductCard from "../../Components/Cards/SingleProductCard/SingleProductCard";
import SpaceAdjuster from "../../Components/SpaceAdjuster/SpaceAdjuster";
// ---
const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const allProducts = useSelector(selectAllInitialProducts);
  const { query } = location.state;
  const [filteredProducts, setFilteredProducts] = useState([]);
  console.log("allProducts :", allProducts);

  //   ---

  useEffect(() => {
    handleSearch(query);
  }, [query, allProducts]);

  const renderEmptyComponent = () => {
    return (
      <div className="text-center container">
        <img
          src="https://khatrigemstone.com/img/gif/empty-box.gif"
          alt=""
          style={{
            width: "200px",
            height: "200px",
          }}
        />
        <h6 className="mb-">Oops! No Products Available😕</h6>
        <p className="mb-3" style={{ fontSize: "small" }}>
          It looks like we couldn&apos;t find any products for you right now.
          <br />
          But don’t worry-check back later or explore our other sections to
          discover something amazing! 🌟
        </p>
        <button
          style={{
            border: "none",
            outline: "none",
          }}
          className="spc-btn text-white rounded py-2"
          onClick={() => navigate("/")}
        >
          Go Home
        </button>
      </div>
    );
  };

  const renderSomeProducts = () => {
    const filtered = allProducts?.filter(
      (products) => products?.category === "electronics"
    );
    return (
      <>
        {filtered.length &&
          filtered.map((eachItem) => {
            return (
              <div
                className="col-6 col-lg-3 col-xxl-2 border-end border-bottom pb-3 mb-3"
                key={eachItem?.id}
              >
                <SingleProductCard {...eachItem} />
              </div>
            );
          })}
      </>
    );
  };

  //   handle search functionality
  const handleSearch = (query) => {
    if (!query || !allProducts) return;

    const lowerCaseQuery = query.toLowerCase();

    const filtered = allProducts.filter(
      (product) =>
        product.category.toLowerCase().includes(lowerCaseQuery) ||
        product.title.toLowerCase().includes(lowerCaseQuery)
    );

    setFilteredProducts(filtered);
  };

  return (
    <section className=" bg-white py-5">
      <SpaceAdjuster />
      <section className=" pt-lg-5">
        {filteredProducts?.length ? (
          <div className="container">
            <div className="mb-4 ">
              <h6>
                Showing results for : <span className="text-">{query}</span>
              </h6>
              <p
                style={{ fontSize: "small" }}
              >{`Showing 1-${filteredProducts?.length} products of ${filteredProducts?.length}`}</p>
            </div>
            <div className="row   rounded">
              {filteredProducts?.map((eachItem) => {
                return (
                  <div
                    className="col-6 col-lg-3 col-xxl-2 border-end border-bottom mb-3 pb-3 "
                    key={eachItem?.id}
                  >
                    <SingleProductCard {...eachItem} customWidth="%" />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <>{renderEmptyComponent()}</>
        )}

        <div className="container my-5">
          <h6 className="border-bottom pb-3">
            Haven’t found it yet? Dive into our collection!
          </h6>
          <div className="row mt-3">{renderSomeProducts()}</div>
        </div>
      </section>
    </section>
  );
};

export default SearchResultsPage;
