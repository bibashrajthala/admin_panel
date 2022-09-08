import { ORDER_ACTION_TYPES } from "./orders.types";

const ORDERS_INITIAL_STATE = {
  loading: false,
  error: null,
  orders: null,
  order: null,
  updateStatus: null,
  invoices: null,
};

export const ordersReducer = (state = ORDERS_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case ORDER_ACTION_TYPES.GET_ORDERS_LIST_START:
      return { ...state, loading: true, error: null };
    case ORDER_ACTION_TYPES.GET_ORDERS_LIST_SUCCESS:
      return { ...state, loading: false, error: null, orders: payload };
    case ORDER_ACTION_TYPES.GET_ORDERS_LIST_FAILED:
      return { ...state, loading: false, error: payload, orders: null };

    case ORDER_ACTION_TYPES.GET_ORDER_BY_ID_START:
      return { ...state, loading: true, error: null };
    case ORDER_ACTION_TYPES.GET_ORDER_BY_ID_SUCCESS:
      return { ...state, loading: false, error: null, order: payload };
    case ORDER_ACTION_TYPES.GET_ORDER_BY_ID_FAILED:
      return { ...state, loading: false, error: payload, order: null };

    case ORDER_ACTION_TYPES.UPDATE_ORDER_STATUS_START:
      return { ...state, loading: true, error: null };
    case ORDER_ACTION_TYPES.UPDATE_ORDER_STATUS_SUCCESS:
      return { ...state, loading: false, error: null, updateStatus: payload };
    case ORDER_ACTION_TYPES.UPDATE_ORDER_STATUS_FAILED:
      return { ...state, loading: false, error: payload, updateStatus: null };

    case ORDER_ACTION_TYPES.GET_INVOICES_LIST_START:
      return { ...state, loading: true, error: null };
    case ORDER_ACTION_TYPES.GET_INVOICES_LIST_SUCCESS:
      return { ...state, loading: false, error: null, invoices: payload };
    case ORDER_ACTION_TYPES.GET_INVOICES_LIST_FAILED:
      return { ...state, loading: false, error: payload, invoices: null };

    default:
      return state;
  }
};
