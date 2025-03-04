// import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUser } from "react-icons/fa";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Utils/Firbase/firebaseConfig";
import {
  setSnackBar,
  setSnackBarMessage,
  selectShowLogin,
  setShowLogin,
} from "../../Utils/Redux/productSlice";
import Modal from "react-bootstrap/Modal";
import NotificationToast from "../ToastNotification/NotificationToast";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginDropdown = () => {
  const [error, setError] = useState("");
  const [isLoginloading, setIsLoginloading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const show = useSelector(selectShowLogin);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoginloading(true);

    const { password, username } = data;

    try {
      await signInWithEmailAndPassword(auth, username, password);
      setIsLoginloading(false);
      dispatch(setSnackBar(true));
      dispatch(setSnackBarMessage("Login successful!"));
      console.log("Login successful!");
    } catch (err) {
      console.log(err.message);

      let errorMessage = "Login failed";
      if (err.code === "auth/invalid-credential") {
        errorMessage = "Invalid email or password";
      } else if (err.code === "auth/user-not-found") {
        errorMessage = "User not found. Please sign up first";
      } else if (err.code === "auth/wrong-password") {
        errorMessage = "Incorrect password";
      }

      setError(errorMessage);
    } finally {
      setIsLoginloading(false);
    }
  };

  const handleSignup = () => {
    navigate("/signUp");
    dispatch(setShowLogin(false));
  };

  const handleClose = () => dispatch(setShowLogin(false));
  const handleShow = () => dispatch(setShowLogin(true));

  return (
    <>
      <div style={{ cursor: "pointer" }}>
        <FaRegUser fontSize="large" onClick={handleShow} />
      </div>

      <Modal show={show} onHide={handleClose} animation={true} centered>
        <NotificationToast />
        <Modal.Header closeButton>
          <Modal.Title className="ms-auto ">
            {/* <h5 className="text-black">Sign in to your account</h5> */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center"
        
        >
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-container mb-2">
              <label className="form-label mb-0">User Name</label>
              <input
                type="email"
                placeholder="eg : jhone@gmail.com"
                {...register("username", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.username && (
                <span className="text-danger">{errors.username.message}</span>
              )}
            </div>
            <div className="input-container">
              <label className="form-label mb-0">Password</label>
              <input
                type="password"
                placeholder="*********"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <span className="text-danger">{errors.password.message}</span>
              )}
              <label className="form-label mb-0 text-end w-100 my-2">
                Forgett password
              </label>
            </div>
            {isLoginloading ? (
              <LoginLoading />
            ) : (
              <button type="submit" className="submit mt-3">
                Login
              </button>
            )}

            <p className="signup-link">
              No account?
              <span onClick={handleSignup}>Sign up</span>
            </p>
            {error && (
              <p
                className="text-danger text-center"
                style={{ marginTop: "10px" }}
              >
                {error}
              </p>
            )}
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginDropdown;

export const LoginLoading = () => {
  return (
    <div className="loadingtext submit my-3 d-flex justify-content-center align-items-center">
      <p className="mb-0">Authenticating</p>
    </div>
  );
};
