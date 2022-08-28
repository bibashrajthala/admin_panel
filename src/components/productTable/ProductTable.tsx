import React, { useState } from "react";
import { Table, Button, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

import "./productTable.css";
import AddProductModal from "../addProductModal/AddProductModal";

type TProduct = {
  key: number;
  name: string;
  age?: number;
  address?: string;
};

const columns: ColumnsType<TProduct> = [
  {
    title: "Full Name",
    width: 100,
    dataIndex: "name",
    key: "name",
    fixed: "left",
  },
  {
    title: "Age",
    width: 100,
    dataIndex: "age",
    key: "age",
    fixed: "left",
  },
  {
    title: "Column 1",
    dataIndex: "address",
    key: "1",
    width: 150,
  },
  {
    title: "Column 2",
    dataIndex: "address",
    key: "2",
    width: 150,
  },
  {
    title: "Column 3",
    dataIndex: "address",
    key: "3",
    width: 150,
  },
  {
    title: "Column 4",
    dataIndex: "address",
    key: "4",
    width: 150,
  },
  {
    title: "Column 5",
    dataIndex: "address",
    key: "5",
    width: 150,
  },
  {
    title: "Column 6",
    dataIndex: "address",
    key: "6",
    width: 150,
  },
  {
    title: "Column 7",
    dataIndex: "address",
    key: "7",
    width: 150,
  },
  {
    title: "Column 8",
    dataIndex: "address",
    key: "8",
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 150,
    // render: () => <a href="#">action</a>,
    render: () => (
      <Space size="small">
        <Button
          className="productTable__btn productTable__edit-btn"
          icon={<EditOutlined />}
        >
          Edit
        </Button>
        <Button
          className="productTable__btn productTable__delete-btn"
          icon={<DeleteOutlined />}
        >
          Delete
        </Button>
      </Space>
    ),
  },
];

const data: TProduct[] = [
  {
    key: 0,
    name: "Jack",
  },
];

for (let i = 1; i < 100; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

type Props = {};

const ProductTable = (props: Props) => {
  const [visible, setVisible] = useState(false);

  const handleAddingProduct = () => setVisible(true);
  return (
    <>
      <div className="productTable__header">
        <Button
          className="productTable__btn productTable__add-btn"
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddingProduct}
        >
          Add Product
        </Button>
        <AddProductModal visible={visible} setVisible={setVisible} />
      </div>
      <Table
        className="productTable"
        columns={columns}
        dataSource={data}
        scroll={{
          x: 1500,
          y: 300,
        }}
      />
    </>
  );
};

export default ProductTable;
