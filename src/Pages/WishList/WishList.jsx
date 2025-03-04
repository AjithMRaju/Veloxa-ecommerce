import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWishlistProducts,
  selectUserAuth,
  selectWishlistProducts,
  setGlobalLoader,
  setSnackBar,
  setSnackBarMessage,
} from "../../Utils/Redux/productSlice";

import CheckboxCard from "../../Components/Cards/CheckboxCard/CheckboxCard";
import empty from "../../assets/Images/pngwing.com.png";
import {
  getWishlist,
  addToCart,
  getCart,
} from "../../Functions/wishlistService";

const WishList = () => {  
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]); // State to store cart products
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const products = useSelector(selectWishlistProducts);
  const currentUser = useSelector(selectUserAuth);

  useEffect(() => {
    const checkWishlist = async () => {
      if (currentUser) {
        const wishlist = await getWishlist(currentUser?.uid);
        dispatch(getWishlistProducts(wishlist));
      }
    };

    checkWishlist();
  }, [currentUser]);

  // Fetch cart products on component mount
  useEffect(() => {
    const fetchCartProducts = async () => {
      if (currentUser) {
        const cart = await getCart(currentUser?.uid);
        setCartProducts(cart);
      }
    };
    fetchCartProducts();
  }, [currentUser]);

  const handleCheckboxChange = (productId, title, isChecked) => {
    setSelectedProducts((prevProducts) => {
      if (isChecked) {
        return [...prevProducts, { id: productId, title }];
      } else {
        return prevProducts.filter((product) => product.id !== productId);
      }
    });
  };

  // Handle moving selected products to cart
  const handleMoveToCart = async () => {
    setIsLoading(true); // Start loading
    dispatch(setGlobalLoader(true)); // Show global loader

    let productExists = false;
    let addedSuccessfully = false;

    try {
      for (const product of selectedProducts) {
        const productData = products.find((p) => p.productId === product.id);
        if (productData) {
          // Add quantity field to productData
          const productDataWithQuantity = {
            ...productData,
            quantity: 1, // Set initial quantity to 1
          };
          const result = await addToCart(
            currentUser?.uid,
            product.id,
            productDataWithQuantity
          );
          if (result.exists) {
            productExists = true;
          } else {
            addedSuccessfully = true;
          }
        }
      }

      // Show appropriate messages
      if (productExists && addedSuccessfully) {
        dispatch(
          setSnackBarMessage(
            "Some products already exist in the cart, others added successfully!"
          )
        );
      } else if (productExists) {
        dispatch(
          setSnackBarMessage("Some products already exist in the cart.")
        );
      } else if (addedSuccessfully) {
        dispatch(setSnackBarMessage("Products moved to cart successfully!"));
      }

      dispatch(setSnackBar(true)); // Show snackbar
    } catch (error) {
      console.log(error.message);
      
      dispatch(
        setSnackBarMessage("Failed to move products to cart. Please try again.")
      );
      dispatch(setSnackBar(true)); // Show error message
    } finally {
      setIsLoading(false); // Stop loading
      dispatch(setGlobalLoader(false)); // Hide global loader
      setSelectedProducts([]); // Clear selected products
      const updatedCart = await getCart(currentUser?.uid); // Refresh cart data
      setCartProducts(updatedCart);
    }
  };

  return (
    <main style={{ background: "#fff" }}>
      <div className="container py-5">
        <h1 className="mb-4">{`My Wishlist (${products?.length})`}</h1>
        {!currentUser || products.length === 0 ? (
          <div className="h-100 d-flex justify-content-center align-items-center">
            <div>
              <img src={empty} alt="" width={400} />
              <p className="text-center">Oops, your wishlist is empty</p>
            </div>
          </div>
        ) : (
          <div className="row justify-content-center px-1">
            {products?.map((items) => (
              <CheckboxCard
                {...items}
                key={items?.productId}
                removeBtn={true}
                userID={currentUser?.uid}
                isChecked={selectedProducts.some(
                  (p) => p.id === items?.productId
                )}
                onCheckboxChange={handleCheckboxChange}
                existsInCart={cartProducts.some(
                  (p) => p.productId === items?.productId
                )}
              />
            ))}
          </div>
        )}
      </div>
      <div
        className="w-100 bg-secondary p-4 d-flex justify-content-between align-items-center"
        style={{
          background:
            "linear-gradient(61deg,rgb(17, 17, 17) 39%,rgb(100, 65, 199) 90%)",
        }}
      >
        <h6 className="text-white mb-0">{`Selected Items: ${selectedProducts.length}`}</h6>
        <button
          style={{
            border: "none",
            borderRadius: "50px",
            fontSize: "small",
            cursor: "pointer",
          }}
          onClick={handleMoveToCart}
          className="spc-btn text-white py-2"
          disabled={isLoading || selectedProducts.length === 0}
        >
          {isLoading ? "Moving..." : "Move to cart"}
        </button>
      </div>
    </main>
  );
};

export default WishList;
