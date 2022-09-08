import React, { useState } from "react";
import { Table, Button, Pagination, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getInvoicesListAsync } from "../../store/orders/orders.action";
import { Link, useNavigate } from "react-router-dom";
import { selectInvoices } from "../../store/orders/orders.selector";
import moment from "moment";

type Props = {};

const columns: any = [
  {
    title: "Invoice Number",
    width: 150,
    dataIndex: "invoice",
    key: "key",
    fixed: "left",
    render: (invoice: any, record: any) => {
      // console.log(record);
      const { key } = record;
      let color;
      if (invoice.invoice_status.includes("Paid")) {
        color = "green";
      }
      if (invoice.invoice_status === "Confirmed") {
        color = "blue";
      }
      if (invoice.invoice_status === "Draft") {
        color = "red";
      }
      return (
        <Link to={`/sales/invoice/${key}`}>
          <div>
            #{invoice.order_number}{" "}
            {invoice.reference_id ? `(${invoice.reference_id})` : ""}
          </div>
          <Tag color={color}>{invoice.invoice_status}</Tag>
          {invoice.subject && <div>Subject: {invoice.subject}</div>}
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
    title: "Due",
    dataIndex: "due",
    key: "3",
    width: 150,
  },
  {
    title: "Due Date",
    dataIndex: "dueDate",
    key: "4",
    width: 150,
  },
  {
    title: "Invoice Date",
    dataIndex: "orderDate",
    key: "5",
    width: 150,
  },
  {
    title: "Owner",
    dataIndex: "owner",
    key: "6",
    width: 150,
  },
  {
    title: "Dealer",
    dataIndex: "dealer",
    key: "7",
    width: 150,
  },
];

const SalesInvoiceTable = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const invoices = useSelector(selectInvoices);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfItems, setNumberOfItems] = useState(25);

  const {
    total: totalInvoiceAmount,
    dueOnly: totalDueAmount,
    total_records: totalNumberInvoices,
    data: invoicesList,
  } = invoices;

  // console.log(invoices);
  // console.log(
  //   // totalInvoiceAmount,
  //   // totalDueAmount,
  //   totalNumberInvoices,
  //   invoicesList
  // );

  const data = invoicesList?.map((invoice: any) => {
    const {
      _id,
      order_number,
      reference_id,
      invoice_status,
      subject,
      organization_name,
      currency,
      grand_total,
      remaining_amount,
      due_date,
      createdAt,
      created_by: { first_name, last_name },
      // dealer: { first_name: firstName, last_name: lastName },
      dealer,
    } = invoice;

    return {
      key: _id,
      invoice: {
        order_number,
        reference_id,
        invoice_status,
        subject,
      },
      account: organization_name,
      amount: `${currency} ${grand_total.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      due: `${currency} ${remaining_amount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      dueDate: `${moment(due_date).format("LL")} (${moment(
        due_date
      ).fromNow()})`,
      orderDate: moment(createdAt).format("LL"),
      owner: `${first_name} ${last_name}`,
      dealer: `${dealer ? dealer.first_name : ""} ${
        dealer ? dealer.last_name : ""
      }`,
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
    dispatch<any>(getInvoicesListAsync(pageSize, page));
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
          Create Invoice
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
        total={totalNumberInvoices} // total items
        onChange={handlePaginationChange}
        pageSizeOptions={[5, 25, 50, 100]} // options to display no. of items
      />
    </>
  );
};

export default SalesInvoiceTable;
