import { createAction } from "../../utils/createAction";
import { ORDER_ACTION_TYPES } from "./orders.types";
import {
  getOrdersList,
  getOrderById,
  updateOrderStatus,
  getInvoicesList,
} from "./orders.api.requests";

// action creaters
// get orders list
const getOrdersListStart = () =>
  createAction(ORDER_ACTION_TYPES.GET_ORDERS_LIST_START);
const getOrdersListSuccess = (data) =>
  createAction(ORDER_ACTION_TYPES.GET_ORDERS_LIST_SUCCESS, data);
const getOrdersListFailed = (error) =>
  createAction(ORDER_ACTION_TYPES.GET_ORDERS_LIST_FAILED, error);

// get a order by id
const getOrderByIdStart = () =>
  createAction(ORDER_ACTION_TYPES.GET_ORDER_BY_ID_START);
const getOrderByIdSuccess = (order) =>
  createAction(ORDER_ACTION_TYPES.GET_ORDER_BY_ID_SUCCESS, order);
const getOrderByIdFailed = (error) =>
  createAction(ORDER_ACTION_TYPES.GET_ORDER_BY_ID_FAILED, error);

// update order status
const updateOrderStatusStart = () =>
  createAction(ORDER_ACTION_TYPES.UPDATE_ORDER_STATUS_START);
const updateOrderStatusSuccess = (updateStatus) =>
  createAction(ORDER_ACTION_TYPES.UPDATE_ORDER_STATUS_SUCCESS, updateStatus);
const updateOrderStatusFailed = (error) =>
  createAction(ORDER_ACTION_TYPES.UPDATE_ORDER_STATUS_FAILED, error);

// get invoices list
const getInvoicesListStart = () =>
  createAction(ORDER_ACTION_TYPES.GET_INVOICES_LIST_START);
const getInvoicesListSuccess = (data) =>
  createAction(ORDER_ACTION_TYPES.GET_INVOICES_LIST_SUCCESS, data);
const getInvoicesListFailed = (error) =>
  createAction(ORDER_ACTION_TYPES.GET_INVOICES_LIST_FAILED, error);

// thunks
// get orders list
export const getOrdersListAsync =
  (itemsPerPage, currentPage) => async (dispatch) => {
    dispatch(getOrdersListStart());
    try {
      const { data } = await getOrdersList(itemsPerPage, currentPage);
      // console.log(data);
      // console.log(data.data);
      dispatch(getOrdersListSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getOrdersListFailed(error));
    }
  };

// get  a order by id
export const getOrderByIdAsync = (orderId) => async (dispatch) => {
  dispatch(getOrderByIdStart());
  try {
    const { data } = await getOrderById(orderId);
    // console.log(data);
    // console.log(data.data[0]);
    dispatch(getOrderByIdSuccess(data.data[0]));
  } catch (error) {
    console.log(error);
    dispatch(getOrderByIdFailed(error));
  }
};

// update order status
export const updateOrderStatusAsync = (newOrderStatus) => async (dispatch) => {
  dispatch(updateOrderStatusStart());
  try {
    const { data } = await updateOrderStatus(newOrderStatus);
    console.log(data);
    dispatch(updateOrderStatusSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(updateOrderStatusFailed(error));
  }
};

// get invoices list
export const getInvoicesListAsync =
  (itemsPerPage, currentPage) => async (dispatch) => {
    dispatch(getInvoicesListStart());
    try {
      const { data } = await getInvoicesList(itemsPerPage, currentPage);
      console.log(data);
      console.log(data.data);
      dispatch(getInvoicesListSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getInvoicesListFailed(error));
    }
  };
