import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://fakestoreapi.com/", // Replace with your API's base URL

  headers: {
    "Content-Type": "application/json", // Optional: Default headers
  },
});

export default axiosInstance;
