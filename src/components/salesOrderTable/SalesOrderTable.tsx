import React, { useState } from "react";
import { Table, Button, Pagination, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersListAsync } from "../../store/orders/orders.action";
import { Link, useNavigate } from "react-router-dom";
import { selectOrders } from "../../store/orders/orders.selector";
import moment from "moment";

type Props = {};

const columns: any = [
  {
    title: "Order Number",
    width: 150,
    dataIndex: "order",
    key: "key",
    fixed: "left",
    render: (order: any, record: any) => {
      // console.log(record);
      const { key } = record;
      let color;
      if (order.order_status === "Complete") {
        color = "green";
      }
      if (order.order_status === "Confirmed") {
        color = "blue";
      }
      if (order.order_status === "Draft") {
        color = "red";
      }
      return (
        <Link to={`/sales/orders/${key}`}>
          <div>
            #{order.order_number}{" "}
            {order.reference_id ? `(${order.reference_id})` : ""}
          </div>
          <Tag color={color}>{order.order_status}</Tag>
          {order.subject && <div>Subject: {order.subject}</div>}
        </Link>
      );
    },
  },
  {
    title: "Associated Account",
    dataIndex: "account",
    key: "1",
    width: 150,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "2",
    width: 150,
  },
  {
    title: "Order Date",
    dataIndex: "orderDate",
    key: "3",
    width: 150,
  },
  {
    title: "Owner",
    dataIndex: "owner",
    key: "4",
    width: 150,
  },
];

const SalesOrderTable = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector(selectOrders);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfItems, setNumberOfItems] = useState(25);

  const {
    // total: totalOrdersWorth,
    total_records: totalOrders,
    data: ordersList,
  } = orders;

  // console.log(orders);
  // console.log(totalOrdersWorth, totalOrders, ordersList);

  const data = ordersList?.map((order: any) => {
    const {
      _id,
      order_number,
      reference_id,
      order_status,
      subject,
      organization_name,
      currency,
      grand_total,
      createdAt,
      created_by: { first_name, last_name },
    } = order;
    return {
      key: _id,
      order: { order_number, reference_id, order_status, subject },
      // referenceId: reference_id,
      // orderStatus: order_status,
      // subject: subject,
      account: organization_name,
      amount: `${currency} ${grand_total.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      // currency: currency,
      // grandTotal: grand_total,
      orderDate: moment(createdAt).format("LL"),
      owner: `${first_name} ${last_name}`,
    };
  });

  const handleCreateOrder = () => navigate("/sales/orders/add");

  // const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
  const onShowSizeChange = (current: number, pageSize: number) => {
    console.log(current, pageSize);
    setCurrentPage(current);
    setNumberOfItems(pageSize);
  };

  // called when page or pageSize(np. of items per page) is changed
  // const handlePaginationChange = (page: number, pageSize: number) => {
  const handlePaginationChange = (page: number, pageSize: number) => {
    dispatch<any>(getOrdersListAsync(pageSize, page));
  };

  return (
    <>
      <div className="orderTable__header">
        <Button
          className="orderTable__btn orderTable__add-btn"
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreateOrder}
        >
          Create Order
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
        total={totalOrders} // total items
        onChange={handlePaginationChange}
        pageSizeOptions={[5, 25, 50, 100]} // options to display no. of items
      />
    </>
  );
};

export default SalesOrderTable;
