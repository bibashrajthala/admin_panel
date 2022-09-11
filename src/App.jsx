import React from "react";
import "antd/dist/antd.min.css";
import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";
import Auth from "./pages/auth/Auth";
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import AddProductPage from "./pages/addProductPage/AddProductPage";
import EditProductPage from "./pages/editProductPage/EditProductPage";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "./store/user/user.selector";
import SalesInvoicePage from "./pages/salesInvoicePage/SalesInvoicePage";
import SalesOrderPage from "./pages/salesOrderPage/SalesOrderPage";
import SingleOrderView from "./pages/singleOrderView/SingleOrderView";
import EditOrderPage from "./pages/editOrderPage/EditOrderPage";
import Expenses from "./pages/expenses/Expenses";

function App() {
  const user = useSelector(selectCurrentUser);
  const token = localStorage.getItem("accessToken");

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={user || token ? <Navigate to="dashboard" /> : <Home />}
        />
        <Route
          path="/auth"
          element={user || token ? <Navigate to="../dashboard" /> : <Auth />}
        />
        <Route
          path="/dashboard"
          element={user || token ? <Dashboard /> : <Navigate to="../auth" />}
        />
        <Route
          path="/products"
          element={user || token ? <Products /> : <Navigate to="../auth" />}
        />
        <Route
          path="/products/add"
          element={
            user || token ? <AddProductPage /> : <Navigate to="../auth" />
          }
        />
        <Route
          path="/products/edit/:id"
          element={
            user || token ? <EditProductPage /> : <Navigate to="../auth" />
          }
        />
        <Route
          path="/sales/orders"
          element={
            user || token ? <SalesOrderPage /> : <Navigate to="../auth" />
          }
        />
        <Route
          path="/sales/orders/:id"
          element={
            user || token ? <SingleOrderView /> : <Navigate to="../auth" />
          }
        />
        <Route
          path="/sales/orders/edit/:id"
          element={
            user || token ? <EditOrderPage /> : <Navigate to="../auth" />
          }
        />
        <Route
          path="/sales/invoices"
          element={
            user || token ? <SalesInvoicePage /> : <Navigate to="../auth" />
          }
        />
        <Route
          path="/expenses"
          element={user || token ? <Expenses /> : <Navigate to="../auth" />}
        />
      </Routes>
    </div>
  );
}

export default App;
