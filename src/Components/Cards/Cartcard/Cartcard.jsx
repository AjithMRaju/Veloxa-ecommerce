import { FiX } from "react-icons/fi";
// eslint-disable-next-line react/prop-types
const Cartcard = ({ image, title, category, quantity, price }) => {
  return (
    <>
      <div className="col-lg-2 col-sm-2">
        <img src={image} alt={title} style={{ width: "100px" }} />
      </div>
      <div className="col-lg-4 ">
        <p className="mb-2" style={{ color: "#b3b3b3", fontWeight: "500" }}>
          {" "}
          {category}
        </p>
        <p className="mb-0 p-title"> {title}</p>
      </div>
      <div className="col-lg-2  d-flex justify-content-lg-center">
        <p className="mb-0 cart-quantity">{quantity}</p>
      </div>
      <div className="col-lg-2  d-flex justify-content-lg-center">
        <p className="mb-0 p-price">{price}</p>
      </div>
      <div className="col-lg-2  d-flex justify-content-lg-end">
        <FiX />
      </div>
    </>
  );
};

export default Cartcard;
