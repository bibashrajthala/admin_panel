import { PRODUCT_ACTION_TYPES } from "./product.types";
import { createAction } from "../../utils/createAction";
import {
  getAllProducts,
  getAllProductsList,
  getProductsBrandList,
  getProductsCategories,
  getProductsUnits,
  getProductById,
  getProductsWarehouses,
  getProductsWarehousesAndStocks,
  getProductsWarehouseInfo,
  getProductEditHistory,
  addNewProduct,
  editProductFeatureById,
  editProductTrackInventory,
  deleteProduct,
} from "./product.api.requests";

//action creaters
// get products list  (object inside which is products array)
const getProductsStart = () =>
  createAction(PRODUCT_ACTION_TYPES.GET_PRODUCTS_START);
const getProductsSuccess = (productsData) =>
  createAction(PRODUCT_ACTION_TYPES.GET_PRODUCTS_SUCCESS, productsData);
const getProductsFailed = (error) =>
  createAction(PRODUCT_ACTION_TYPES.GET_PRODUCTS_FAILED, error);

// get all products list  (object inside which is products array)
const getAllProductsListStart = () =>
  createAction(PRODUCT_ACTION_TYPES.GET_ALL_PRODUCTS_LIST_START);
const getAllProductsListSuccess = (productsList) =>
  createAction(
    PRODUCT_ACTION_TYPES.GET_ALL_PRODUCTS_LIST_SUCCESS,
    productsList
  );
const getAllProductsListFailed = (error) =>
  createAction(PRODUCT_ACTION_TYPES.GET_ALL_PRODUCTS_LIST_FAILED, error);

// brand list (array)
const getProductsBrandListSuccess = (brandList) =>
  createAction(PRODUCT_ACTION_TYPES.GET_PRODUCTS_BRANDLIST_SUCCESS, brandList);
const getProductsBrandListFailed = (error) =>
  createAction(PRODUCT_ACTION_TYPES.GET_PRODUCTS_BRANDLIST_FAILED, error);

// get unit list (array)
const getProductsUnitSuccess = (Units) =>
  createAction(PRODUCT_ACTION_TYPES.GET_PRODUCTS_UNIT_SUCCESS, Units);
const getProductsUnitFailed = (error) =>
  createAction(PRODUCT_ACTION_TYPES.GET_PRODUCTS_UNIT_FAILED, error);

// get cateogories list (nested array)
const getProductsCategoriesSuccess = (categories) =>
  createAction(
    PRODUCT_ACTION_TYPES.GET_PRODUCTS_CATEGORIES_SUCCESS,
    categories
  );
const getProductsCategoriesFailed = (error) =>
  createAction(PRODUCT_ACTION_TYPES.GET_PRODUCTS_CATEGORIES_FAILED, error);

// get warehouses
const getProductsWarehousesSuccess = (warehouses) =>
  createAction(
    PRODUCT_ACTION_TYPES.GET_PRODUCTS_WAREHOUSES_SUCCESS,
    warehouses
  );
const getProductsWarehousesFailed = () =>
  createAction(PRODUCT_ACTION_TYPES.GET_PRODUCTS_WAREHOUSES_FAILED);

// get single product by its id
const getProductByIdStart = () =>
  createAction(PRODUCT_ACTION_TYPES.GET_PRODUCT_BY_ID_START);
const getProductByIdSuccess = (product) =>
  createAction(PRODUCT_ACTION_TYPES.GET_PRODUCT_BY_ID_SUCCESS, product);
const getProductByIdFailed = (error) =>
  createAction(PRODUCT_ACTION_TYPES.GET_PRODUCT_BY_ID_FAILED, error);

// get warehouses and corresponding stocks
const getProductsWarehousesAndStocksSuccess = (warehousesAndStocks) =>
  createAction(
    PRODUCT_ACTION_TYPES.GET_PRODUCTS_WAREHOUSES_AND_STOCKS_SUCCESS,
    warehousesAndStocks
  );
const getProductsWarehousesAndStocksFailed = () =>
  createAction(PRODUCT_ACTION_TYPES.GET_PRODUCTS_WAREHOUSES_AND_STOCKS_FAILED);

