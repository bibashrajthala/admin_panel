import React from "react";
import { Layout } from "antd";
import ProductTable from "../productTable/ProductTable";
const { Content } = Layout;

type TMainContentProps = {
  page: string;
};

const MainContent = ({ page }: TMainContentProps) => {
  return (
    <Content
      style={{
        margin: "24px 16px 0",
      }}
    >
      <div
        className="site-layout-background"
        style={{
          padding: 24,
          minHeight: 360,
        }}
      >
        {page === "products" ? <ProductTable /> : ""}
      </div>
    </Content>
  );
};

export default MainContent;
