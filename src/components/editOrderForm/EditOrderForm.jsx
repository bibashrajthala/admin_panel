import React, { useState } from "react";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Card,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  InputNumber,
  Divider,
} from "antd";
import ProductsSelectDropdown from "../productsSelectDropdown/ProductsSelectDropdown";

import "./editOrderForm.css";
import { useSelector } from "react-redux";
import { selectOrder } from "../../store/orders/orders.selector";

import moment from "moment";

const { TextArea } = Input;
const { Option } = Select;
const dateFormat = "YYYY-MM-DD";

const INITIAL_ITEMS_VALUE = {
  description: "",
  amount: "",
  product_id: "",
  product_name: "",
  quantity: "",
  rate: "",
  tax: "",
  // tax: ["No Tax", "0", "exclusive"],
  // tax_inclusive: false,
  // unit: "Item",
  // __key: 0,
};

const EditOrderForm = () => {
  const order = useSelector(selectOrder);
  const [discountRate, setDiscountRate] = useState(order.discount[2]);
  const [discountType, setDiscountType] = useState(order.discount[1]);
  const [productItems, setProductItems] = useState([INITIAL_ITEMS_VALUE]);

  // console.log(arr1);
  // console.log(order);

  const {
    organization_name,
    date_and_time,
    order_number,
    delivery_method,
    discount,
    items,
  } = order;

  // for adding product row in form
  const handleAddProduct = () => {
    console.log("add");
    setProductItems([...productItems, { ...INITIAL_ITEMS_VALUE }]);
  };
  // for removing product row in form
  const handleRemoveProduct = (index) => {
    console.log("remove");
    const list = [...productItems];
    list.splice(index, 1);
    setProductItems([...list]);
  };
  // when an input field changes
  const handleProductItemChange = (e, index) => {
    // e.preventDefault();
    console.log("change");

    const { name, value } = e.target;
    const list = [...productItems];
    list[index][name] = value; // edit particular object's particular input(with certain name) of the array
    setProductItems([...list]);
  };
  console.log(productItems); // check change in array of objects

  // on form submit(ie when add product button is clicked)
  // const onFinish = (values: any) => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  // const onFinishFailed = (errorInfo: any) => {
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      //   initialValues={initialProductState}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="on"
      labelAlign="left"
      colon={true} // colon after label
      initialValues={{
        associated_Account: organization_name,
        // order_date: date_and_time,
        order_number,
        delivery_method,
        payment_term: "Due to receipt",
        discount_rate: discountRate,
        discount_type: discountType,
      }}
    >
      <Form.Item
        label="Associated Account"
        name="associated_Account"
        rules={[
          { required: true, message: "Please input your associated name!" },
        ]}
      >
        <Input style={{ border: "none", outline: "none" }} />
      </Form.Item>
      <Form.Item
        label="Order Number"
        name="order_number"
        rules={[
          { required: true, message: "Please input your associated name!" },
        ]}
      >
        <Input style={{ border: "none", outline: "none" }} />
      </Form.Item>
      <Form.Item
        label="Order Date"
        name="order_date"
        rules={[
          { required: true, message: "Please input your associated name!" },
        ]}
      >
        <DatePicker
          defaultValue={moment(date_and_time, dateFormat)}
          format={dateFormat}
        />
      </Form.Item>
      <Form.Item
        label="Expected Delivery"
        name="expected_date"
        rules={[
          { required: true, message: "Please input your associated name!" },
        ]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item label="Delivery Method" name="delivery_method">
        <Select>
          <Select.Option value="Whatever is convenient">
            Whatever is convenient
          </Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Payment Term" name="payment_term">
        <Select>
          <Select.Option value="Due to receipt">Due to receipt</Select.Option>
          <Select.Option value="Custom">Custom</Select.Option>
        </Select>
      </Form.Item>
      <Card>
        <div className="editOrder__product">
          <div>Product</div>
          <div>Quantity</div>
          <div>Rate</div>
          <div>Tax</div>
          <div>Amount</div>
        </div>

        {productItems.map((item, index) => {
          return (
            <div key={index}>
              <Divider />
              <div className="editOrder__product">
                <ProductsSelectDropdown />
                <input
                  value={item.quantity}
                  name="quantity"
                  onChange={(e) => handleProductItemChange(e, index)}
                />
                <input
                  value={item.rate}
                  name="rate"
                  onChange={(e) => handleProductItemChange(e, index)}
                />
                <select
                  value={item.tax}
                  name="tax"
                  onChange={(e) => handleProductItemChange(e, index)}
                >
                  <option value={"13"}>VAT (13%)</option>
                  <option value={"0"}>No Tax (0%)</option>
                </select>
                <input
                  value={item.amount}
                  name="amount"
                  onChange={(e) => handleProductItemChange(e, index)}
                />
                <Button
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemoveProduct(index)}
                ></Button>
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <input
                  value={item.description}
                  name="description"
                  onChange={(e) => handleProductItemChange(e, index)}
                />
              </div>
            </div>
          );
        })}
      </Card>
      <Button icon={<PlusOutlined />} onClick={handleAddProduct}>
        Add new Item
      </Button>
      <Card>
        <div>Sub Total</div>
        <div>Discount (Opional)</div>
        <Form.Item name="discount_rate">
          <Input />
        </Form.Item>
        <Form.Item name="discount_type">
          <Select>
            <Option value="percent">%</Option>
            <Option value="amount">NPR</Option>
          </Select>
        </Form.Item>

        <div>Discount</div>
        <div>Total</div>
        <div>Grand Total</div>
      </Card>
      <Form.Item label="Customer Note" name="description">
        <TextArea rows={4} />
      </Form.Item>{" "}
      <Form.Item label="Terms and Conditions" name="description">
        <TextArea rows={4} />
      </Form.Item>{" "}
      <Form.Item label="Reference ID" name="description">
        <Input />
      </Form.Item>
      <Form.Item label="Subject" name="description">
        <Input />
      </Form.Item>
      <Form.Item>
        <div className="form-btn-container">
          <Button type="primary" danger htmlType="submit">
            Save
          </Button>

          <Button danger>Cancel</Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default EditOrderForm;
