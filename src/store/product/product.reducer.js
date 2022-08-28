import { PRODUCT_ACTION_TYPES } from "./product.types";

const PRODUCT_INITIAL_STATE = {
  products: null,
  loading: false,
  error: null,
};

export const productReducer = (state = PRODUCT_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_ACTION_TYPES.GET_PRODUCTS_START:
      return { ...state, loading: true, error: null };
    case PRODUCT_ACTION_TYPES.GET_PRODUCTS_SUCCESS:
      return { ...state, products: payload, loading: false, error: null };
    case PRODUCT_ACTION_TYPES.GET_PRODUCTS_FAILED:
      return { ...state, products: null, loading: false, error: payload };
    default:
      return state;
  }
};
