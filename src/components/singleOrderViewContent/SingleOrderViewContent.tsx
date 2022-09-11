import React, { useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Divider,
  Table,
  Modal,
  Form,
  Input,
} from "antd";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { AiOutlineFileDone } from "react-icons/ai";
import { FaShuttleVan } from "react-icons/fa";
import { MdDone, MdCancel } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { selectOrder } from "../../store/orders/orders.selector";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";

import "./singleOrderView.css";
import {
  getOrderByIdAsync,
  updateOrderStatusAsync,
} from "../../store/orders/orders.action";
import FormItem from "antd/es/form/FormItem";

type Props = {};

const columns = [
  {
    title: "S.N",
    dataIndex: "symbolNumber",
    key: "s.n",
  },
  {
    title: "Items & Description",
    dataIndex: "itemAndDescription",
    key: "items",
    render: (itemAndDescription: any) => {
      const { product_name, description } = itemAndDescription;
      return (
        <>
          <div>{product_name}</div>
          <div>{description}</div>
        </>
      );
    },
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "Quantity",
    render: (quantity: any) => {
      const { numberOfItems, unit } = quantity;
      return (
        <>
          <span>
            {numberOfItems} {unit}
          </span>
        </>
      );
    },
  },
  {
    title: "Rate",
    dataIndex: "rate",
    key: "rate",
    // render: (rate: any) => <span>NPR {rate}</span>,
  },
  {
    title: "Tax",
    dataIndex: "tax",
    key: "tax",
    render: (tax: any) => {
      return (
        <>
          <span>
            {tax?.[0]} ({tax?.[1]}) ({tax?.[2]})
          </span>
        </>
      );
    },
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
];

const SingleOrderViewContent = (props: Props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const order = useSelector(selectOrder);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState({});
  const [form] = Form.useForm();

  // console.log(order);

  const {
    _id,
    order_number,
    reference_id,
    order_status,
    subject,
    organization_name,
    currency,
    // grand_total,
    createdAt,
    created_by: { first_name, last_name },
    delivery_method,
    items: orderItems,
    discount,
    tax_name,
    tax_rate,
    warehouse_id,
    customer_note,
    terms_and_conditions,
  } = order;

  const orderDate = `${moment(createdAt).format("LL")} (${moment(
    createdAt
  ).fromNow()}) `;
  const orderOwner = `${first_name} ${last_name}`;

  const tableData = orderItems.map((orderItem: any, index: number) => {
    const {
      product_id,
      product_name,
      description,
      quantity: numberOfItems,
      unit,
      rate,
      tax,
      price,
    } = orderItem;
    return {
      key: product_id,
      symbolNumber: index + 1,
      itemAndDescription: { product_name, description },
      quantity: { numberOfItems, unit },
      rate: `${currency} ${Number(rate)?.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      tax: tax,
      amount: price
        ? `${currency} ${price?.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`
        : "N/A",
    };
  });

  //for amount below table
  const convertToLocaleString = (num: number) =>
    `${currency} ${num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const subTotal = orderItems.reduce((acc: number, orderItem: any) => {
    return acc + (orderItem?.price ? orderItem.price : 0);
  }, 0);
  const discountAmount = (Number(discount[1]) / 100) * subTotal;
  const total = subTotal + discountAmount;
  const taxAmount = (tax_rate / 100) * total;
  const grandTotal = total + taxAmount;

  // for submodals for cancelling, invoicing and confirming orders
  const showModal = () => {
    setIsSubModalOpen(true);
  };
  const handleOk = async (values: any) => {
    console.log(values);
    const newOrderStatus = {
      ...orderStatus,
      order_cancel_reason: values?.order_cancel_reason,
    };
    await dispatch<any>(updateOrderStatusAsync(newOrderStatus));
    await dispatch<any>(getOrderByIdAsync(id));
    setIsSubModalOpen(false);
  };
  const handleCancel = () => {
    setIsSubModalOpen(false);
  };

  // for modal for 4 buttons above table
  const { confirm } = Modal;
  const showConfirm = (task: string) => {
    confirm({
      content: `Are you sure you want to change Order status from ${order_status} to ${task}?`,
      async onOk() {
        console.log("OK");
        let newOrderStatus;
        newOrderStatus = { order_id: id, order_status: task };
        if (task === "Cancelled") {
          setOrderStatus(newOrderStatus);
          showModal();

          // need to take values.order_cancel_reason to here from handleOk of sub modal for cancel order
          // newOrderStatus = {
          //   order_id: id,
          //   order_status: task,
          //   order_cancel_reason: "",
          // };
        }

        if (task !== "Cancelled") {
          await dispatch<any>(updateOrderStatusAsync(newOrderStatus));
          await dispatch<any>(getOrderByIdAsync(id));
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleEditOrder = () => {
    navigate(`../../../sales/orders/edit/${_id}`);
  };

  return (
    <div className="orderView">
      <Card>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="../../../sales/orders">Orders</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="./">#{order_number}</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Card>

      <Card className="orderView-card">
        <div className="orderView-card__header">
          <div className="ovc__h-left">
            <h3 className="ovc__h-orderNumber">
              Order Number: #{order_number}
            </h3>
            <span className="ovc__h-orderStatus">{order_status}</span>
          </div>

          <div className="ovc__h-right">
            <Button
              className="ovc__h-editBtn"
              icon={<FormOutlined />}
              onClick={handleEditOrder}
            >
              Edit
            </Button>
            <Button className="ovc__h-deleteBtn" icon={<DeleteOutlined />}>
              Delete
            </Button>
          </div>
        </div>

        <Divider />

        <div className="orderView-card__content">
          <div className="ovc__c-line">
            Associated Account:{" "}
            <span
              style={{
                fontSize: "1rem",
                color: "blue",
              }}
            >
              {organization_name}
            </span>
          </div>
          <div className="ovc__c-line">
            Order Owner:{" "}
            <span>
              <b>{orderOwner}</b>
            </span>{" "}
            <span
              style={{
                fontSize: "1rem",
                color: "blue",
              }}
            >
              [ Change ]
            </span>
          </div>
          <div className="ovc__c-line">
            Order Dealer: <b>N/A</b>{" "}
            <span
              style={{
                fontSize: "1rem",
                color: "blue",
              }}
            >
              [ Change ]
            </span>{" "}
          </div>
          <div className="ovc__c-line">Order Date: {orderDate}</div>
          <div className="ovc__c-line">Expected Delivery:</div>
          <div className="ovc__c-line">Delivery Method: {delivery_method}</div>
          <div className="ovc__c-line">Payment Term:</div>
        </div>

        <Divider />

        <div className="orderView-card__footer">
          <div className="ovc__f-referenceId">
            Reference ID: <b>{reference_id ? reference_id : "N/A"}</b>
          </div>
          {subject && (
            <div className="ovc__f-subject">
              Subject: <b>{subject}</b>
            </div>
          )}
        </div>
      </Card>
      <div className="orderView-btnsContainer">
        {order_status === "Confirmed" && (
          <Button
            className="ov-vc__btn"
            type="primary"
            icon={<AiOutlineFileDone />}
            onClick={() => showConfirm("Ready to ship")}
          >
            Mark as Ready to ship
          </Button>
        )}

        {(order_status === "Confirmed" || order_status === "Ready to ship") && (
          <Button
            className="ov-vc__btn"
            type="primary"
            icon={<FaShuttleVan />}
            onClick={() => showConfirm("Shipped")}
          >
            Mark as Shipped
          </Button>
        )}

        {(order_status === "Confirmed" ||
          order_status === "Ready to ship" ||
          order_status === "Shipped") && (
          <Button
            className="ov-vc__btn"
            type="primary"
            icon={<MdDone />}
            onClick={() => showConfirm("Complete")}
          >
            Mark as Complete
          </Button>
        )}

        {order_status === "Draft" && (
          <Button
            className="ov-vc__btn"
            type="primary"
            icon={<MdDone />}
            onClick={() => showConfirm("Confirmed")}
          >
            Mark as Confirmed
          </Button>
        )}

        {order_status === "Complete" && (
          <Button
            className="ov-vc__btn"
            type="primary"
            icon={<MdCancel />}
            onClick={() => showConfirm("Invoice")}
          >
            Convert To Invoice
          </Button>
        )}

        {(order_status === "Confirmed" ||
          order_status === "Ready to ship" ||
          order_status === "Shipped" ||
          order_status === "Draft" ||
          order_status === "Complete") && (
          <Button
            className="ov-vc__btn"
            type="primary"
            icon={<MdCancel />}
            onClick={() => showConfirm("Cancelled")}
          >
            Cancel Order
          </Button>
        )}
        <Modal
          title="Cancellation Reason"
          visible={isSubModalOpen}
          onOk={form.submit}
          onCancel={handleCancel}
        >
          <Form form={form} onFinish={handleOk}>
            <FormItem name="order_cancel_reason">
              <Input.TextArea />
            </FormItem>
          </Form>
        </Modal>
      </div>

      <Table
        className="orderView-table"
        dataSource={tableData}
        columns={columns}
        pagination={false}
      />

      <Card className="orderView-amounts">
        <div>
          Sub Total: <b>{convertToLocaleString(subTotal)}</b>
        </div>
        <div>
          Discount({discount[1]}%):{" "}
          <b>{convertToLocaleString(discountAmount)}</b>
        </div>
        <div>
          Total: <b>{convertToLocaleString(total)}</b>
        </div>
        <div>
          {tax_name}({tax_rate}%): <b>{convertToLocaleString(taxAmount)}</b>
        </div>
        <div>
          Grand Total: <b>{convertToLocaleString(grandTotal)}</b>
        </div>
      </Card>

      {warehouse_id && (
        <Card>
          <span>
            <b>Warehouse:</b> {warehouse_id.name}
          </span>
        </Card>
      )}

      <Card>
        <div>
          <b>Customer Note:</b> {customer_note ? customer_note : "N/A"}
        </div>
        <div>
          <b>Terms and Conditions:</b>{" "}
          {terms_and_conditions ? terms_and_conditions : "N/A"}
        </div>
      </Card>
    </div>
  );
};

export default SingleOrderViewContent;
