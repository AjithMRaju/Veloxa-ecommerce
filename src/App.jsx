import "./App.css";
import { Fragment, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Utils/Firbase/firebaseConfig";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setUserAuth,
  setCartCount,
  productListingLoadingStatus,
  getAllInitialProducts,
  setUserLoginDetails,
} from "./Utils/Redux/productSlice";
import { getCart } from "./Functions/wishlistService";
import Hero from "./Sections/Hero/Hero";
import Navbar from "./Sections/Navbar/Navbar";
import Footer from "./Sections/Footer/Footer";
import SingleProductPage from "./Pages/SingleProductPage/SingleProductPage";
import NotificationToast from "./Pages/ToastNotification/NotificationToast";
import Cartpage from "./Pages/Cart/Cartpage";
import ChechoutPage from "./Pages/ChechoutPage/ChechoutPage";
import ProductsListing from "./Pages/ProductsListing/ProductsListing";
import WishList from "./Pages/WishList/WishList";
import AlertDialog from "./Components/Alert/AlertDialog";
import GlobalLoader from "./Components/Loaders/GlobalLoader";
import SnackbarMesg from "./Components/Snackbar/Snackbar";
import SuignUp from "./Pages/Signup/SuignUp";
import OrderTracking from "./Pages/OrderTracking/OrderTracking";
import ReferrAndEarn from "./Pages/Reffer&Earn/ReferrAndEarn";
import axiosInstance from "./api/axiosInstance";
import SearchResultsPage from "./Pages/SearchPage/SearchResultsPage ";
import OrderSuccess from "./Components/Alert/OrderSuccess/OrderSuccess";
import OrderDetails from "./Pages/orderDetails/OrderDetails";
import UserOrders from "./Pages/userOrders/UserOrders";
import NotificationPage from "./Pages/NotificationPage/NotificationPage";
import UserProfile from "./Pages/userProfile/userProfile";

// ----
function App() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      dispatch(
        setUserAuth({ uid: currentUser?.uid, email: currentUser?.email })
      );
      const userLoginDetails = {
        uid: user?.uid,
        displayName: user?.displayName,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        photoURL: user?.photoURL,
        emailVerified: user?.emailVerified,
        accessToken: user?.stsTokenManager.accessToken, // If needed
      };
      dispatch(setUserLoginDetails(userLoginDetails));
      checkWishlist(currentUser);
    });
    return () => unsubscribe(); // Clean up listener
  }, [user]);

  const checkWishlist = async (currentUser) => {
    if (currentUser) {
      const cartList = await getCart(currentUser.uid);
      dispatch(setCartCount(cartList?.length));
    }
  };

  useEffect(() => {
    dispatch(productListingLoadingStatus(true));
    fetchProducts();
    return () => {
      fetchProducts();
      dispatch(productListingLoadingStatus(false));
    };
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("products");
      dispatch(getAllInitialProducts(response?.data));
    } catch (error) {
      console.log(error.message);
    } finally {
      dispatch(productListingLoadingStatus(false));
    }
  };

  return (
    <Fragment>
      <Navbar user={user} />
      {user && <ReferrAndEarn />}

      <NotificationToast />
      <AlertDialog />
      <GlobalLoader />
      <SnackbarMesg />
      <OrderSuccess />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/ProductsListing" element={<ProductsListing />} />
        <Route
          path="/SingleProductPage/:id/:category"
          element={<SingleProductPage />}
        />
        <Route path="/cart" element={<Cartpage />} />
        <Route path="/checkout" element={<ChechoutPage />} />
        <Route path="/wishList" element={<WishList />} />
        <Route path="/my-order-details/:orderId" element={<OrderDetails />} />
        <Route path="/myOrders" element={<UserOrders />} />
        <Route path="/signUp" element={<SuignUp />} />
        <Route path="/orderTracking" element={<OrderTracking />} />
        <Route path="/searchQuery" element={<SearchResultsPage />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/account" element={<UserProfile />} />
      </Routes>
      <Footer />
    </Fragment>
  );
}

export default App;
