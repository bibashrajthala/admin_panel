import React from "react";
import {
  AppstoreOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

import { ReactComponent as SiderLogo } from "../../assets/svgs/siderLogo.svg";

import "./menuSider.css";

const { Sider } = Layout;

type Props = {};

const menuItems = [
  {
    icon: React.createElement(AppstoreOutlined),
    label: "Dashboard",
    key: "1",
  },
  {
    icon: React.createElement(ShoppingOutlined),
    label: "Products",
    key: "2",
  },

  {
    icon: React.createElement(ShoppingCartOutlined),
    label: "Sales",
    key: "3",
    children: [
      {
        icon: React.createElement(AppstoreOutlined),
        label: "Sales Orders",
        key: "3.1",
      },
      {
        icon: React.createElement(AppstoreOutlined),
        label: "Invoices",
        key: "3.2",
      },
    ],
  },
];

const MenuSider = (props: Props) => {
  const navigate = useNavigate();
  const handleSelect = ({
    item,
    key,
    keyPath,
    selectedKeys,
    domEvent,
  }: any) => {
    console.log("key", key);
    console.log("item", item);

    if (key === "1") navigate("/dashboard");
    if (key === "2") navigate("/products");
    if (key === "3.1") navigate("/sales/orders");
    if (key === "3.2") navigate("/sales/invoices");
  };
  return (
    <>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        className="layout__menuSider"
      >
        <div className="menuSider__logo">
          <SiderLogo />
        </div>
        <Menu
          onSelect={handleSelect}
          // onClick={handleSelect}
          theme="dark"
          mode="inline"
          // defaultSelectedKeys={["1"]}
          items={menuItems}
        />
      </Sider>
    </>
  );
};

export default MenuSider;
