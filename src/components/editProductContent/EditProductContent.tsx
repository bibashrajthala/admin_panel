import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Card,
  Breadcrumb,
  Button,
  Tabs,
  Avatar,
  Tooltip,
  Popover,
  Modal,
} from "antd";

import {
  UserOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

import "./editProductContent.css";
import OverviewContentForEditPage from "../overviewContentForEditPage/OverviewContentForEditPage";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductAsync } from "../../store/product/product.action";
import HistoryEditPage from "../historyEditPage/HistoryEditPage";
import { selectProductById } from "../../store/product/product.selector";

const { TabPane } = Tabs;

type Props = {};

const EditProductContent = (props: Props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector(selectProductById);
  const { product_name, product_code } = product;

  const onTabsChange = (key: string) => {
    console.log(key);
  };

  const { confirm } = Modal;
  const showConfirm = () => {
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleOutlined />,
      content: "Some descriptions",
      onOk() {
        console.log("OK");
        dispatch<any>(deleteProductAsync(id));
        navigate("/products");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <div className="editPage">
      <Card className="editPage__item-path">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to={"/products"}>Products</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={`/products/edit/${id}`}>Edit</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Button
          danger
          type="primary"
          icon={<DeleteOutlined />}
          onClick={showConfirm}
        >
          Delete Product
        </Button>
      </Card>

      <Card>
        <Tooltip
          placement="rightTop"
          title={<span>Image: Click for options</span>}
        >
          <Popover
            placement="bottomLeft"
            content={
              <div>
                <p>Preview image</p>
                <p>Upload image</p>
                <p>Remove image</p>
              </div>
            }
            trigger="click"
          >
            <Avatar shape="square" size={40} icon={<UserOutlined />} />
          </Popover>
        </Tooltip>
        <div className="editPage__product-intro">
          <span>{product_name}</span>
          <br />
          <span>SKU: {product_code || "N/A"}</span>
        </div>
      </Card>

      <Card>
        <Tabs defaultActiveKey="1" onChange={onTabsChange}>
          <TabPane tab="Overview" key="1">
            <OverviewContentForEditPage />
          </TabPane>
          <TabPane tab="History" key="2">
            <HistoryEditPage />
          </TabPane>
          <TabPane tab="dynoBuys" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default EditProductContent;
