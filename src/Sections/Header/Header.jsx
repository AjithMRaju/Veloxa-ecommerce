/* eslint-disable react/prop-types */
import { useState } from "react";
import { headerNavigation } from "../../Utils/Data/Data";
import { RiArrowDropDownLine } from "react-icons/ri";

const Header = ({ locationPath,isScrolled }) => {
  const [activeNav, setActiveNav] = useState(0);
  const [showSubnav, setShowSub] = useState(false);
  const [index, setIndex] = useState("");
  const [activeBorder, setActiveBorder] = useState("");
  // ****
  const subNave = headerNavigation[index]?.subcategories;

  return (
    <header
      className="mt- position-relative d-none d-lg-block"
      onMouseLeave={() => {
        setShowSub(false), setActiveBorder("");
      }}
    >
      <section className="">
        <div className="container">
          <ul
            className={`${locationPath === "/" || isScrolled  ? "text-white " : "text-dark"} p-3 m-0 d-flex justify-content-center align-items-center header`}
          >
            {/* <ul className="p-3 m-0 d-flex justify-content-center align-items-center header"> */}
            {headerNavigation?.map((items, _i) => {
              return (
                <li
                  key={_i}
                  className={`${
                    items?.title === activeBorder && "activeNavBorder"
                  } me-3 mb-2`}
                  // className="me-3"
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => {
                    setShowSub(true),
                      setIndex(_i),
                      setActiveBorder(items?.title);
                  }}
                >
                  {items?.title}
                  <RiArrowDropDownLine />
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      {/* Render dropdown only if subNave has values */}
      {showSubnav && subNave?.length > 0 && (
        <section className="position-ab">
          <div className="container">
            <div
              className=" d-flex align-items-center p-3 subnav"
              onMouseLeave={() => {
                setShowSub(false), setActiveBorder("");
              }}
            >
              {subNave.map((subItem, subIndex) => (
                <ul
                  key={subIndex}
                  className={`${
                    subIndex === activeNav && "activeSubnav"
                  } me-5 p-0`}
                  onClick={() => setActiveNav(subIndex)}
                >
                  <h6 className="mb-3">
                    {subItem.title}
                    {subItem?.subcategories?.length > 0 && (
                      <RiArrowDropDownLine />
                    )}
                  </h6>

                  {subItem?.subcategories?.map((item, _i) => (
                    <li key={_i} className="ms-2">
                      {item?.title}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </section>
      )}
    </header>
  );
};

export default Header;