// get warehouse info
const getProductsWarehouseInfoSuccess = (warehouseInfo) =>
  createAction(
    PRODUCT_ACTION_TYPES.GET_PRODUCTS_WAREHOUSE_INFO_SUCCESS,
    warehouseInfo
  );
const getProductsWarehouseInfoFailed = () =>
  createAction(PRODUCT_ACTION_TYPES.GET_PRODUCTS_WAREHOUSE_INFO_FAILED);

//get products edit history
const getProductEditHistorySuccess = (history) =>
  createAction(PRODUCT_ACTION_TYPES.GET_PRODUCT_EDIT_HISTORY_SUCCESS, history);
const getProductEditHistoryFailed = (error) =>
  createAction(PRODUCT_ACTION_TYPES.GET_PRODUCT_EDIT_HISTORY_FAILED, error);

// add a new product
const addNewProductStart = () =>
  createAction(PRODUCT_ACTION_TYPES.ADD_NEW_PRODUCT_START);
const addNewProductSuccess = (newProduct) =>
  createAction(PRODUCT_ACTION_TYPES.ADD_NEW_PRODUCT_SUCCESS, newProduct);
const addNewProductFailed = (error) =>
  createAction(PRODUCT_ACTION_TYPES.ADD_NEW_PRODUCT_FAILED, console.error);

// edit single product's feature by  id
const editProductFeatureByIdStart = () =>
  createAction(PRODUCT_ACTION_TYPES.EDIT_PRODUCT_FEATURE_BY_ID_START);
const editProductFeatureByIdSuccess = (editedStatus) =>
  createAction(
    PRODUCT_ACTION_TYPES.EDIT_PRODUCT_FEATURE_BY_ID_SUCCESS,
    editedStatus
  );
const editProductFeatureByIdFailed = (error) =>
  createAction(PRODUCT_ACTION_TYPES.EDIT_PRODUCT_FEATURE_BY_ID_FAILED, error);

// edit single product's Track inventory status by  id
const editProductTrackInventoryStart = () =>
  createAction(PRODUCT_ACTION_TYPES.EDIT_PRODUCT_TRACK_INVENTORY_START);
const editProductTrackInventorySuccess = (editedStatus) =>
  createAction(
    PRODUCT_ACTION_TYPES.EDIT_PRODUCT_TRACK_INVENTORY_SUCCESS,
    editedStatus
  );
const editProductTrackInventoryFailed = (error) =>
  createAction(PRODUCT_ACTION_TYPES.EDIT_PRODUCT_TRACK_INVENTORY_FAILED, error);

// delete a product
const deleteProductStart = () =>
  createAction(PRODUCT_ACTION_TYPES.DELETE_PRODUCT_START);
const deleteProductSuccess = (deletedStatus) =>
  createAction(PRODUCT_ACTION_TYPES.DELETE_PRODUCT_SUCCESS, deletedStatus);
const deleteProductFailed = (error) =>
  createAction(PRODUCT_ACTION_TYPES.DELETE_PRODUCT_FAILED, error);

/////////////////////////////////////////
// thunks
//get products (object inside which is products array)
export const getProductsAsync =
  (itemsPerPage, currentPage) => async (dispatch) => {
    dispatch(getProductsStart());
    try {
      const { data } = await getAllProducts(itemsPerPage, currentPage);
      // console.log(data);
      // console.log(data.data);
      dispatch(getProductsSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getProductsFailed(error));
    }
  };

export const getAllProductsListAsync = () => async (dispatch) => {
  dispatch(getAllProductsListStart());
  try {
    const { data } = await getAllProductsList();
    // console.log(data);
    // console.log(data.data);
    // const productsList = data.data[0]
    dispatch(getAllProductsListSuccess(data.data));
  } catch (error) {
    console.log(error);
    dispatch(getAllProductsListFailed(error));
  }
};

//get  brand list (array)
export const getProductsBrandListAsync = () => async (dispatch) => {
  try {
    const { data } = await getProductsBrandList();
    // console.log(data);
    // console.log(data.data.values);
    dispatch(getProductsBrandListSuccess(data.data.values));
  } catch (error) {
    console.log(error);
    dispatch(getProductsBrandListFailed(error));
  }
};

