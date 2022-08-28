import { PRODUCT_ACTION_TYPES } from "./product.types";
import { createAction } from "../../utils/createAction";
import { getAllProducts } from "./product.api.requests";

const getProductsStart = () =>
  createAction(PRODUCT_ACTION_TYPES.GET_PRODUCTS_START);

const getProductsSuccess = (productsData) =>
  createAction(PRODUCT_ACTION_TYPES.GET_PRODUCTS_SUCCESS, productsData);

const getProductsFailed = (error) =>
  createAction(PRODUCT_ACTION_TYPES.GET_PRODUCTS_FAILED, error);

export const getProductsAsync = () => async (dispatch) => {
  dispatch(getProductsStart());
  try {
    const { data } = await getAllProducts();
    console.log(data);
    console.log(data.data);

    dispatch(getProductsSuccess(data.data));
  } catch (error) {
    console.log(error);
    dispatch(getProductsFailed(error));
  }
};
