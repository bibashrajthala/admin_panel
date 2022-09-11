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

export const getExpenses = (itemsPerPage, currentPage) =>
  API.get(
    `/api/v1/expenses?pagination_limit=${itemsPerPage}&pagination_page=${currentPage}`
  );

export const getExpenseUsers = () => API.get(`/api/v1/users/list`);

export const getExpenseTypes = () =>
  API.get(`/api/v1/frontend_renderers/list/expense-types`);

export const addNewExpense = (newExpense) =>
  API.post(`/api/v1/expenses`, newExpense);

export const viewSingleExpense = (expenseId) =>
  API.get(`/api/v1/expenses?_id=${expenseId}`);

export const approveExpense = (expenseId) =>
  API.patch(`/api/v1/expenses/approveExpense`, { expense_ids: [expenseId] });

export const reimburseExpense = (expenseId) =>
  API.patch(`/api/v1/expenses/reimburseExpense`, { expense_ids: [expenseId] });

export const cancelExpense = (data) =>
  API.patch(
    `api/v1/expenses/cancelExpense
  `,
    data
  );
