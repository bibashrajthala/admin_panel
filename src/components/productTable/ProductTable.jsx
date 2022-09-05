import React, { useState } from "react";
import { Table, Button, Pagination } from "antd";
// import { ColumnsType } from "antd/es/table";
import { PlusOutlined } from "@ant-design/icons";
// import type { PaginationProps } from "antd";

import { useSelector } from "react-redux";
import {
  selectProducts,
  selectTotalProducts,
} from "../../store/product/product.selector";

import "./productTable.css";

import { useDispatch } from "react-redux";
import { getProductsAsync } from "../../store/product/product.action";
import { Link, useNavigate } from "react-router-dom";

// type TProduct = {
//   key: string;
//   productName: string;
//   productImage: string;
//   productCode: string;
//   visible: string;
//   brand: string;
//   price: number;
//   stock: number;
//   unit: string;
//   reOrderlevel: number | null;
// };

// const columns: ColumnsType<TProduct> = [
const columns = [
  {
    title: "Product Name",
    width: 200,
    dataIndex: "productName",
    key: "key",
    fixed: "left",
    render: (text, record) => {
      // console.log(record);
      const { key } = record;
      return <Link to={`/products/edit/${key}`}>{text}</Link>;
    },
  },
  {
    title: "Product Code",
    width: 100,
    dataIndex: "productCode",
    key: "key",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "1",
    width: 150,
  },
  {
    title: "Visible",
    dataIndex: "visible",
    key: "2",
    width: 150,
  },
  {
    title: "Stock",
    dataIndex: "stock",
    key: "3",
    width: 150,
  },
  {
    title: "Re-order level",
    dataIndex: "reOrderlevel",
    key: "4",
    width: 150,
  },
  {
    title: "Unit",
    dataIndex: "unit",
    key: "5",
    width: 150,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    key: "6",
    width: 150,
  },
  // {
  //   title: "Action",
  //   key: "operation",
  //   fixed: "right",
  //   width: 150,
  //   // render: () => <a href="#">action</a>,
  //   render: () => (
  //     <Space size="small">
  //       <Button
  //         className="productTable__btn productTable__edit-btn"
  //         icon={<EditOutlined />}
  //       >
  //         Edit
  //       </Button>
  //       <Button
  //         className="productTable__btn productTable__delete-btn"
  //         icon={<DeleteOutlined />}
  //       >
  //         Delete
  //       </Button>
  //     </Space>
  //   ),
  // },
];

const ProductTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(selectProducts);
  const totalProducts = useSelector(selectTotalProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfItems, setNumberOfItems] = useState(25);

  // console.log(products);
  // console.log(totalProducts);

  // useEffect(() => {
  //   const getProducts = async () => {
  //     dispatch(getProductsAsync(25, 1));
  //   };
  //   getProducts();
  // }, []);

  // const data: TProduct[] = products?.map((product: any) => {
  const data = products?.map((product) => {
    const {
      _id,
      product_name,
      product_code,
      image,
      visible,
      brand,
      cost_price,
      in_stock,
      unit,
      reorder_point,
    } = product;
    return {
      key: _id,
      productName: product_name,
      productImage: image,
      productCode: product_code,
      visible: visible,
      brand: brand,
      price: cost_price,
      stock: in_stock,
      unit: unit,
      reOrderlevel: reorder_point,
    };
  });

  const handleAddProduct = () => navigate("/products/add");

  // const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
    setCurrentPage(current);
    setNumberOfItems(pageSize);
  };

  // called when page or pageSize(np. of items per page) is changed
  // const handlePaginationChange = (page: number, pageSize: number) => {
  const handlePaginationChange = (page, pageSize) => {
    dispatch(getProductsAsync(pageSize, page));
  };

  return (
    <>
      <div className="productTable__header">
        <Button
          className="productTable__btn productTable__add-btn"
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddProduct}
        >
          Add Product
        </Button>
      </div>
      <Table
        pagination={false}
        className="productTable"
        columns={columns}
        dataSource={data}
        scroll={{
          x: 1500,
          y: 300,
        }}
      />
      <Pagination
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        pageSize={numberOfItems} //itemsPerPage
        current={currentPage} // currentPage
        defaultCurrent={1} // by default opened page when first loaded the page
        total={totalProducts} // total items
        onChange={handlePaginationChange}
        pageSizeOptions={[5, 25, 50, 100]} // options to display no. of items
      />
    </>
  );
};

export default ProductTable;
