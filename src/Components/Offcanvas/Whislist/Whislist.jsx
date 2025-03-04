/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserAuth,
  selectWishlistProducts,
  getWishlistProducts,
  setSnackBar,
  setSnackBarMessage,
  setGlobalLoader,
} from "../../../Utils/Redux/productSlice";
import {
  getWishlist,
  addToCart,
  getCart,
} from "../../../Functions/wishlistService";
import { FaHeart } from "react-icons/fa";
import Offcanvas from "react-bootstrap/Offcanvas";
import empty from "../../../assets/Images/pngwing.com.png";
import CheckboxCard from "../../Cards/CheckboxCard/CheckboxCard";

// ---
const Whislist = ({ iconsText, isScrolled }) => {
  const [show, setShow] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]); // State to store cart products
  const [isLoading, setIsLoading] = useState(false);
  // ---
  const dispatch = useDispatch();
  const products = useSelector(selectWishlistProducts);
  const currentUser = useSelector(selectUserAuth);
 
  // ---

  useEffect(() => {
    const checkWishlist = async () => {
      if (currentUser) {
        const wishlist = await getWishlist(currentUser?.uid);
        dispatch(getWishlistProducts(wishlist));
      }
    };

    checkWishlist();
  }, [currentUser]);
  // ---

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
      console.log("error :",error);
      
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <main className="wishList">
      <div onClick={handleShow} style={{ cursor: "pointer" }}>
        <FaHeart color={isScrolled ? "white" : "#6441c7"} size={23} />
        <span className="icon-span"> {iconsText}</span>
      </div>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        enforceFocus={false}
        restoreFocus={false}
        scroll
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{`My Wishlist (${products?.length})`}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {!currentUser || products.length === 0 ? (
            <div className="h-100 d-flex justify-content-center align-items-center">
              <div>
                <img src={empty} alt="" width={400} />
                <p className="text-center">Oops, your wishlist is empty</p>
              </div>
            </div>
          ) : (
            products?.map((items) => (
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
            ))
          )}
        </Offcanvas.Body>
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
      </Offcanvas>
    </main>
  );
};

export default Whislist;

// const Whislist = ({ iconsText, isScrolled }) => {
//   const [show, setShow] = useState(false);
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const dispatch = useDispatch();
//   const products = useSelector(selectWishlistProducts);
//   const currentUser = useSelector(selectUserAuth);
//   console.log("selectedProducts :", selectedProducts);
//   // ---

//   useEffect(() => {
//     const checkWishlist = async () => {
//       if (currentUser) {
//         const wishlist = await getWishlist(currentUser?.uid);
//         dispatch(getWishlistProducts(wishlist));
//       }
//     };

//     checkWishlist();
//   }, [currentUser]);

//   const handleCheckboxChange = (productId, title, isChecked) => {
//     setSelectedProducts((prevProducts) => {
//       if (isChecked) {
//         return [...prevProducts, { id: productId, title }];
//       } else {
//         return prevProducts.filter((product) => product.id !== productId);
//       }
//     });
//   };

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   return (
//     <main className="wishList">
//       <div onClick={handleShow} style={{ cursor: "pointer" }}>
//         <FaHeart color={isScrolled ? "white" : "#6441c7"} size={23} />
//         <span className="icon-span"> {iconsText}</span>
//       </div>
//       <Offcanvas
//         show={show}
//         onHide={handleClose}
//         placement="end"
//         enforceFocus={false}
//         restoreFocus={false}
//         // scroll
//       >
//         <Offcanvas.Header closeButton>
//           <Offcanvas.Title>{`My WhisList (${products?.length})`}</Offcanvas.Title>
//         </Offcanvas.Header>
//         <Offcanvas.Body>
//           {!currentUser || products.length === 0 ? (
//             <div className="h-100 d-flex justify-content-center align-items-center">
//               <div>
//                 <img src={empty} alt="" width={400} />
//                 <p className="text-center">Oops your whislist is empty</p>
//               </div>
//             </div>
//           ) : (
//             products?.map((items) => (
//               <CheckboxCard
//                 {...items}
//                 key={items?.productId}
//                 removeBtn={true}
//                 userID={currentUser?.uid}
//                 isChecked={selectedProducts.some(
//                   (p) => p.id === items?.productId
//                 )}
//                 onCheckboxChange={handleCheckboxChange}
//               />
//             ))
//           )}
//         </Offcanvas.Body>
//         <div
//           className=" w-100 bg-secondary p-4 d-flex justify-content-between align-items-center"
//           style={{
//             background:
//               "linear-gradient(61deg,rgb(17, 17, 17) 39%,rgb(100, 65, 199) 90%)",
//           }}
//         >
//           <h6 className="text-white mb-0">{`selected Items ${selectedProducts.length}`}</h6>
//           <button
//             style={{
//               border: "none",
//               borderRadius: "50px",
//               fontSize: "small",
//             }}
//             className="spc-btn text-white py-2"
//           >
//             Move to cart
//           </button>
//         </div>
//       </Offcanvas>
//     </main>
//   );
// };
