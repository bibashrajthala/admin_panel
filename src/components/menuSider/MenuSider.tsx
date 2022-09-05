import React from "react";
import { AppstoreOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

import { ReactComponent as SiderLogo } from "../../assets/svgs/siderLogo.svg";

import "./menuSider.css";

const { Sider } = Layout;

type Props = {};

const menuItems = [
  {
    navIcon: AppstoreOutlined,
    navLinkName: "Dashboard",
  },
  {
    navIcon: ShoppingOutlined,
    navLinkName: "Products",
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
        className='layout__menuSider'
      >
        <div className="menuSider__logo">
          <SiderLogo />
        </div>
        <Menu
          onSelect={handleSelect}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={menuItems.map((menuItem, index) => ({
            key: String(index + 1),
            icon: React.createElement(menuItem.navIcon),
            label: menuItem.navLinkName,
          }))}
        />
      </Sider>
    </>
  );
};

export default MenuSider;
