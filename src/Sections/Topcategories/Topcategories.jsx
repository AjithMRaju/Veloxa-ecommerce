import { Col } from "react-bootstrap";
import { topCategories } from "../../Utils/Data/Data";
import { useNavigate } from "react-router-dom";
import { BiSolidCategoryAlt } from "react-icons/bi";
const Topcategories = () => {
  const navigate = useNavigate();

  const handleNavigate = (slug) => {
    navigate("/productsListing", { state: slug });
  };
  return (
    <section className="my-5">
      <div className="container px-lg-0">
        <h5 className="mb-3 upcoming-title "><BiSolidCategoryAlt fill="" size={20} className="me-2" />Top Categories</h5>
      </div>
      <div
        className="container border  p p-lg-5 rounded"
        style={{ background: "#e1e1e16b" }}
      >
        <div className="row py-3 py-lg-0">
          {topCategories.map((eachItem) => {
            return (
              <Col
                xs={4}
                sm={6}
                lg={2}
                key={eachItem?.id}
                className="mb-3 mb-lg-0"
                onClick={() => handleNavigate(eachItem.categories)}
              >
                <div
                  className="position-relative topCategory-wrapper"
                  style={{
                    width: "100%",
                    height: "170px",
                    borderRadius: "7px",
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={eachItem.image}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    className="position-absolute bottom-0  start-0 end-0 d-flex align-items-end justify-content-center p-2"
                    style={{
                      background:
                        "linear-gradient(0deg, rgb(0 0 0 / 72%) 0%, rgba(0, 0, 0, 0) 90%)",
                      height: "100%",
                    }}
                  >
                    <h6 className="text-center text-white">
                      {eachItem.categories}
                    </h6>
                  </div>
                </div>
              </Col>
              // <div
              //   className="col-lg-2 col-xs-6"
              //   key={eachItem?.id}
              //   onClick={() => handleNavigate(eachItem.categories)}
              // >
              //   <div
              //     className="position-relative topCategory-wrapper"
              //     style={{
              //       width: "100%",
              //       height: "170px",
              //       borderRadius: "7px",
              //       overflow: "hidden",
              //       cursor: "pointer",
              //     }}
              //   >
              //     <img
              //       src={eachItem.image}
              //       alt=""
              //       style={{
              //         width: "100%",
              //         height: "100%",
              //         objectFit: "cover",
              //       }}
              //     />
              //     <div
              //       className="position-absolute bottom-0  start-0 end-0 d-flex align-items-end justify-content-center p-2"
              //       style={{
              //         background:
              //           "linear-gradient(0deg, rgb(0 0 0 / 72%) 0%, rgba(0, 0, 0, 0) 90%)",
              //         height: "100%",
              //       }}
              //     >
              //       <h6 className="text-center text-white">
              //         {eachItem.categories}
              //       </h6>
              //     </div>
              //   </div>
              // </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Topcategories;
