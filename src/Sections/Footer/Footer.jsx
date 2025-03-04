import { footerApi, footerFeatures } from "../../Utils/Data/Data";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="pt-5">
      <div className="container">
        <div className="row">
          <div className="col-sm-12  col-lg-7">
            <div className="row">
              {footerApi.map((items, i) => {
                return (
                  <div key={i} className="col-sm-6 col-lg-3 mb-4">
                    <h6 className="mb-4">{items.title}</h6>
                    {items.links.map((value, i) => {
                      return (
                        <Link to="#" key={i}>
                          <p className="mb-0">{value}</p>
                        </Link>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-sm-12  col-lg-5"></div>
        </div>
      </div>
      {/* bottom */}
      <div
        className="container mt-5 py-4"
        style={{ borderTop: "1px solid rgb(65 64 64)" }}
      >
        <div className="row">
          {footerFeatures.map((features, i) => {
            return (
              <div key={i} className="col-sm-6 col-lg-3">
                <h4 className="text-white">{features}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
