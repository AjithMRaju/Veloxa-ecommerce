/* eslint-disable react/prop-types */
// import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { mobileNavConstant } from "../../Utils/Constants/Constants";
import {
  setGlobalLoader,
  setReferrAndEarnBOx,
} from "../../Utils/Redux/productSlice";
import { IoHome } from "react-icons/io5";
import { useNavigate, Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { auth } from "../../Utils/Firbase/firebaseConfig";
import { signOut } from "firebase/auth";
// import { extractUsernameFirstLetter } from "../../Functions/wishlistService";
import Badge from "@mui/material/Badge";
import CartOffcanvas from "../../Components/Offcanvas/CartOffcanvas/CartOffcanvas";
import ProfileOffcanvas from "../../Components/Offcanvas/ProfileOffcanvas/ProfileOffcanvas";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Whislist from "../../Components/Offcanvas/Whislist/Whislist";
import LoginDropdown from "../../Pages/Login/LoginDropdown";
import Header from "../Header/Header";
import Notification from "../../components/Subcomponents/Notification";
import MarqueeC from "../../Components/Marquee/Marquee";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";

import { IoIosArrowDown, IoMdCart, IoMdNotifications } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import { onSnapshot } from "firebase/firestore";
import {
  cartCollection,
  notificationRef,
} from "../../Functions/wishlistService";

// ---
const Navbars = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const locationPath = location.pathname;
  const [anchorEl, setAnchorEl] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeader, setIsHeader] = useState(false);
  const [activeMobileNav, setActiveMobileNav] = useState("home");
  const [query, setQuery] = useState("");
  const [isNotification, setIsNotification] = useState(false);
  const [notification, setNotificationCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    console.log("refreshing...");
  }, [locationPath]);

  //--- CHANGIN NAVBAR BACKGROUND COLOR FUNCTION..
  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled down more than 50 pixels
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // FETCHING NOTIFICATION COUNT
  useEffect(() => {
    if (!user?.uid) return;

    const unsubscribe = onSnapshot(notificationRef, (snapshot) => {
      const notificationsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const userNotifications = notificationsData.filter(
        (notification) => notification.userId === user.uid
      );
      setNotificationCount(userNotifications.length);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  // CONST FETCHING CART COUNT
  useEffect(() => {
    if (!user?.uid) return;

    const unsubscribe = onSnapshot(cartCollection, (snapshot) => {
      const cartCountData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const userCartCount = cartCountData.filter(
        (eachCount) => eachCount.userId === user.uid
      );
      setCartCount(userCartCount.length);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    dispatch(setGlobalLoader(true));
    try {
      await signOut(auth);
      console.log("User  signed out successfully");
      dispatch(setGlobalLoader(false));
      // Optionally, redirect or update UI state here
    } catch (error) {
      console.error("Error signing out: ", error);
    } finally {
      dispatch(setGlobalLoader(false));
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.length) {
      navigate("/searchQuery", { state: { query } });
    }
  };

  // rendering notification badge
  const renderNotificationBager = () => {
    return (
      <>
        <Badge badgeContent={notification} color="primary">
          <IoMdNotifications
            size={25}
            fill={isScrolled ? "white" : "black"}
            onClick={() => setIsNotification(!isNotification)}
          />
        </Badge>
        {isNotification && (
          <div className="testing-notification mt-3">
            <Notification />
          </div>
        )}
      </>
    );
  };

  return (
    <main className={`${isScrolled && "activeNavbarMain"}  navbarMain`}>
      {/* <main className="navbarMain"> */}
      <div
        className={`${
          locationPath == "/signUp"
            ? "d-none"
            : "navTop navbar-hidden d-flex justify-content-center align-items-center"
        }`}
      >
        <MarqueeC />
      </div>

      <Navbar
        expand="lg"
        className={`${
          locationPath == "/signUp" ? "d-none" : "mt-lg-3 navbar-hidden"
        } "`}
      >
        <Container>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <div className="w-100 d-lg-flex justify-content-between align-items-center">
              <Nav
                className="align-items-center"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Link to="/">
                  <h1 className="me-5">H & M</h1>
                </Link>
                <div
                  onClick={() => setIsHeader(!isHeader)}
                  style={{ cursor: "pointer" }}
                >
                  <p
                    className={`${
                      isScrolled ? "text-white" : "text-dark"
                    } categoryNav px-2`}
                  >
                    Categories
                    <IoIosArrowDown />
                  </p>{" "}
                </div>
              </Nav>

              <form
                className="InputContainer"
                onSubmit={(e) => handleSearch(e)}
              >
                <input
                  placeholder="Search for Products, Brand and More"
                  id="input"
                  className="input"
                  name="query"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />

                <label className="labelForsearch" htmlFor="input">
                  <svg className="searchIcon" viewBox="0 0 512 512">
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
                  </svg>
                </label>
              </form>

              <div className="d-flex justify-content-center align-items-center">
                <div className="df">
                  <Whislist isScrolled={isScrolled} />
                </div>
                <div>
                  {user ? (
                    <CustomProfileDropdown
                      anchorEl={anchorEl}
                      handleClick={handleClick}
                      handleClose={handleClose}
                      user={user}
                      handleSignOut={handleSignOut}
                      open={open}
                    />
                  ) : (
                    <LoginDropdown />
                  )}
                </div>
                <div className="ms-2">
                  <IconButton
                    aria-label="cart"
                    badge
                    Content={cartCount}
                    color="inherit"
                  >
                    <StyledBadge
                      badgeContent={cartCount}
                      color="secondary"
                      onClick={() => navigate("/cart")}
                    >
                      <IoMdCart fill={isScrolled ? "white" : "black"} />
                    </StyledBadge>
                  </IconButton>
                </div>
                <div
                  className="ms-3 position-relative"
                  style={{ width: "50px", cursor: "pointer" }}
                >
                  {renderNotificationBager()}
                </div>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {isHeader && (
        <div
          className={`${
            locationPath == "/signUp" ? "d-none" : "d-none d-lg-block"
          } `}
        >
          <Header locationPath={locationPath} isScrolled={isScrolled} />
        </div>
      )}

      {/* MOBILE NAV BOTTOM */}
      <div className="container  d-block d-lg-none d-flex align-items-center">
        <ul
          className="p-3 px-5 m-0 d-flex w-100 justify-content-between sm-nav"
          style={{ listStyle: "none" }}
        >
          <li
            className={`${
              activeMobileNav === "Home" && "enableActiveNav"
            } d-flex flex-column text-white justify-content-center align-items-center`}
            onClick={() => setActiveMobileNav("Home")}
          >
            <Link to="/">
              <IoHome size={25} fill="white" />
            </Link>
          </li>
          <li
            className={`${
              activeMobileNav === "Category" && "enableActiveNav"
            } d-flex flex-column justify-content-center align-items-center`}
            onClick={() => setActiveMobileNav("Category")}
          >
            <CartOffcanvas />
          </li>
          <li
            className={`${
              activeMobileNav === "Cart" && "enableActiveNav"
            } d-flex flex-column justify-content-center align-items-center`}
            onClick={() => setActiveMobileNav("Cart")}
          >
            <CustomCartIcon cartCount={cartCount} />
          </li>
          <li
            className={`${
              activeMobileNav === "Profile" && "enableActiveNav"
            } d-flex flex-column justify-content-center align-items-center`}
            onClick={() => setActiveMobileNav("Profile")}
          >
            <ProfileOffcanvas />
          </li>
        </ul>
      </div>
    </main>
  );
};

export default Navbars;

// cart icons component
export const CustomCartIcon = ({ cartCount }) => {
  const navigate = useNavigate();
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  return (
    <IconButton aria-label="cart" badge Content={cartCount} color="inherit">
      <StyledBadge
        badgeContent={cartCount}
        color="secondary"
        onClick={() => navigate("/cart")}
      >
        <IoMdCart size={25} />
      </StyledBadge>
    </IconButton>
  );
};

// profile dropdown
export const CustomProfileDropdown = ({
  handleClick,
  anchorEl,
  handleClose,
  handleSignOut,
  // user,
  open,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{
                width: 25,
                height: 25,
                // bgcolor: deepOrange[500],
              }}
            >
              <FaUser size={15} />
              {/* {extractUsernameFirstLetter(user?.email)} */}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        disableScrollLock={true}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
      >
        <MenuItem
          onClick={() => {
            navigate("/account"), handleClose;
          }}
        >
          Profile
        </MenuItem>
        {/* <MenuItem >
          <div style={{ width: "50px" }}>
            <Whislist iconsText="WishList" />
          </div>
        </MenuItem> */}

        <MenuItem
          onClick={() => {
            handleClose, navigate("/myOrders");
          }}
        >
          My Orders
        </MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem
          onClick={() => {
            handleClose, dispatch(setReferrAndEarnBOx(true));
          }}
        >
          Referr & Earn
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <span onClick={handleSignOut}> Logout</span>
        </MenuItem>
      </Menu>
    </>
  );
};
