/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { selectUserLoginDetails } from "../../Utils/Redux/productSlice";
import { useSelector } from "react-redux";
import {
  Avatar,
  TextField,
  Button,
  Container,
  Typography,
  Box,
  IconButton,
  Drawer,
} from "@mui/material";
import { getAddress } from "../../Functions/wishlistService";
import { BiEditAlt } from "react-icons/bi";
import SpaceAdjuster from "../../Components/SpaceAdjuster/SpaceAdjuster";
import { TbCategory2 } from "react-icons/tb";
// ---
const UserProfile = () => {
  const currentUser = useSelector(selectUserLoginDetails);
  const [renderSections, setRenderSections] = useState("Profile");
  const sectionList = ["Profile", "Address", "Super Coins"];
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });
  // ---

  useEffect(() => {
    setUser({
      name: currentUser?.displayName,
      email: currentUser?.email,
      phone: currentUser?.phoneNumber,
    });
  }, [currentUser]);

  // ---
  const secondaryLists = [
    "FAQs",
    "Terms & Conditions",
    "Privacy Policy",
    "Cancellation Policy",
    "Return & Refund Policy",
    "Logout",
  ];

  // RENDERING FUNCTIONS
  const renderProfileGrid = () => {
    const handleChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };
    return (
      <section className="renderProfileGrid border d-flex flex-column align-items-center justify-content-center">
        <Container maxWidth="sm">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{
              p: 3,
              bgcolor: "white",
            }}
          >
            <Box position="relative">
              <Avatar
                sx={{ width: 80, height: 80, mb: 1 }}
                src=""
                alt="User Profile"
              />
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: 5,
                  right: 5,
                  bgcolor: "white",
                  p: 0.5,
                  boxShadow: 2,
                }}
                size="small"
              >
                <BiEditAlt />
              </IconButton>
            </Box>

            <Typography variant="body2" fontWeight="bold">
              {user.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {user.email}
            </Typography>

            <TextField
              fullWidth
              label="Name"
              name="name"
              variant="outlined"
              margin="normal"
              value={user.name}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              variant="outlined"
              margin="normal"
              value={user.email}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              variant="outlined"
              margin="normal"
              value={user.phone}
              onChange={handleChange}
            />

            <Button
              fullWidth
              sx={{ mt: 2, py: 1, background: "#6441c7", color: "#fff" }}
            >
              Update Profile
            </Button>
          </Box>
        </Container>
      </section>
    );
  };

  // RENDERING ADDRESS SECTION
  const renderAddressSection = () => {
    return (
      <section>
        <div className="d-flex align-items-center justify-content-between">
          <p style={{ fontSize: "small" }}>Default Address</p>
          <button className="add-address-btn px-3">Add New Address</button>
        </div>
        <div className="border rounded mt-4">
          <RenderAddressBox userId={currentUser?.uid} />
        </div>
      </section>
    );
  };
  const renderSuperCoins = () => {
    return <p>rendering coins grid</p>;
  };

  // ---
  return (
    <section
      className="bg-white"
      style={{ minHeight: "100vh", minWidth: "100vw" }}
    >
      <SpaceAdjuster />
      <div className="container my-lg-5">
        <div className="row">
          <div className="col-lg-3 d-none d-md-block">
            {sectionList.map((eachList, _i) => {
              return (
                <div
                  key={_i}
                  className="border-bottom  py-3 ps-3"
                  style={{
                    background: "#f5f5f5",
                    fontSize: "small",
                    cursor: "pointer",
                    fontWeight: `${eachList === renderSections ? "600" : ""}`,
                    color: "#000",
                  }}
                  onClick={() => setRenderSections(eachList)}
                >
                  {eachList}
                </div>
              );
            })}
            <ul className="p-0 ps-3 my-3">
              {secondaryLists.map((eachList, _i) => {
                return (
                  <li
                    key={_i}
                    className="mb-2"
                    style={{ fontSize: "small", cursor: "pointer" }}
                  >
                    {eachList}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="col-lg-9 mt-5 mt-lg-0">
            <div className="">
              <div className="mb-3">
                <p style={{ fontSize: "small" }}>
                  Home
                  <MdOutlineKeyboardArrowRight /> {renderSections}
                </p>
              </div>
              <div>
                <h6>{renderSections}</h6>
              </div>
              <div className="d-lg-none my-3">
                <RenderMobileDrawer
                  renderSections={renderSections}
                  secondaryLists={secondaryLists}
                  setRenderSections={setRenderSections}
                  sectionList={sectionList}
                />
              </div>
            </div>
            <section className="mt-4 w-100 ">
              {renderSections === "Profile" && renderProfileGrid()}
              {renderSections === "Address" && renderAddressSection()}
              {renderSections === "Super Coins" && renderSuperCoins()}
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;

export const RenderAddressBox = ({ userId }) => {
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // ---
  useEffect(() => {
    const fetchAddress = async () => {
      setLoading(true);
      try {
        const response = await getAddress(userId);
        setAddress(response[0]);
      } catch (error) {
        console.log(error.message);

        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAddress();
  }, [userId]);

  const customSize = {
    fontSize: "small",
  };

  if (loading) {
    return (
      <div
        className="w-100 d-flex align-items-center justify-content-center "
        style={{ height: "300px" }}
      >
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="w-100 d-flex align-items-center justify-content-center "
        style={{ height: "300px" }}
      >
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-between align-items-end p-3 h-100">
      <div className="d-flex">
        <div>
          <h6>{address?.name}</h6>
          <p style={customSize}>Age: {address?.age}</p>
          <p style={customSize}>{address?.gender}</p>
          <p style={customSize}>House number :{address?.houseNumber}</p>
          <p style={customSize}>PH: {address?.phoneNumber}</p>
          <p style={customSize}>{address?.secondaryPhoneNumber}</p>
          <p style={customSize}>State: {address?.state}</p>
          <p style={customSize}>Country: {address?.country}</p>
          <p style={customSize}>Postel Code: {address?.pincode}</p>
        </div>
        <div>
          <p style={customSize} className="activeAddress-tag px-3">
            Active
          </p>
        </div>
      </div>
      <div className="h-100 d-flex">
        <button className="renderAddress-btn px-3">Edit</button>
        <button className="renderAddress-btn px-3 ms-2">Delete</button>
      </div>
    </div>
  );
};

// const renderMobile drawer
export const RenderMobileDrawer = ({
  secondaryLists,
  renderSections,
  sectionList,
  setRenderSections,
}) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
      <TbCategory2 size={25} onClick={toggleDrawer(true)} />
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        sx={{ "& .MuiDrawer-paper": { width: 300 ,zIndex:"999"} }}
      >
        {sectionList?.map((eachList, _i) => {
          return (
            <div
              key={_i}
              className="border-bottom  py-3 ps-3 "
              style={{
                background: "#f5f5f5",
                fontSize: "small",
                cursor: "pointer",
                fontWeight: `${eachList === renderSections ? "600" : ""}`,
                color: "#000",
              }}
              onClick={() => {
                setRenderSections(eachList), setOpen(false);
              }}
            >
              {eachList}
            </div>
          );
        })}
        <ul className="p-0 ps-3 my-3">
          {secondaryLists.map((eachList, _i) => {
            return (
              <li
                key={_i}
                className="mb-2"
                style={{ fontSize: "small", cursor: "pointer" }}
              >
                {eachList}
              </li>
            );
          })}
        </ul>
      </Drawer>
    </div>
  );
};
