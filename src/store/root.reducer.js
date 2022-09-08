import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer";
import { productReducer } from "./product/product.reducer";
import { ordersReducer } from "./orders/orders.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  order: ordersReducer,
});
