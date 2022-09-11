import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer";
import { productReducer } from "./product/product.reducer";
import { ordersReducer } from "./orders/orders.reducer";
import { expensesReducer } from "./expenses/expenses.reducers";

export const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  order: ordersReducer,
  expense: expensesReducer,
});
