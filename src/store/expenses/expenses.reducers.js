import { EXPENSES_ACTION_TYPES } from "./expenses.types";

const INITIAL_EXPENSES_STATE = {
  loading: false,
  error: null,
  expenses: null,
  expenseUsers: [],
  expenseTypes: [],
  changeStatus: null,
  expense: null,
};

export const expensesReducer = (
  state = INITIAL_EXPENSES_STATE,
  action = {}
) => {
  const { type, payload } = action;

  switch (type) {
    case EXPENSES_ACTION_TYPES.GET_EXPENSES_START:
      return { ...state, loading: true, error: null, expenses: null };
    case EXPENSES_ACTION_TYPES.GET_EXPENSES_SUCCESS:
      return { ...state, loading: false, error: null, expenses: payload };
    case EXPENSES_ACTION_TYPES.GET_EXPENSES_FAILED:
      return { ...state, loading: false, error: payload, expenses: null };

    case EXPENSES_ACTION_TYPES.GET_EXPENSE_USERS_START:
      return { ...state, loading: true, error: null, expenseUsers: [] };
    case EXPENSES_ACTION_TYPES.GET_EXPENSE_USERS_SUCCESS:
      return { ...state, loading: false, error: null, expenseUsers: payload };
    case EXPENSES_ACTION_TYPES.GET_EXPENSE_USERS_FAILED:
      return { ...state, loading: false, error: payload, expenseUsers: [] };

    case EXPENSES_ACTION_TYPES.GET_EXPENSE_TYPES_START:
      return { ...state, loading: true, error: null, expenseTypes: [] };
    case EXPENSES_ACTION_TYPES.GET_EXPENSE_TYPES_SUCCESS:
      return { ...state, loading: false, error: null, expenseTypes: payload };
    case EXPENSES_ACTION_TYPES.GET_EXPENSE_TYPES_FAILED:
      return { ...state, loading: false, error: payload, expenseTypes: [] };

    case EXPENSES_ACTION_TYPES.ADD_EXPENSE_START:
      return { ...state, loading: true, error: null, changeStatus: null };
    case EXPENSES_ACTION_TYPES.ADD_EXPENSE_SUCCESS:
      return { ...state, loading: false, error: null, changeStatus: payload };
    case EXPENSES_ACTION_TYPES.ADD_EXPENSE_FAILED:
      return { ...state, loading: false, error: payload, changeStatus: null };

    case EXPENSES_ACTION_TYPES.VIEW_A_EXPENSE_START:
      return { ...state, loading: true, error: null, expense: null };
    case EXPENSES_ACTION_TYPES.VIEW_A_EXPENSE_SUCCESS:
      return { ...state, loading: false, error: null, expense: payload };
    case EXPENSES_ACTION_TYPES.VIEW_A_EXPENSE_FAILED:
      return { ...state, loading: false, error: payload, expense: null };

    case EXPENSES_ACTION_TYPES.APPROVE_A_EXPENSE_STATUS_START:
    case EXPENSES_ACTION_TYPES.REIMBURSE_A_EXPENSE_STATUS_START:
    case EXPENSES_ACTION_TYPES.CANCEL_A_EXPENSE_STATUS_START:
      return { ...state, loading: true, error: null, changeStatus: null };
    case EXPENSES_ACTION_TYPES.APPROVE_A_EXPENSE_STATUS_SUCCESS:
    case EXPENSES_ACTION_TYPES.REIMBURSE_A_EXPENSE_STATUS_SUCCESS:
    case EXPENSES_ACTION_TYPES.CANCEL_A_EXPENSE_STATUS_SUCCESS:
      return { ...state, loading: false, error: null, changeStatus: payload };
    case EXPENSES_ACTION_TYPES.APPROVE_A_EXPENSE_STATUS_FAILED:
    case EXPENSES_ACTION_TYPES.REIMBURSE_A_EXPENSE_STATUS_FAILED:
    case EXPENSES_ACTION_TYPES.CANCEL_A_EXPENSE_STATUS_FAILED:
      return { ...state, loading: false, error: payload, changeStatus: null };

    default:
      return state;
  }
};
