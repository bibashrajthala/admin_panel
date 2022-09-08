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

export const getOrdersList = (itemsPerPage, currentPage) =>
  API.get(
    `/api/v1/inventory/orders?order_type=order&pagination_limit=${itemsPerPage}&pagination_page=${currentPage}`
  );

export const getOrderById = (orderId) =>
  API.get(`/api/v1/inventory/orders?_id=${orderId}`);

export const updateOrderStatus = (newOrderStatus) =>
  API.patch(`/api/v1/inventory/orders/statusChange`, newOrderStatus);

export const getInvoicesList = (itemsPerPage, currentPage) =>
  API.get(
    `/api/v1/inventory/orders?order_type=invoice&pagination_limit=${itemsPerPage}&pagination_page=${currentPage}`
  );
