import React from "react";
import { Layout } from "antd";
import ProductTable from "../productTable/ProductTable";
import AddProductForm from "../addProductForm/AddProductForm";
import "./mainContent.css";
import EditProductContent from "../editProductContent/EditProductContent";
import SalesOrderTable from "../salesOrderTable/SalesOrderTable";
import SalesInvoiceTable from "../salesInvoiceTable/SalesInvoiceTable";
import SingleOrderViewContent from "../singleOrderViewContent/SingleOrderViewContent";
import EditOrderForm from "../editOrderForm/EditOrderForm";
import ExpensesTable from "../expensesTable/ExpensesTable";

const { Content } = Layout;

type TMainContentProps = {
  page: string;
};

const MainContent = ({ page }: TMainContentProps) => {
  return (
    <Content className="layout__mainContent">
      <div
        className="site-layout-background"
        style={{
          padding: 24,
          minHeight: 360,
        }}
      >
        {page === "PRODUCTS_PAGE" && <ProductTable />}
        {page === "ADD_PRODUCTS_PAGE" && <AddProductForm />}
        {page === "EDIT_PRODUCT_PAGE" && <EditProductContent />}
        {page === "SALES_ORDER_PAGE" && <SalesOrderTable />}
        {page === "SALES_INVOICE_PAGE" && <SalesInvoiceTable />}
        {page === "SINGLE_ORDER_VIEW_PAGE" && <SingleOrderViewContent />}
        {page === "EDIT_ORDER_PAGE" && <EditOrderForm />}
        {page === "EXPENSES_PAGE" && <ExpensesTable />}
      </div>
    </Content>
  );
};

export default MainContent;
