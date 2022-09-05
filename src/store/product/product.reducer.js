import { PRODUCT_ACTION_TYPES } from "./product.types";

const PRODUCT_INITIAL_STATE = {
  products: null,
  loading: false,
  error: null,
  brandList: [],
  units: [],
  categories: [],
  product: null,
  editedStatus: null,
  warehouses: [],
  warehousesAndStocks: [],
  warehouseInfo: [],
  history: [],
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

    case PRODUCT_ACTION_TYPES.GET_PRODUCTS_BRANDLIST_SUCCESS:
      return { ...state, brandList: payload, error: null };
    case PRODUCT_ACTION_TYPES.GET_PRODUCTS_BRANDLIST_FAILED:
      return { ...state, error: payload };

    case PRODUCT_ACTION_TYPES.GET_PRODUCTS_UNIT_SUCCESS:
      return { ...state, units: payload, error: null };
    case PRODUCT_ACTION_TYPES.GET_PRODUCTS_UNIT_FAILED:
      return { ...state, error: payload };

    case PRODUCT_ACTION_TYPES.GET_PRODUCTS_CATEGORIES_SUCCESS:
      return { ...state, categories: payload, error: null };
    case PRODUCT_ACTION_TYPES.GET_PRODUCTS_CATEGORIES_FAILED:
      return { ...state, error: payload };

    case PRODUCT_ACTION_TYPES.GET_PRODUCTS_WAREHOUSES_SUCCESS:
      return { ...state, loading: false, error: null, warehouses: payload };
    case PRODUCT_ACTION_TYPES.GET_PRODUCTS_WAREHOUSES_FAILED:
      return { ...state, loading: false, error: payload };

    case PRODUCT_ACTION_TYPES.GET_PRODUCTS_WAREHOUSES_AND_STOCKS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        warehousesAndStocks: payload,
      };
    case PRODUCT_ACTION_TYPES.GET_PRODUCTS_WAREHOUSES_AND_STOCKS_FAILED:
      return { ...state, loading: false, error: payload };

    case PRODUCT_ACTION_TYPES.GET_PRODUCTS_WAREHOUSE_INFO_SUCCESS:
      return { ...state, loading: false, error: null, warehouseInfo: payload };
    case PRODUCT_ACTION_TYPES.GET_PRODUCTS_WAREHOUSE_INFO_FAILED:
      return { ...state, loading: false, error: payload };

    case PRODUCT_ACTION_TYPES.GET_PRODUCT_BY_ID_START:
      return { ...state, loading: true, error: null };
    case PRODUCT_ACTION_TYPES.GET_PRODUCT_BY_ID_SUCCESS:
      return { ...state, product: payload, loading: false, error: null };
    case PRODUCT_ACTION_TYPES.GET_PRODUCT_BY_ID_FAILED:
      return { ...state, product: null, loading: false, error: payload };

    case PRODUCT_ACTION_TYPES.GET_PRODUCT_EDIT_HISTORY_SUCCESS:
      return { ...state, error: null, history: payload };
    case PRODUCT_ACTION_TYPES.GET_PRODUCT_EDIT_HISTORY_FAILED:
      return { ...state, error: payload };

    case PRODUCT_ACTION_TYPES.ADD_NEW_PRODUCT_START:
      return { ...state, loading: true, error: null };
    case PRODUCT_ACTION_TYPES.ADD_NEW_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: true,
        error: null,
        products: { ...state.products }, // need to updata products data array inside of products=> will do later
      };
    case PRODUCT_ACTION_TYPES.ADD_NEW_PRODUCT_FAILED:
      return { ...state, loading: false, error: payload };

    case PRODUCT_ACTION_TYPES.EDIT_PRODUCT_FEATURE_BY_ID_START:
      return { ...state, loading: true, error: null };
    case PRODUCT_ACTION_TYPES.EDIT_PRODUCT_FEATURE_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        editedStatus: payload,
      };
    case PRODUCT_ACTION_TYPES.EDIT_PRODUCT_FEATURE_BY_ID_FAILED:
      return { ...state, loading: false, error: payload, editedStatus: null };

    case PRODUCT_ACTION_TYPES.EDIT_PRODUCT_TRACK_INVENTORY_START:
      return { ...state, loading: true, error: null };
    case PRODUCT_ACTION_TYPES.EDIT_PRODUCT_TRACK_INVENTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        editedStatus: payload,
      };
    case PRODUCT_ACTION_TYPES.EDIT_PRODUCT_TRACK_INVENTORY_FAILED:
      return { ...state, loading: false, error: payload, editedStatus: null };

    case PRODUCT_ACTION_TYPES.DELETE_PRODUCT_START:
      return { ...state, loading: true, error: null };
    case PRODUCT_ACTION_TYPES.DELETE_PRODUCT_SUCCESS:
      return { ...state, loading: false, error: null, editedStatus: payload };
    case PRODUCT_ACTION_TYPES.DELETE_PRODUCT_FAILED:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};
