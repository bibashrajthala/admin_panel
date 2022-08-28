import React from "react";

import { Layout, Input, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

import "./headerLayout.css";
const { Header } = Layout;

type Props = {};

const HeaderLayout = (props: Props) => {
  return (
    <Header
      className="site-layout-sub-header-background layout__header"
      style={{
        padding: 0,
      }}
    >
      <div className="header__left-side">
        <Avatar size={50} icon={<UserOutlined />} />
        <div className="header__user-info">
          <h3 className="header__user-name">Diwakar Enterprise</h3>
          <p className="header__user-email">binaytest@gmail.com</p>
        </div>
      </div>

      <div className="header__right-side">
        <Input placeholder="default size" prefix={<UserOutlined />} />
        <Avatar size={50} icon={<UserOutlined />} />
      </div>
    </Header>
  );
};

export default HeaderLayout;
