import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:5000" });
const API = axios.create({
  baseURL: "https://api.dynocrm.com",
});

// for providing token to server's  middleware for verification from the localStorage as the header's authorization
API.interceptors.request.use((req) => {
  if (localStorage.getItem("accessToken")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
  }

  return req;
});

export const getAllProducts = () => API.get("/api/v1/inventory/products");
