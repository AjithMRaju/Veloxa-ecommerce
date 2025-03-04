import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  // setShowLogin,
  setSnackBar,
  setSnackBarMessage,
} from "../../Utils/Redux/productSlice";
import { auth } from "../../Utils/Firbase/firebaseConfig";
import SignupCover from "../../assets/Images/SignupCover.jpg";
const SuignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // ---
  // Handle email/password sign-up
  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // dispatch(setShowLogin(true));
      navigate("/");
      dispatch(setSnackBar(true));
      dispatch(setSnackBarMessage("Account created successfully!"));
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle Google sign-up
  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
      dispatch(setSnackBar(true));
      dispatch(setSnackBarMessage("Signed in with Google successfully!"));
    } catch (err) {
      setError(err.message);
    }
  };
  // ----
  return (
    <section style={{ width: "100vw", height: "100vh" }} className="flex row">
      <div className="forms-signup col-lg-5">
        <div className="container h-100 d-flex flex-column justify-content-center align-items-center">
          <div className="text-center signup-form-wraper">
            <h3>
              Create Your Account - Your <br /> Shopping Adventure Awaits!
            </h3>
            <p className="px-lg-3 mb-0">
              Discover a world of endless possibilities, <br />
              exclusive deals and by signing up with us today.
            </p>
          </div>

          <div
            className="d-flex flex-column signup-form-wraper "
            style={{ padding: "16px" }}
          >
            <Button
              variant=""
              sx={{
                marginTop: 1,
                border: "1px solid #0000001c",
                borderRadius: "5px",
                fontWeight: "700",
              }}
              onClick={handleGoogleSignup}
            >
              <FcGoogle fontSize="large" className="me-3" />
              Sign Up with Google
            </Button>
            <Button
              variant=""
              sx={{
                marginTop: 1,
                border: "1px solid #0000001c",
                borderRadius: "5px",
                fontWeight: "700",
              }}
              // onClick={handleGoogleSignup}
            >
              <BsApple fontSize="large" className="me-3" />
              Sign Up with Apple ID
            </Button>
            <Button
              variant=""
              sx={{
                marginTop: 1,
                border: "1px solid #0000001c",
                borderRadius: "5px",
                fontWeight: "700",
              }}

              // onClick={handleGoogleSignup}
            >
              <FaXTwitter fontSize="large" className="me-3" />
              Sign Up with Twiter
            </Button>
          </div>

          <div className="w-100 d-flex justify-content-center align-items-center">
            <span
              className="df"
              style={{
                border: "1px solid rgba(97, 97, 97, 0.1)",
                width: "100px",
                height: "1px",
              }}
            ></span>
            <p className="mb-0 mx-3">or</p>
            <span
              className="df"
              style={{
                border: "1px solid rgba(97, 97, 97, 0.1)",
                width: "100px",
                height: "1px",
              }}
            ></span>
          </div>

          <Box
  sx={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
    // minWidth: "400px",
  }}
  className="signup-form-wraper"
>
  {error && (
    <Typography color="error" gutterBottom>
      {error}
    </Typography>
  )}

  <TextField
    label="Email"
    variant="outlined"
    fullWidth
    margin="normal"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    sx={{
      borderRadius: "30px",
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#6441c7",
        },
        "&:hover fieldset": {
          borderColor: "#6441c7",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#6441c7",
        },
      },
    }}
  />
  <TextField
    label="Create Password"
    type="password"
    variant="outlined"
    fullWidth
    margin="normal"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    sx={{
      borderRadius: "30px",
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#6441c7",
        },
        "&:hover fieldset": {
          borderColor: "#6441c7",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#6441c7",
        },
      },
    }}
  />
  <TextField
    label="Confirm Password"
    type="password"
    variant="outlined"
    fullWidth
    margin="normal"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    sx={{
      borderRadius: "30px",
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#6441c7",
        },
        "&:hover fieldset": {
          borderColor: "#6441c7",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#6441c7",
        },
      },
    }}
  />

  <Button
    variant="contained"
    fullWidth
    sx={{
      marginTop: 2,
      color: "#fff",
      background: "#6441c7",
      borderRadius: "30px",
      padding: "15px",
      "&:hover": {
        backgroundColor: "#6441c7",
        opacity: 0.9,
      },
      "&:focus": {
        backgroundColor: "#6441c7",
      },
    }}
    onClick={handleSignup}
  >
    Sign Up
  </Button>
</Box>

          {/* <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 2,
              // minWidth: "400px",
            }}
            className="signup-form-wraper"
          >
            {error && (
              <Typography color="error" gutterBottom>
                {error}
              </Typography>
            )}

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                borderRadius: "30px",
              }}
            />
            <TextField
              label="Create Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button
              variant="contained"
              fullWidth
              sx={{
                marginTop: 2,
                color: "#fff",
                background: "black",
                borderRadius: "30px",
                padding: "15px",
              }}
              onClick={handleSignup}
            >
              Sign Up
            </Button>
          </Box> */}
        </div>
      </div>

      <div className="signup-img col-lg-7 d-none d-lg-block position-relative">
        <img
          src={SignupCover}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          className="position-absolute w-100 h-100 top-0 right-0 left-0 bottom-0 d-flex flex-column align-items-center justify-content-end"
          style={{ background: "rgb(0 0 0 / 32%);" }}
        ></div>
      </div>
    </section>
  );
};

export default SuignUp;
