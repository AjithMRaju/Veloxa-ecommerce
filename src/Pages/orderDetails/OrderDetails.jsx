/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Utils/Firbase/firebaseConfig";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserAuth,
  setGlobalLoader,
} from "../../Utils/Redux/productSlice";
import { useParams } from "react-router-dom";
import SpaceAdjuster from "../../Components/SpaceAdjuster/SpaceAdjuster";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CCcard from "../../Components/Cards/CCcard/CCcard";
import Stepper from "../../Components/Stepper/Stepper";
// ---
const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("1");
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // ---
  // Fetch order details for the specific orderId
  useEffect(() => {
    const fetchOrderDetails = async () => {
      setIsLoading(true);
      dispatch(setGlobalLoader(true));
      setError(null);

      try {
        const orderRef = doc(db, "orderRecords", orderId);
        const orderSnapshot = await getDoc(orderRef);

        if (orderSnapshot.exists()) {
          setOrder({ id: orderSnapshot.id, ...orderSnapshot.data() });
        } else {
          setError("Order not found.");
        }
      } catch (error) {
        console.error("Failed to fetch order details: ", error);
        setError("Failed to fetch order details. Please try again.");
      } finally {
        setIsLoading(false);
        dispatch(setGlobalLoader(false));
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (isLoading) {
    return (
      <section
        className="d-flex align-items-center justify-content-center"
        style={{ width: "100vw", height: "100vh" }}
      >
        <p>Loading order details...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section
        className="d-flex align-items-center justify-content-center"
        style={{ width: "100vw", height: "100vh" }}
      >
        <p className="text-danger">{error}</p>
      </section>
    );
  }

  if (!order) {
    return (
      <section
        className="d-flex align-items-center justify-content-center"
        style={{ width: "100vw", height: "100vh" }}
      >
        <p>No order details found.</p>
      </section>
    );
  }

  return (
    <section
      style={{
        height: "100vh",
      }}
      className="bg-white"
    >
      <SpaceAdjuster />
      <div className="container my-lg-5">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  label="Order History"
                  value="1"
                  sx={{
                    color: "black", // Initial color
                    "&:hover": {
                      color: "#6441c7", // Hover color
                    },
                    "&.Mui-selected": {
                      color: "#6441c7", // Active tab color
                    },
                  }}
                />
                <Tab
                  label="Item Details"
                  value="2"
                  sx={{
                    color: "black", // Initial color
                    "&:hover": {
                      color: "#6441c7", // Hover color
                    },
                    "&.Mui-selected": {
                      color: "#6441c7", // Active tab color
                    },
                  }}
                />
                <Tab
                  label="Receiver"
                  value="3"
                  sx={{
                    color: "black", // Initial color
                    "&:hover": {
                      color: "#6441c7", // Hover color
                    },
                    "&.Mui-selected": {
                      color: "#6441c7", // Active tab color
                    },
                  }}
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Stepper />
            </TabPanel>
            <TabPanel value="2">
              <RenderOrderProduct {...order} />
            </TabPanel>
            <TabPanel value="3">
              <RenderReceiverInfo {...order} />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </section>
  );
};

export default OrderDetails;

// rendering order product details
export const RenderOrderProduct = ({ products }) => {
  return (
    <div>
      <h5
        className="text-secondary"
        style={{ fontSize: "small" }}
      >{`Items  ${products?.length}`}</h5>
      <div className="row">
        {products?.length ? (
          <>
            {products.map((eachProduct) => {
              // const {image,price,productId,quantity,title} = eachProduct
              return (
                <div className="col-lg-12" key={eachProduct?.id}>
                  <CCcard {...eachProduct} staticQuantityButton />
                </div>
              );
            })}
          </>
        ) : (
          <p>Oops no order found</p>
        )}
      </div>
    </div>
  );
};

// renderReceiverInformation
// eslint-disable-next-line no-unused-vars
export const RenderReceiverInfo = ({ deliveryAddress }) => {
  return (
    <div className="bg- p-6 ">
      <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>
      <div
        className="rounded shadow-md  p-3"
        style={{
          border: "1px dotted #6441c7",
        }}
      >
        <p className="text-gray-700">
          <span className="font-medium">Name:</span> {deliveryAddress?.name}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Phone Number:</span>{" "}
          {deliveryAddress?.phoneNumber}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Secondary Phone Number:</span>{" "}
          {deliveryAddress?.secondaryPhoneNumber}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">House Number:</span>{" "}
          {deliveryAddress?.houseNumber}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">State:</span> {deliveryAddress?.state}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Country:</span>{" "}
          {deliveryAddress?.country}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Pincode:</span>{" "}
          {deliveryAddress?.pincode}
        </p>
      </div>
    </div>
  );
};