// get unit list (array)
export const getProductsUnitAsync = () => async (dispatch) => {
  try {
    const { data } = await getProductsUnits();
    // console.log(data);
    // console.log(data.data);
    // console.log(data.data.values);
    dispatch(getProductsUnitSuccess(data.data.values));
  } catch (error) {
    console.log(error);
    dispatch(getProductsUnitFailed(error));
  }
};

// get cateogories list (nested array)
export const getProductsCategoriesAsync = () => async (dispatch) => {
  try {
    const { data } = await getProductsCategories();
    // console.log(data);
    // console.log(data.data);
    dispatch(getProductsCategoriesSuccess(data.data));
  } catch (error) {
    console.log(error);
    dispatch(getProductsCategoriesFailed(error));
  }
};

// get warehouses
export const getProductsWarehousesAsync = () => async (dispatch) => {
  try {
    const { data } = await getProductsWarehouses();
    // console.log(data);
    console.log(data.data);
    dispatch(getProductsWarehousesSuccess(data.data));
  } catch (error) {
    console.log(error);
    dispatch(getProductsWarehousesFailed(error));
  }
};

// get single product by its id
export const getProductByIdAsync = (productId) => async (dispatch) => {
  dispatch(getProductByIdStart());
  try {
    const { data } = await getProductById(productId);
    // console.log(data);
    // console.log(data.data[0]);
    dispatch(getProductByIdSuccess(data.data[0]));
  } catch (error) {
    console.log(error);
    dispatch(getProductByIdFailed(error));
  }
};

// get warehouses and corresponding stocks
export const getProductsWarehousesAndStocksAsync = (id) => async (dispatch) => {
  try {
    // console.log(id);
    const { data } = await getProductsWarehousesAndStocks(id);
    // console.log(data);
    // console.log(data.data);
    dispatch(getProductsWarehousesAndStocksSuccess(data.data));
  } catch (error) {
    console.log(error);
    dispatch(getProductsWarehousesAndStocksFailed(error));
  }
};

// get warehouse info
export const getProductsWarehouseInfoAsync =
  (productId, warehouseId) => async (dispatch) => {
    try {
      // console.log(id);
      const { data } = await getProductsWarehouseInfo(productId, warehouseId);
      // console.log(data);
      // console.log(data.data);
      dispatch(getProductsWarehouseInfoSuccess(data.data));
    } catch (error) {
      console.log(error);
      dispatch(getProductsWarehouseInfoFailed(error));
    }
  };

// get product edit history
export const getProductEditHistoryAsync = (productId) => async (dispatch) => {
  try {
    const { data } = await getProductEditHistory(productId);
    // console.log(data);
    // console.log(data.data);
    dispatch(getProductEditHistorySuccess(data.data));
  } catch (error) {
    console.log(error);
    dispatch(getProductEditHistoryFailed(error));
  }
};

// add a new product
export const addNewProductAsync = (newProduct) => async (dispatch) => {
  dispatch(addNewProductStart());
  try {
    const { data } = await addNewProduct(newProduct);
    console.log(data);
    dispatch(addNewProductSuccess(data));
  } catch (error) {
    dispatch(addNewProductFailed(error));
  }
};

// edit single product's feature by id
export const editProductFeatureByIdAsync =
  (featureToEditObject) => async (dispatch) => {
    dispatch(editProductFeatureByIdStart());
    try {
      const { data } = await editProductFeatureById(featureToEditObject);
      console.log(data);
      dispatch(editProductFeatureByIdSuccess(data));
    } catch (error) {
      dispatch(editProductFeatureByIdFailed(error));
    }
  };

// edit single product's track inventory by id
export const editProductTrackInventoryAsync =
  (featureToEditObject) => async (dispatch) => {
    dispatch(editProductTrackInventoryStart());
    try {
      const { data } = await editProductTrackInventory(featureToEditObject);
      console.log(data);
      dispatch(editProductTrackInventorySuccess(data));
    } catch (error) {
      dispatch(editProductTrackInventoryFailed(error));
    }
  };

// delete a product
export const deleteProductAsync = (productId) => async (dispatch) => {
  dispatch(deleteProductStart());
  try {
    const { data } = await deleteProduct(productId);
    console.log(data);
    dispatch(deleteProductSuccess(data));
  } catch (error) {
    dispatch(deleteProductFailed(error));
  }
};
