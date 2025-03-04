

import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../../Utils/Firbase/firebaseConfig";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Handle email/password sign-up
  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle Google sign-up
  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("Signed in with Google successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Register your account!
      </Typography>

      <Typography variant="p" gutterBottom>
        Hello,you must login first to be able to use the application and enjoy
        all the features in
      </Typography>

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
        label="Password"
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

      <div className="d-flex justify-content-center flex-column align-items-center w-100">
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          Or
        </Typography>

        <Button
          variant=""
          sx={{
            marginTop: 1,
            border: "1px solid #0000001c",
            borderRadius: "30px",
          }}
          onClick={handleGoogleSignup}
        >
          <FcGoogle fontSize="large" className="me-3" />
          Sign Up with Google
        </Button>
      </div>
    </Box>
  );
};

export default Signup;
