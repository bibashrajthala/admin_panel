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

export const getAllProducts = (itemsPerPage, currentPage) =>
  API.get(
    `/api/v1/inventory/products?pagination_limit=${itemsPerPage}&pagination_page=${currentPage}`
  );

export const getProductsBrandList = () =>
  API.get(`/api/v1/frontend_renderers/list/product-brand-names`);

export const getProductsUnits = () =>
  API.get(`/api/v1/frontend_renderers/list/product-units`);

export const getProductsCategories = () =>
  API.get(`/api/v1/inventory/products/group`);

export const getProductsWarehouses = () =>
  API.get("/api/v1/inventory/warehouse");

export const getProductById = (id) =>
  API.get(`/api/v1/inventory/products?_id=${id}`);

export const getProductsWarehousesAndStocks = (id) =>
  API.get(`/api/v1/inventory/warehouseItems?product_id=${id}`);

export const getProductsWarehouseInfo = (product_id, warehouse_id) =>
  API.get(
    `/api/v1/inventory/warehouseItems?warehouse_id=${warehouse_id}&product_id=${product_id}`
  );

export const getProductEditHistory = (id) =>
  API.get(`/api/v1/inventory/products/history/${id}`);

export const addNewProduct = (newProduct) =>
  API.post("/api/v1/inventory/products", { products: [newProduct] });

export const editProductFeatureById = (featureToEditObject) =>
  API.patch(`/api/v1/inventory/products`, featureToEditObject);

export const editProductTrackInventory = (featureToEditObject) =>
  API.post(
    `/api/v1/inventory/products/startTrackingInventory`,
    featureToEditObject
  );

export const deleteProduct = (id) =>
  API.delete(`/api/v1/inventory/products/${id}`);
