/* eslint-disable react/prop-types */
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  selectAllInitialProducts,
  selectProductListingLoading,
} from "../../Utils/Redux/productSlice";
import ProductLoadingSkull from "../../Components/Loadings/ProductLoadingSkull/ProductLoadingSkull";
import Filters from "../../Pages/Filters/Filters";
import SingleProductCard from "../../Components/Cards/SingleProductCard/SingleProductCard";
// ---
const Productlisting = ({ fectProductsByCategory }) => {
  const productsData = useSelector(selectAllInitialProducts);
  const loaidngState = useSelector(selectProductListingLoading);
  console.log("productsData:", productsData);

  return (
    <section className="mt-lg-5 overflow-hidden bg-white">
      <div className="container">
        <Row>
          <div className="col-lg-3 d-none d-lg-block">
            <Filters fectProductsByCategory={fectProductsByCategory} />
          </div>
          <div className="col-lg-9">
            <div className="row">
              {loaidngState && (
                <>
                  <ProductLoadingSkull skullCount={8} />
                </>
              )}

              {!loaidngState && !productsData.length == 0 ? (
                productsData?.map((product, i) => {
                  return (
                    <Col
                      key={i}
                      xs={6}
                      md={6}
                      lg={4}
                      xxl={3}
                      className="mb-4 mb-lg-4 pb-4  mb-xxl-  d-flex justify-content-lg-center border-end border-bottom "
                    >
                      <SingleProductCard {...product} customWidth="15rem" />
                    </Col>
                  );
                })
              ) : (
                <div className="w-100 h-100 bg-white d-flex flex-column align-items-center justify-content- py-5">
                  <div
                    className="mt-5"
                    style={{ width: "500px", height: "300px" }}
                  >
                    <img
                      src="https://khatrigemstone.com/img/gif/empty-box.gif"
                      alt=""
                      className="w-100 h-100 "
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div className="text-center">
                    <h6>Oops! No products available at the moment</h6>
                    <p>
                      Check back later or explore other categories for more
                      exciting finds!
                    </p>
                    <div
                      className="mt-3 me-auto ms-auto py-2 rounded "
                      style={{
                        border: "1px solid rgb(140, 82, 255)",
                        fontSize: "small",
                        maxWidth: "100px",
                        cursor: "pointer",
                      }}
                    >
                      Go Home
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Row>
      </div>
    </section>
  );
};

export default Productlisting;
