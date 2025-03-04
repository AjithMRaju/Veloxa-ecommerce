import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import { FaRegUser, FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { Link } from "react-router-dom";
import { selectUserAuth } from "../../../Utils/Redux/productSlice";
import { useSelector, useDispatch } from "react-redux";
import { setShowLogin } from "../../../Utils/Redux/productSlice";
// ---
const ProfileOffcanvas = () => {
  const [Profileshow, setProfileShow] = useState(false);
  const currentUser = useSelector(selectUserAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // ---
  const handleClose = () => setProfileShow(false);
  const handleShows = () => setProfileShow(true);
  const handleRedirections = () => {
    navigate("/myOrders");
    handleClose();
  };

  return (
    <div>
      <div
        onClick={handleShows}
        className="d-flex flex-column align-items-center"
      >
        <FaUser size={25} />
        {/* Profile */}
      </div>

      {/* Offcanvas Component */}
      <Offcanvas
        show={Profileshow}
        onHide={handleClose}
        placement="bottom"
        className="offcanvas-profile"
      >
        <Offcanvas.Header closeButton className="border-bottom">
          <Offcanvas.Title>
            {currentUser?.uid && (
              <div className="userProfile d-flex align-items-center">
                {/* <img
                  src="https://static.vecteezy.com/system/resources/previews/009/397/835/original/man-avatar-clipart-illustration-free-png.png"
                  alt=""
                  className="border"
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                /> */}
                <FaRegUser />
                <h6 className="mb-0 ps-2" style={{ fontWeight: "700" }}>
                  {currentUser?.uid && `Hello, ${currentUser?.email}`}
                </h6>
              </div>
            )}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="">
            <div className="row">
              <div className="col-6 text-center   p- mb-4 ">
                <div
                  className="border p-3 rounded"
                  onClick={handleRedirections}
                  style={{ background: "#f5f5f5", fontWeight: "700" }}
                >
                  Orders
                </div>
              </div>
              <div className="col-6 text-center   p- mb-4 ">
                <div
                  className="border p-3 rounded"
                  style={{ background: "#f5f5f5", fontWeight: "700" }}
                >
                  WhisList
                </div>
              </div>
              <div className="col-6 text-center   p- mb-4 ">
                <div
                  className="border p-3 rounded"
                  style={{ background: "#f5f5f5", fontWeight: "700" }}
                >
                  Coupens
                </div>
              </div>
              <div className="col-6 text-center   p- mb-4 ">
                <div
                  className="border p-3 rounded"
                  style={{ background: "#f5f5f5", fontWeight: "700" }}
                >
                  Helpcenter
                </div>
              </div>
            </div>
          </div>
          <ul className="border-bottom border-top p-0 py-3">
            <li className="mb-3">
              <IoMdSettings className="icon-large " />
              <span className="icon-span">Settings</span>
            </li>
            <li className="mb-3">
              <RiAccountPinCircleFill className="icon-large " />
              <span className="icon-span">Profile</span>
            </li>
            <li className="mb-3 d-flex" onClick={handleClose}>
              <Link to="/wishList">
                <FaHeart className="icon-large " color="red" />
                <span className="icon-span"> WishList</span>
              </Link>
            </li>
            <li className="mb-3">
              {!currentUser?.uid ? (
                <button
                  className="loginButn"
                  onClick={(e) => {
                    e.preventDefault(),
                      dispatch(setShowLogin(true)),
                      setProfileShow(false);
                  }}
                >
                  Login
                </button>
              ) : (
                <>
                  <IoLogOut className="icon-large " />
                  <span className="icon-span">Logout</span>
                </>
              )}
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default ProfileOffcanvas;
