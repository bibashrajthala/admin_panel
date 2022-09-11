import { createAction } from "../../utils/createAction";
import {
  getExpenses,
  getExpenseTypes,
  getExpenseUsers,
  addNewExpense,
  viewSingleExpense,
  approveExpense,
  reimburseExpense,
  cancelExpense,
} from "./expenses.api.requests";
import { EXPENSES_ACTION_TYPES } from "./expenses.types";

//action creaters
// get expenses
const getExpensesStart = () =>
  createAction(EXPENSES_ACTION_TYPES.GET_EXPENSES_START);
const getExpensesSuccess = (expenses) =>
  createAction(EXPENSES_ACTION_TYPES.GET_EXPENSES_SUCCESS, expenses);
const getExpensesFailed = (error) =>
  createAction(EXPENSES_ACTION_TYPES.GET_EXPENSES_FAILED, error);

// get expense Users
const getExpenseUsersStart = () =>
  createAction(EXPENSES_ACTION_TYPES.GET_EXPENSE_USERS_START);
const getExpenseUsersSuccess = (users) =>
  createAction(EXPENSES_ACTION_TYPES.GET_EXPENSE_USERS_SUCCESS, users);
const getExpenseUsersFailed = (error) =>
  createAction(EXPENSES_ACTION_TYPES.GET_EXPENSE_USERS_FAILED, error);

// get expense Types
const getExpenseTypesStart = () =>
  createAction(EXPENSES_ACTION_TYPES.GET_EXPENSE_TYPES_START);
const getExpenseTypesSuccess = (types) =>
  createAction(EXPENSES_ACTION_TYPES.GET_EXPENSE_TYPES_SUCCESS, types);
const getExpenseTypesFailed = (error) =>
  createAction(EXPENSES_ACTION_TYPES.GET_EXPENSE_TYPES_FAILED, error);

// add new expense
const addNewExpenseStart = () =>
  createAction(EXPENSES_ACTION_TYPES.ADD_EXPENSE_START);
const addNewExpenseSuccess = (expense) =>
  createAction(EXPENSES_ACTION_TYPES.ADD_EXPENSE_SUCCESS, expense);
const addNewExpenseFailed = (error) =>
  createAction(EXPENSES_ACTION_TYPES.ADD_EXPENSE_FAILED, error);

// view a expense
const viewExpenseStart = () =>
  createAction(EXPENSES_ACTION_TYPES.VIEW_A_EXPENSE_START);
const viewExpenseSuccess = (expense) =>
  createAction(EXPENSES_ACTION_TYPES.VIEW_A_EXPENSE_SUCCESS, expense);
const viewExpenseFailed = (error) =>
  createAction(EXPENSES_ACTION_TYPES.VIEW_A_EXPENSE_FAILED, error);

// approve a expense
const approveExpenseStart = () =>
  createAction(EXPENSES_ACTION_TYPES.APPROVE_A_EXPENSE_STATUS_START);
const approveExpenseSuccess = (expense) =>
  createAction(EXPENSES_ACTION_TYPES.APPROVE_A_EXPENSE_STATUS_SUCCESS, expense);
const approveExpenseFailed = (error) =>
  createAction(EXPENSES_ACTION_TYPES.APPROVE_A_EXPENSE_STATUS_FAILED, error);

// reimburse a expense
const reimburseExpenseStart = () =>
  createAction(EXPENSES_ACTION_TYPES.REIMBURSE_A_EXPENSE_STATUS_START);
const reimburseExpenseSuccess = (expense) =>
  createAction(
    EXPENSES_ACTION_TYPES.REIMBURSE_A_EXPENSE_STATUS_SUCCESS,
    expense
  );
const reimburseExpenseFailed = (error) =>
  createAction(EXPENSES_ACTION_TYPES.REIMBURSE_A_EXPENSE_STATUS_FAILED, error);

// cancel a expense
const cancelExpenseStart = () =>
  createAction(EXPENSES_ACTION_TYPES.CANCEL_A_EXPENSE_STATUS_START);
const cancelExpenseSuccess = (expense) =>
  createAction(EXPENSES_ACTION_TYPES.CANCEL_A_EXPENSE_STATUS_SUCCESS, expense);
const cancelExpenseFailed = (error) =>
  createAction(EXPENSES_ACTION_TYPES.CANCEL_A_EXPENSE_STATUS_FAILED, error);

//thunks
// get expenses
export const getExpensesAsync =
  (itemsPerPage, currentPage) => async (dispatch) => {
    dispatch(getExpensesStart());
    try {
      const { data } = await getExpenses(itemsPerPage, currentPage);
      //   console.log(data);
      //   console.log(data.data);
      dispatch(getExpensesSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getExpensesFailed(error));
    }
  };

// get expense Users
export const getExpenseUsersAsync = () => async (dispatch) => {
  dispatch(getExpenseUsersStart());
  try {
    const { data } = await getExpenseUsers();
    //   console.log(data);
    // console.log(data.data);
    dispatch(getExpenseUsersSuccess(data.data));
  } catch (error) {
    console.log(error);
    dispatch(getExpenseUsersFailed(error));
  }
};

// get expense Types
export const getExpenseTypesAsync = () => async (dispatch) => {
  dispatch(getExpenseTypesStart());
  try {
    const { data } = await getExpenseTypes();
    //   console.log(data);
    //   console.log(data.data);
    // console.log(data.data.values);
    dispatch(getExpenseTypesSuccess(data.data.values));
  } catch (error) {
    console.log(error);
    dispatch(getExpenseTypesFailed(error));
  }
};

// add new expense
export const addNewExpenseAsync = (newExpense) => async (dispatch) => {
  dispatch(addNewExpenseStart());
  try {
    const { data } = await addNewExpense(newExpense);
    //   console.log(data);
    dispatch(addNewExpenseSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(addNewExpenseFailed(error));
  }
};

// view a expense
export const viewExpenseAsync = (expenseId) => async (dispatch) => {
  dispatch(viewExpenseStart());
  try {
    const { data } = await viewSingleExpense(expenseId);
    //   console.log(data);
    console.log(data.data[0]);
    dispatch(viewExpenseSuccess(data?.data?.[0]));
  } catch (error) {
    console.log(error);
    dispatch(viewExpenseFailed(error));
  }
};

// approve a expense
export const approveExpenseAsync = (expenseId) => async (dispatch) => {
  dispatch(approveExpenseStart());
  try {
    const { data } = await approveExpense(expenseId);
    //   console.log(data);
    dispatch(approveExpenseSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(approveExpenseFailed(error));
  }
};

// reimburse a expense
export const reimburseExpenseAsync = (expenseId) => async (dispatch) => {
  dispatch(reimburseExpenseStart());
  try {
    const { data } = await reimburseExpense(expenseId);
    //   console.log(data);
    dispatch(reimburseExpenseSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(reimburseExpenseFailed(error));
  }
};

// cancel a expense
export const cancelExpenseAsync = (expenseData) => async (dispatch) => {
  dispatch(cancelExpenseStart());
  try {
    const { data } = await cancelExpense(expenseData);
    //   console.log(data);
    dispatch(cancelExpenseSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(cancelExpenseFailed(error));
  }
};
