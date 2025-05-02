/* eslint-disable react-hooks/rules-of-hooks */
// wishlistService.js
import { db } from "../Utils/Firbase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  getWishlistProducts,
  setGlobalLoader,
  getDeliveryAdrress,
  getCartProducts,
  setSnackBar,
  setSnackBarMessage,
  setOrderDetailsId,
} from "../Utils/Redux/productSlice";

const wishlistCollection = collection(db, "wishlists");
export const cartCollection = collection(db, "cartCollection");
const addressCollectionRef = collection(db, "deliveryAddress");
export const notificationRef = collection(db, "notifications");

// WISHLIST FUNCTIONS.....
export const addToWishlist = async (
  userId,
  productId,
  dispatch,
  productData
) => {
  const existingWishlist = await getWishlist(userId);

  // Check if the product already exists in the wishlist
  if (existingWishlist.some((item) => item.productId === productId)) {
    return { exists: true };
  }

  // Add the product to the wishlist
  await addDoc(wishlistCollection, {
    userId,
    productId,
    ...productData,
  });

  const updateWishList = await getWishlist(userId);
  dispatch(getWishlistProducts(updateWishList));
  return { exists: false };
};

export const getWishlist = async (userId) => {
  if (!userId) {
    return [];
  }

  try {
    const q = query(wishlistCollection, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return [];
  }
};

// WISHLIST FUNCTIONS.....

// [-------------******-------------]

// CART FUNCTIONALITY...
export const addToCart = async (userId, productId, productData) => {
  const existingCart = await getCart(userId);

  // Check if the product already exists in the wishlist
  if (existingCart.some((item) => item.productId === productId)) {
    return { exists: true };
  }

  // Add the product to the wishlist
  await addDoc(cartCollection, {
    userId,
    productId,
    ...productData,
  });

  return { exists: false };
};

export const getCart = async (userId) => {
  if (!userId) {
    return [];
  }

  try {
    const q = query(cartCollection, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error("Error fetching cart:", error);
    return [];
  }
};

export const removeFromCart = async (userID, productId, dispatch) => {
  try {
    dispatch(setGlobalLoader(true));

    // Create a query to find the cart item for the specific user
    const q = query(
      collection(db, "cartCollection"),
      where("userId", "==", userID),
      where("productId", "==", productId)
    );

    // Execute the query
    const querySnapshot = await getDocs(q);

    // Check if any matching document was found
    if (querySnapshot.empty) {
      console.log(
        "No matching document found for the specified user and product."
      );
      return;
    }

    // Assuming productId is unique for each user and matches only one document
    const docRef = querySnapshot.docs[0].ref;

    // Delete the document
    await deleteDoc(docRef);
    dispatch(setSnackBar(true));
    dispatch(setSnackBarMessage("Removed from cart"));

    // Update the cart products in the state
    const updatedCart = await getCart(userID);
    dispatch(getCartProducts(updatedCart));

    // Show success message
    return {
      success: true,
      message: `Product with productId ${productId} has been removed from your cart.`,
    };
  } catch (error) {
    console.error("Error removing product:", error);
    return {
      success: false,
      message: "Could not remove the product from the cart.",
    };
  } finally {
    dispatch(setGlobalLoader(false));
  }
};
// CART FUNCTIONALITY...

// -----[[[[]]]]

//  ADD ADDRESS FUNCTIONALITY...
export const getAddress = async (userId) => {
  try {
    // Create a query to get addresses for the specific user
    const q = query(addressCollectionRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    // Map through the documents and return the data
    const addresses = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return addresses;
  } catch (error) {
    console.error("Error fetching delivery addresses: ", error);
    throw new Error("Could not fetch delivery addresses");
  }
};

export const addDeliveryAddress = async (userId, address) => {
  try {
    // Check if the phone number already exists in the collection
    const q = query(
      addressCollectionRef,
      where("phoneNumber", "==", address.phoneNumber)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Phone number already exists
      return {
        exists: true,
        message: "Phone number is already exist.",
      };
    } else {
      // Add the address document to the collection
      const docRef = await addDoc(addressCollectionRef, {
        userId: userId, // Store the user ID with the address
        ...address, // Spread the address object to include all its properties
        createdAt: new Date().toISOString(),
      });
      return docRef.id; // Return the ID of the newly created document
    }
  } catch (error) {
    console.error("Error adding delivery address: ", error);
    throw new Error("Could not add delivery address");
  }
};

export const removeDeliveryAddress = async (userId, addressId, dispatch) => {
  try {
    dispatch(setGlobalLoader(true));
    const docRef = doc(addressCollectionRef, addressId);
    // Delete the document
    await deleteDoc(docRef);
    console.log("Address removed successfully");
    const upDateAddress = await getAddress(userId);
    dispatch(getDeliveryAdrress(upDateAddress));
  } catch (error) {
    console.error("Error removing delivery address: ", error);
    throw new Error("Could not remove delivery address");
  } finally {
    // Hide loading
    dispatch(setGlobalLoader(false));
  }
};

// EXTRACT USERNAME FIRS LETTER FOR PROFILE..
export const extractUsernameFirstLetter = (username) => {
  return username.charAt(0).toUpperCase();
};

// -----[[[[]]]]
// REMOVE ORDERS FUNCTIONALITY
// eslint-disable-next-line no-unused-vars

export const deleteOrderFromFirestore = async (orderId, dispatch) => {
  dispatch(setGlobalLoader(true));
  try {
    const orderDocRef = doc(db, "orderRecords", orderId);
    await deleteDoc(orderDocRef);
  } catch (error) {
    dispatch(setGlobalLoader(false));
    console.error("Error deleting order: ", error);
    throw error; // Throw error for handling in the calling function
  } finally {
    dispatch(setGlobalLoader(false));
  }
};

// Function to add order details to Firestore
export const addOrderToFirestore = async (orderDetails, dispatch) => {
  try {
    const orderRef = collection(db, "orderRecords");
    const docRef = await addDoc(orderRef, orderDetails);
    dispatch(setOrderDetailsId(docRef?.id));
    return docRef.id; // Return the order ID if needed
  } catch (error) {
    console.error("Error adding order: ", error);
    throw error; // Throw the error for handling in the calling function
  }
};

// function to get order form firBase collection
export const getOrderRecords = async (userId) => {
  try {
    const orderRef = collection(db, "orderRecords");
    const q = query(orderRef, where("userId", "==", userId));

    const querySnapshot = await getDocs(q);
    const userOrders = [];
    querySnapshot.forEach((doc) => {
      userOrders.push({
        orderId: doc.id,
        products: doc.data().products,
      });
    });
    return userOrders;
  } catch (error) {
    console.error("Error fetching orders: ", error);
    throw error;
  }
};

// CONST NOTIFICATION ADDING FUNCTIONS
export const addNotification = async (userId, userName, productName) => {
  const notificationData = {
    message: "Order Confirmed",
    description: `Hello ${userName},your order for ${productName} is confirmed! We'll notify you when its ready to ship.`,
    timestamp: new Date(),
    userId: userId,
  };
  await addDoc(notificationRef, notificationData);
};

export const getUserNotifications = async (userId) => {
  if (!userId) {
    return [];
  }
  try {
    const q = query(notificationRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error("Error fetching cart:", error);
    return [];
  }
};
