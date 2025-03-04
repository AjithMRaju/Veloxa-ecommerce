/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../Utils/Firbase/firebaseConfig";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserAuth,
  setGlobalLoader,
} from "../../Utils/Redux/productSlice";

import {
  deleteOrderFromFirestore,
  getOrderRecords,
} from "../../Functions/wishlistService";
import { IoHelpBuoyOutline } from "react-icons/io5";
import { HiDocumentArrowDown } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import SpaceAdjuster from "../../Components/SpaceAdjuster/SpaceAdjuster";
import { current } from "@reduxjs/toolkit";

// ---
const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [renderIdProduct, setRenderIdProduct] = useState(null);
  const [activeIndexTab, setActiveIndexTab] = useState(0);
  const [navigationId, setNavigationId] = useState("");
  const currentUser = useSelector(selectUserAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //   ---
  // Fetch orders for the current user
  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     if (currentUser?.uid) {
  //       setIsLoading(true);
  //       dispatch(setGlobalLoader(true));
  //       setError(null);

  //       try {
  //         const ordersRef = collection(db, "orderRecords");
  //         const q = query(ordersRef, where("userId", "==", currentUser.uid));
  //         const querySnapshot = await getDocs(q);

  //         const userOrders = [];
  //         querySnapshot.forEach((doc) => {
  //           userOrders.push({
  //             orderId: doc.id, // Include the document ID (docRef.id)
  //             products: doc.data().products, // List of products in the order
  //           });
  //         });
  //         setRenderIdProduct(userOrders[0]?.products);
  //         setNavigationId(userOrders[0]?.orderId);
  //         setOrders(userOrders);
  //       } catch (error) {
  //         console.error("Failed to fetch orders: ", error);
  //         setError("Failed to fetch orders. Please try again.");
  //       } finally {
  //         setIsLoading(false);
  //         dispatch(setGlobalLoader(false));
  //       }
  //     }
  //   };

  //   fetchOrders();
  // }, [currentUser?.uid]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (currentUser?.uid) {
        setIsLoading(true);
        dispatch(setGlobalLoader(true));
        setError(null);

        try {
          const userOrders = await getOrderRecords(currentUser?.uid);
          setRenderIdProduct(userOrders[0]?.products);
          setNavigationId(userOrders[0]?.orderId);
          setOrders(userOrders);
        } catch (error) {
          console.error("Failed to fetch orders: ", error);

          setError("Failed to fetch orders. Please try again.");
        } finally {
          setIsLoading(false);
          dispatch(setGlobalLoader(false));
        }
      }
    };

    fetchOrders();
  }, [current?.uid]);

  const customStyle = {
    fontSize: "small",
    border: "none",
    outline: "none",
    borderRadius: "50px",
  };

  const calculateTotalPrice = (products) => {
    return products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };

  const handleClickTab = (index, product, orderID) => {
    setActiveIndexTab(index);
    setRenderIdProduct(product);
    setNavigationId(orderID);
  };

  const handleRemoveOrderItem = async (orderId) => {
    deleteOrderFromFirestore(orderId, dispatch);
    const orderResponse = await getOrderRecords(currentUser?.uid);
    setOrders(orderResponse);
  };

  const renderIdProducts = () => {
    return (
      <>
        {renderIdProduct?.map((eachItem) => {
          return (
            <div
              key={eachItem?.productId}
              className="d-flex justify-content-between align-items-center mb-3 border pb-lg- p-2"
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
                className="bg-white"
              >
                <img
                  src={eachItem?.image}
                  alt=""
                  className="w-100 h-100"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="cccart-text">
                <h5 className="p-title">{eachItem?.title}</h5>
                <p
                  className="text-secondary mb-0"
                  style={{ fontSize: "small" }}
                >{`${eachItem?.quantity} items`}</p>
              </div>
              <div>
                <h6>${eachItem?.price}</h6>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  // ---

  if (isLoading) {
    return (
      <section
        style={{
          width: "100vw",
          height: "100vh",
        }}
        className="d-flex align-items-center justify-content-center"
      >
        <p>Loading order details...</p>
      </section>
    );
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <section
      className="bg-white"
      style={{
        minHeight: "100vh",
      }}
    >
      <SpaceAdjuster />
      <div className="container my-lg-5   w-100 bg-white py-3 border-bottom">
        <div className="row">
          <div className="col-lg-6 d-flex align-items-center mb-4 mb-lg-0">
            <h5 className="mb-0">Your Orders ({orders?.length})</h5>
          </div>
          <div className="col-lg-6 d-flex justify-content-lg-end">
            <div className="d-flex">
              <button
                className="me-3 d-flex align-items-center px-3 py-2 border bg-white"
                style={{
                  fontSize: customStyle.fontSize,
                  borderRadius: customStyle.borderRadius,
                }}
              >
                <IoHelpBuoyOutline className="me-2" size={16} />
                Need Help?
              </button>
              <button
                className="d-flex align-items-center px-3 py-2 border bg-white"
                style={{
                  fontSize: customStyle.fontSize,
                  borderRadius: customStyle.borderRadius,
                }}
              >
                <HiDocumentArrowDown className="me-2" size={16} />
                Download Invoice
              </button>
            </div>
          </div>
        </div>
      </div>

      {orders.length ? (
        <div className="container">
          <div className="row justify-content-lg-around">
            <div className="col-lg-4 py-3 border-en bg-white border-end">
              <h6>Order History</h6>
              {orders?.map((eachOrder, _i) => {
                return (
                  <div
                    key={_i}
                    className={`${
                      _i === activeIndexTab && "active-order-history-tab"
                    } border my-3 rounded d-flex justify-content-between p-2 `}
                    //   className="border my-3 rounded d-flex justify-content-between p-2 order-history-tab"
                    onClick={() =>
                      handleClickTab(
                        _i,
                        eachOrder?.products,
                        eachOrder?.orderId
                      )
                    }
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <div>
                      <p style={{ fontSize: customStyle.fontSize }}>
                        {eachOrder?.orderId}
                      </p>
                      <p
                        style={{ fontSize: customStyle.fontSize }}
                        className="mt-2"
                      >
                        {" "}
                        ${calculateTotalPrice(eachOrder.products)}
                      </p>
                      <span
                        className="text-secondary"
                        style={{ fontSize: customStyle.fontSize }}
                      >{`${eachOrder?.products?.length} items`}</span>
                    </div>
                    <div className="d-flex flex-column justify-content-between align-items-end">
                      {/* <TbTruckDelivery fill="#6441c7" size={16} /> */}
                      <span style={{ fontSize: "small" }}>In Progress</span>
                      <MdDelete
                        size={25}
                        fill="#0007"
                        onClick={
                          () => handleRemoveOrderItem(eachOrder?.orderId)
                          // deleteOrderFromFirestore(eachOrder?.orderId, dispatch)
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-lg-8  py-3 bg-white ">
              <div className="bg- px-2 ">
                <div className="d-flex justify-content-between mb-3">
                  <h6>{`Order (${renderIdProduct?.length})`}</h6>
                  <button
                    style={{
                      border: "none",
                      fontSize: "small",
                      borderRadius: "50px",
                    }}
                    className="spc-btn text-white"
                    onClick={() =>
                      navigate(`/my-order-details/${navigationId}`)
                    }
                  >
                    View
                  </button>
                </div>
                {renderIdProducts()}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container d-flex justify-content-center flex-column align-items-center mt-lg-5 pt-lg-5">
          <h5>No Orders Yet !</h5>
          <p style={{ fontSize: "small" }}>
            Looks like you haven&apos;t placed any orders yet. Once you do, your
            order history will appear here.
          </p>
        </div>
      )}
    </section>
  );
};

export default UserOrders;
