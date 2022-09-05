import React from "react";
import { Layout } from "antd";
import ProductTable from "../productTable/ProductTable";
import AddProductForm from "../addProductForm/AddProductForm";
import "./mainContent.css";
import EditProductContent from "../editProductContent/EditProductContent";

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
      </div>
    </Content>
  );
};

export default MainContent;
