import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
// import { store } from "./store";
import store from "./Utils/Redux/store.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// bootstrp cdn link
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </StrictMode>
);
