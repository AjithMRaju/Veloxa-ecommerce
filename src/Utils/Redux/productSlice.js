import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    allInitialProducts: [],
    wishListProducts: [],
    deliveryAddress: [],
    cartProducts: [],
    productListingLoading: false,
    notificationStatus: false,
    showLogin: false,
    enableAlert: false,
    gloBalLoader: false,
    snackBar: false,
    referrAndEarn: false, //change it later to true
    orderSuccessAlert: false,
    cartCount: 0,
    notificationMessage: "",
    orderDetailsId: "",
    snackbarMessage: "",
    alertMessage: "",
    userAuth: null,
    userLoginDetails: null,
  },

  reducers: {
    getAllInitialProducts: (state, action) => {
      state.allInitialProducts = action.payload;
    },

    getWishlistProducts: (state, action) => {
      state.wishListProducts = action.payload;
    },
    getDeliveryAdrress: (state, action) => {
      state.deliveryAddress = action.payload;
    },
    getCartProducts: (state, action) => {
      state.cartProducts = action.payload;
    },

    productListingLoadingStatus: (state, action) => {
      state.productListingLoading = action.payload;
    },
    setCartCount: (state, action) => {
      state.cartCount = action.payload;
    },
    setNotificationStatus: (state, action) => {
      state.notificationStatus = action.payload;
    },
    setNotificationMessage: (state, action) => {
      state.notificationMessage = action.payload;
    },

    setShowLogin: (state, action) => {
      state.showLogin = action.payload;
    },
    setEnableAlert: (state, action) => {
      state.enableAlert = action.payload;
    },
    setAlertMessage: (state, action) => {
      state.alertMessage = action.payload;
    },
    setUserAuth: (state, action) => {
      const { uid, email } = action.payload;
      state.userAuth = { uid, email };
    },
    setUserLoginDetails: (state, action) => {
      state.userLoginDetails = action.payload;
    },
    setGlobalLoader: (state, action) => {
      state.gloBalLoader = action.payload;
    },
    setSnackBar: (state, action) => {
      state.snackBar = action.payload;
    },
    setSnackBarMessage: (state, action) => {
      state.snackbarMessage = action.payload;
    },
    setReferrAndEarnBOx: (state, action) => {
      state.referrAndEarn = action.payload;
    },
    setOrderSuccessAlert: (state, action) => {
      state.orderSuccessAlert = action.payload;
    },
    setOrderDetailsId: (state, action) => {
      state.orderDetailsId = action.payload;
    },
  },
});

export const {
  getAllInitialProducts,
  getWishlistProducts,
  getDeliveryAdrress,
  getCartProducts,
  productListingLoadingStatus,
  setCartCount,
  setNotificationStatus,
  setNotificationMessage,
  setShowLogin,
  setEnableAlert,
  setAlertMessage,
  setUserAuth,
  setGlobalLoader,
  setSnackBar,
  setSnackBarMessage,
  setReferrAndEarnBOx,
  setOrderSuccessAlert,
  setOrderDetailsId,
  setUserLoginDetails,
} = productSlice.actions;
export const selectAllInitialProducts = (state) =>
  state.products.allInitialProducts;
export const selectWishlistProducts = (state) =>
  state.products.wishListProducts;
export const selectDeliveryAddress = (state) => state.products.deliveryAddress;
export const selectCartpoducts = (state) => state.products.cartProducts;
export const selectProductListingLoading = (state) =>
  state.products.productListingLoading;
export const selectCartCount = (state) => state.products.cartCount;
export const selectNotificationStatus = (state) =>
  state.products.notificationStatus;
export const selectNotificationMessage = (state) =>
  state.products.notificationMessage;
export const selectShowLogin = (state) => state.products.showLogin;
export const selcetEnableAlert = (state) => state.products.enableAlert;
export const selectAlertMessage = (state) => state.products.alertMessage;
export const selectUserAuth = (state) => state.products.userAuth;
export const selectUserLoginDetails = (state) => state.products.userLoginDetails;
export const selectGlobalLoader = (state) => state.products.gloBalLoader;
export const selectSnackBar = (state) => state.products.snackBar;
export const selectSnackbarMsg = (state) => state.products.snackbarMessage;
export const selectOrderDetailsId = (state) => state.products.orderDetailsId;
export const selectReferrAndEarnBox = (state) => state.products.referrAndEarn;
export const selectOrderSuccessAlert = (state) =>
  state.products.orderSuccessAlert;

export default productSlice.reducer;
