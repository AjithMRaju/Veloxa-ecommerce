import { db } from "../Utils/Firbase/firebaseConfig";
import {
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  // doc,
} from "firebase/firestore";
import {
  setGlobalLoader,
  getWishlistProducts,
  setSnackBar,
  setSnackBarMessage,
} from "../Utils/Redux/productSlice";
import { getWishlist } from "./wishlistService";

export const removeWishListItem = async (userID, productId, dispatch) => {
  try {
    dispatch(setGlobalLoader(true));
    // Create a query to find the wishlist item for the specific user
    const q = query(
      collection(db, "wishlists"),
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
    dispatch(setSnackBarMessage("Remove from Wishlist"));
    const updateWishList = await getWishlist(userID);
    dispatch(getWishlistProducts(updateWishList));
  } catch (error) {
    dispatch(setGlobalLoader(false));
    console.error("Error removing product:", error);
  } finally {
    dispatch(setGlobalLoader(false));
  }
};
