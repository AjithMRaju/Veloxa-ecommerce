import Stepper from "../../Components/Stepper/Stepper";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { TbTruckReturn } from "react-icons/tb";
import { TbArrowsExchange2 } from "react-icons/tb";
import SpaceAdjuster from "../../Components/SpaceAdjuster/SpaceAdjuster";
const OrderTracking = () => {
  const location = useLocation();
  const {
    age,
    country,
    houseNumber,
    name,
    phoneNumber,
    pincode,
    state,
    userId,
  } = location.state.deliveryAdress[0];
  console.log(age);
  return (
    <section className="orderTracking-section">
      <SpaceAdjuster/>
      <div className="container">
        <div className="row my-5">
          <div className="col-sm-12 col-lg-4 order-2 order-md-1 border-end ">
            <div className="mb-5">
              <h6 className="or-tr-h6">Customer Name</h6>
              <h4>{name}</h4>
            </div>
            <div className="mb-5">
              <h6 className="or-tr-h6">Customer Contact</h6>
              <h4>+91{phoneNumber}</h4>
            </div>
            <div className="border-bottom pb-3">
              <h6 className="or-tr-h6">Delivery Address</h6>
              <p>{name},</p>
              <p>+91{phoneNumber},</p>
              <p>{houseNumber},</p>
              <p>{state},</p>
              <p>{country},</p>
              <p>{pincode},</p>
            </div>
          </div>
          <div className="col-sm-12 col-lg-8 order-1 order-md-2">
            <div className="py-3 border-bottom">
              <h6 className="or-tr-h6">Tracking ID :</h6>
              <h4>{userId}</h4>
            </div>
            <div className="py-3 border-bottom d-flex justify-content-between align-items-lg-center">
              {/* 1 */}
              <div>
                <h6 className="or-tr-h6">your order is</h6>
                <h1 className="mb-0">Delivered</h1>
                <p className="mb-3">as on 27 Agu 2025,Friday</p>
                <h6 className="or-tr-h6">Last updated on 29 Aug 2025,Sunday</h6>
              </div>
              {/* 2 */}
              <div
                style={{ background: "#fff", borderRadius: "5px" }}
                className="p-3"
              >
                <ul className="p-0">
                  <li className="py-2">
                    <TbTruckReturn fontSize="large" />
                    <span className="ms-3">Retrun Order</span>
                  </li>
                  <li
                    className="py-2
                    border-bottom"
                  >
                    <TbArrowsExchange2 fontSize="large" />
                    <span className="ms-3">Exchange Item</span>
                  </li>
                  <li className="py-2">For Delivery Queries</li>
                  <li className="py-1">
                    <Link>Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="py-3 border-bottom">
              <p>How was your delivery experience?</p>
              {/* RATING EMOJIS */}
              <div className="my-3 d-flex justify-content-lg-around">
                {/* BAD */}
                <div>
                  <svg
                    width="64px"
                    height="64px"
                    viewBox="-2 -2 24.00 24.00"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    //   xmlns:xlink="http://www.w3.org/19/99/xlink"
                    fill="#000000"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#CCCCCC"
                      strokeWidth="0.04"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <title>emoji_sad_circle [#548]</title>{" "}
                      <desc>Created with Sketch.</desc> <defs> </defs>{" "}
                      <g
                        id="Page-1"
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        {" "}
                        <g
                          id="Dribbble-Light-Preview"
                          transform="translate(-60.000000, -5799.000000)"
                          fill="#000000"
                        >
                          {" "}
                          <g
                            id="icons"
                            transform="translate(56.000000, 160.000000)"
                          >
                            {" "}
                            <path
                              d="M20,5647 C20,5648.105 19.105,5649 18,5649 C16.895,5649 16,5648.105 16,5647 C16,5645.895 16.895,5645 18,5645 C19.105,5645 20,5645.895 20,5647 M10,5649 C8.895,5649 8,5648.105 8,5647 C8,5645.895 8.895,5645 10,5645 C11.105,5645 12,5645.895 12,5647 C12,5648.105 11.105,5649 10,5649 M18.893,5654.164 C19.01,5654.763 18.513,5655.415 17.902,5655.415 L10.098,5655.415 C9.487,5655.415 8.99,5654.66 9.107,5654.061 C10.114,5648.923 17.886,5649.027 18.893,5654.164 M14,5657 C9.589,5657 6,5653.411 6,5649 C6,5644.589 9.589,5641 14,5641 C18.411,5641 22,5644.589 22,5649 C22,5653.411 18.411,5657 14,5657 M14,5639 C8.477,5639 4,5643.477 4,5649 C4,5654.523 8.477,5659 14,5659 C19.523,5659 24,5654.523 24,5649 C24,5643.477 19.523,5639 14,5639"
                              id="emoji_sad_circle-[#548]"
                            >
                              {" "}
                            </path>{" "}
                          </g>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                  <p className="text-center mt-2">Bad</p>
                </div>
                {/* OKAY */}
                <div>
                  <svg
                    width="64px"
                    height="64px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M8.5 11C9.32843 11 10 10.3284 10 9.5C10 8.67157 9.32843 8 8.5 8C7.67157 8 7 8.67157 7 9.5C7 10.3284 7.67157 11 8.5 11Z"
                        fill="#0F0F0F"
                      ></path>{" "}
                      <path
                        d="M17 9.5C17 10.3284 16.3284 11 15.5 11C14.6716 11 14 10.3284 14 9.5C14 8.67157 14.6716 8 15.5 8C16.3284 8 17 8.67157 17 9.5Z"
                        fill="#0F0F0F"
                      ></path>{" "}
                      <path
                        d="M15.1091 16.4588C15.3597 16.9443 15.9548 17.1395 16.4449 16.8944C16.9388 16.6474 17.1391 16.0468 16.8921 15.5528C16.8096 15.3884 16.7046 15.2343 16.5945 15.0875C16.4117 14.8438 16.1358 14.5299 15.7473 14.2191C14.9578 13.5875 13.7406 13 11.9977 13C10.2547 13 9.03749 13.5875 8.24796 14.2191C7.85954 14.5299 7.58359 14.8438 7.40078 15.0875C7.29028 15.2348 7.1898 15.3889 7.10376 15.5517C6.85913 16.0392 7.06265 16.6505 7.55044 16.8944C8.04053 17.1395 8.63565 16.9443 8.88619 16.4588C8.9 16.4339 9.08816 16.1082 9.49735 15.7809C9.95782 15.4125 10.7406 15 11.9977 15C13.2547 15 14.0375 15.4125 14.498 15.7809C14.9072 16.1082 15.0953 16.4339 15.1091 16.4588Z"
                        fill="#0F0F0F"
                      ></path>{" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM12 20.9932C7.03321 20.9932 3.00683 16.9668 3.00683 12C3.00683 7.03321 7.03321 3.00683 12 3.00683C16.9668 3.00683 20.9932 7.03321 20.9932 12C20.9932 16.9668 16.9668 20.9932 12 20.9932Z"
                        fill="#0F0F0F"
                      ></path>{" "}
                    </g>
                  </svg>
                  <p className="text-center mt-2">Ok</p>
                </div>

                {/* AVG */}
                <div>
                  <svg
                    fill="#000000"
                    width="64px"
                    height="64px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M12,1A11,11,0,1,0,23,12,11.013,11.013,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9.011,9.011,0,0,1,12,21Zm6-8A6,6,0,0,1,6,13a1,1,0,0,1,2,0,4,4,0,0,0,8,0,1,1,0,0,1,2,0ZM8,10V9a1,1,0,0,1,2,0v1a1,1,0,0,1-2,0Zm6,0V9a1,1,0,0,1,2,0v1a1,1,0,0,1-2,0Z"></path>
                    </g>
                  </svg>
                  <p className="text-center mt-2">Avg</p>
                </div>

                {/*  GOOD*/}
                <div>
                  <svg
                    width="64px"
                    height="64px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M8.5 11C9.32843 11 10 10.3284 10 9.5C10 8.67157 9.32843 8 8.5 8C7.67157 8 7 8.67157 7 9.5C7 10.3284 7.67157 11 8.5 11Z"
                        fill="#0F0F0F"
                      ></path>{" "}
                      <path
                        d="M17 9.5C17 10.3284 16.3284 11 15.5 11C14.6716 11 14 10.3284 14 9.5C14 8.67157 14.6716 8 15.5 8C16.3284 8 17 8.67157 17 9.5Z"
                        fill="#0F0F0F"
                      ></path>{" "}
                      <path
                        d="M8.88875 13.5414C8.63822 13.0559 8.0431 12.8607 7.55301 13.1058C7.05903 13.3528 6.8588 13.9535 7.10579 14.4474C7.18825 14.6118 7.29326 14.7659 7.40334 14.9127C7.58615 15.1565 7.8621 15.4704 8.25052 15.7811C9.04005 16.4127 10.2573 17.0002 12.0002 17.0002C13.7431 17.0002 14.9604 16.4127 15.7499 15.7811C16.1383 15.4704 16.4143 15.1565 16.5971 14.9127C16.7076 14.7654 16.8081 14.6113 16.8941 14.4485C17.1387 13.961 16.9352 13.3497 16.4474 13.1058C15.9573 12.8607 15.3622 13.0559 15.1117 13.5414C15.0979 13.5663 14.9097 13.892 14.5005 14.2194C14.0401 14.5877 13.2573 15.0002 12.0002 15.0002C10.7431 15.0002 9.96038 14.5877 9.49991 14.2194C9.09071 13.892 8.90255 13.5663 8.88875 13.5414Z"
                        fill="#0F0F0F"
                      ></path>{" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM12 20.9932C7.03321 20.9932 3.00683 16.9668 3.00683 12C3.00683 7.03321 7.03321 3.00683 12 3.00683C16.9668 3.00683 20.9932 7.03321 20.9932 12C20.9932 16.9668 16.9668 20.9932 12 20.9932Z"
                        fill="#0F0F0F"
                      ></path>{" "}
                    </g>
                  </svg>
                  <p className="text-center mt-2">Good</p>
                </div>

                {/* BEST */}
                <div>
                  <svg
                    width="64px"
                    height="64px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="miter"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line
                        x1="8"
                        y1="9"
                        x2="8.01"
                        y2="9"
                        strokeWidth="2"
                        strokeLinecap="round"
                      ></line>
                      <line
                        x1="15.99"
                        y1="9"
                        x2="16"
                        y2="9"
                        strokeWidth="2"
                        strokeLinecap="round"
                      ></line>
                      <path d="M6,13H18s-1,5-6,5S6,13,6,13Z"></path>
                    </g>
                  </svg>
                  <p className="text-center mt-2">Best</p>
                </div>
              </div>
            </div>
            {/* Stepper */}
            <div className="py-3 ">
              <h6 className="or-tr-h6 mb-3">Tracking History </h6>
              <div className="ms-">
                <Stepper />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderTracking;
