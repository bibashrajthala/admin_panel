import { Layout } from "antd";

import FooterLayout from "../footerLayout/FooterLayout";
import HeaderLayout from "../headerLayout/HeaderLayout";
import MainContent from "../mainContent/MainContent";
import MenuSider from "../menuSider/MenuSider";

import "./layoutApp.css";

type TLayoutAppProps = {
  page: string;
};

const LayoutApp = ({ page }: TLayoutAppProps) => (
  <Layout>
    <MenuSider />
    <Layout>
      <HeaderLayout />
      <MainContent page={page} />
      <FooterLayout />
    </Layout>
  </Layout>
);

export default LayoutApp;
