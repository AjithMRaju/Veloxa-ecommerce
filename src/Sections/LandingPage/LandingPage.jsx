import { Col, Carousel } from "react-bootstrap";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Carousel1 from "../../../src/assets/Images/carousel1.png";
import Carousel2 from "../../../src/assets/Images/carousel2.png";
import Carousel3 from "../../../src/assets/Images/carousel3.png";
import mensClothing from "../../assets/Images/MensClothing.png";
import womensClothings from "../../assets/Images/womensClothings.jpg";
import electronics from "../../assets/Images/electronicsItems.png";
import jewellery from "../../assets/Images/Jewwllwery.png";
const LandingPage = () => {
  const navigate = useNavigate();

  const handleNavigate = (slug) => {
    navigate("/productsListing", { state: slug });
  };
  return (
    <Fragment>
      <section className="home-wraper-1 py-lg-5">
        {/* SEARCH INPUT BOX htmlFor SMALL DEVICES */}
        <div className="container d-blck d-lg-none py-3 mobile-search">
          <div className="InputContainer">
            <input
              type="text"
              name="text"
              className="input"
              id="input"
              placeholder="Search"
            />

            <label htmlFor="input" className="labelhtmlForsearch">
              <svg viewBox="0 0 512 512" className="searchIcon">
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
              </svg>
            </label>
            <div className="border"></div>

            <button className="micButton">
              <svg viewBox="0 0 384 512" className="micIcon">
                <path d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="container-lg">          
          <div className="row">
            <Col xs={12} sm={12} lg={8} className="mb-4 mb-lg-0">
              <Carousel variant="dark">
                <Carousel.Item>
                  <img
                    className="d-block w-100 img-fluid rounded-3"
                    // src="https://i.pinimg.com/736x/0a/89/14/0a89140509cd5c3d268cfbf5f220f5a5.jpg"
                    src={Carousel1}
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100 img-fluid rounded-3"
                    src={Carousel2}
                    // src="https://i.pinimg.com/736x/37/84/08/37840842216139312fe81b7f6a87879a.jpg"
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100 img-fluid rounded-3"
                    // src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/summer-fashion-sale-design-template-addb292d55290af3a1d51fb6431959dc_screen.jpg?ts=1656938769"
                    src={Carousel3}
                    alt="First slide"
                  />
                </Carousel.Item>
              </Carousel>
            </Col>

            <Col
              xs={12}
              sm={12}
              lg={4}
              className="d-flex flex-wrap mt-0  justify-content-between align-items- bento-grid"
            >
              {/* <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center"> */}
              <div
                className="small-banner position-relative  "
                onClick={() => handleNavigate("men's clothing")}
              >
                <img
                  src={mensClothing}
                  alt="product"
                  className="img-fluid rounded-3 height-100 pb-"
                />
              </div>
              <div
                className="small-banner position-relative  "
                onClick={() => handleNavigate("electronics")}
              >
                <img
                  src={electronics}
                  alt="product"
                  className="img-fluid rounded-3 height-100 pb-"
                />
              </div>
              <div
                className="small-banner position-relative  "
                onClick={() => handleNavigate("jewelery")}
              >
                <img
                  src={jewellery}
                  alt="product"
                  className="img-fluid rounded-3 height-100 pb-"
                />
              </div>
              <div
                className="small-banner position-relative  "
                onClick={() => handleNavigate("women's clothing")}
              >
                <img
                  src={womensClothings}
                  alt="product"
                  className="img-fluid rounded-3 height-100 pb-"
                />
              </div>
              {/* </div> */}
            </Col>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default LandingPage;
