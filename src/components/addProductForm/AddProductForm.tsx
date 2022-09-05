import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Card,
  Form,
  Input,
  Select,
  Radio,
  InputNumber,
  // TreeSelect,
} from "antd";

import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { RadioChangeEvent } from "antd";

import "./addProductForm.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProductAsync,
  getProductsBrandListAsync,
  getProductsCategoriesAsync,
  getProductsUnitAsync,
  getProductsWarehousesAsync,
} from "../../store/product/product.action";
import { useNavigate } from "react-router-dom";

import CategoryTreeSelect from "../categoryTreeSelect/CategoryTreeSelect";
import BrandSelect from "../brandSelect/BrandSelect";

const { TextArea } = Input;
const { Option } = Select;

type TNewProduct = {
  brand: string;
  cost_price: number;
  group: string[];
  product_code: string;
  description: string;
  product_name: string;
  tax_rate: number;
  unit: string;
  unit_price: number;
  in_stock: number;
  reorder_point: number;
  track_inventory: boolean;
  type: string;
  warehouses: string[];
};

const initialProductState = {
  brand: "",
  cost_price: 0,
  group: [],
  product_code: "",
  description: "",
  product_name: "",
  tax_rate: 0,
  unit: "",
  unit_price: 0,
  in_stock: 0,
  reorder_point: 0,
  track_inventory: true,
  type: "product",
  warehouses: [],
};

const AddProductForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const units = useSelector((state: any) => state.product?.units);
  const warehouses = useSelector((state: any) => state.product.warehouses);

  // console.log(units);

  const [newProduct, setNewProduct] =
    useState<TNewProduct>(initialProductState); // for whole new product values
  const [checked, setChecked] = useState(true); // for checkbox
  const [radioSelected, setRadioSelected] = useState("product"); // for radio buttons

  useEffect(() => {
    dispatch<any>(getProductsBrandListAsync());
    dispatch<any>(getProductsUnitAsync());
    dispatch<any>(getProductsCategoriesAsync());
    dispatch<any>(getProductsWarehousesAsync());
  }, [dispatch]);

  // on form submit(ie when add product button is clicked)
  const onFinish = (values: any) => {
    // console.log("Success:", values);

    // change category group array we got as string back to array
    if (values.group && values.group.length) {
      values.group = values.group.split(",");
    }

    // change the quantities for each warehouse to warehouses array of object with corresponding warehouse id, if track inventory is on/checked/true
    if (values.track_inventory) {
      values.warehouses = warehouses.map((warehouse: any, index: number) => {
        // put the quanity values we got to array of warehouse object(with warehouse id and its respestive quantity)
        return {
          warehouse_id: warehouse?._id,
          quantity: values[`quantity${index + 1}`],
        };
      });
    }

    // the current stock should be equal to sum of  all warehouse quantities
    if (values.track_inventory) {
      if (
        Number(values.in_stock) !==
        Number(values.quantity1) +
          Number(values.quantity2) +
          Number(values.quantity3)
      ) {
        return alert("in stock and warehouse quatities dont match");
      }
    }

    // remove warehoues quantitites from form values we are about to post as they are already inside warehouses array
    const { quantity1, quanity2, quantity3, ...newProductValues } = values;
    dispatch<any>(addNewProductAsync(newProductValues));
    setNewProduct(newProductValues); // to rerender the component, we changed a state
    // console.log("new product to add:", newProduct);
  };
  console.log("new product to add:", newProduct);

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  // when radio is changed
  const onRadioChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setRadioSelected(e.target.value);
  };

  // when checkbox is clicked
  const onCheckboxChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
    setChecked(e.target.checked);
  };

  // console.log(categoryArray);
  const handleCancelAddProduct = () => {
    setNewProduct(initialProductState); // reset form fields
    console.log(newProduct);
    navigate(-1);
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={initialProductState}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
        labelAlign="left"
        colon={false} // colon at side of label
      >
        <Form.Item label="Product Type" name="type">
          <Radio.Group
            onChange={onRadioChange}
            defaultValue={radioSelected}
            value={radioSelected}
          >
            <Radio value="product">Goods</Radio>
            <Radio value="service"> Service </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Product Name"
          name="product_name"
          rules={[
            { required: true, message: "Please input your product name!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Product Description" name="description">
          <TextArea rows={4} />
        </Form.Item>

        <CategoryTreeSelect />

        <BrandSelect />

        <Form.Item
          label="Unit"
          name="unit"
          rules={[
            { required: true, message: "Please select unit for your product!" },
          ]}
        >
          <Select>
            <Option value="disabled" disabled>
              Select Unit
            </Option>
            {units.map((unit: any, index: number) => (
              <Option key={index} value={unit}>
                {unit}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Tax" name="tax_rate">
          <Select defaultValue={0}>
            <Option value={13}>VAT(13%)</Option>
            <Option value={0}>No Tax</Option>
          </Select>
        </Form.Item>

        {/* only show this checkbox when goods is selected in radiobutton */}
        {radioSelected === "product" && (
          <Form.Item name="track_inventory" valuePropName="checked" noStyle>
            <Checkbox
              defaultChecked={true}
              checked={checked}
              onChange={onCheckboxChange}
            >
              Track Inventory
            </Checkbox>
          </Form.Item>
        )}

        {/* when chekbox for track inventory is not checked or when it radiobutton has slelected service */}
        {(!checked || radioSelected === "service") && (
          <Card className="nestedForm">
            <Form.Item
              label="Product"
              name="product_name"
              rules={[
                {
                  required: true,
                  message: "Please input your product name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="SKU" name="product_code">
              <Input />
            </Form.Item>

            <Form.Item
              label="Unit Price"
              name="unit_price"
              labelCol={{ span: 16 }}
              rules={[
                {
                  required: true,
                  message: "Please input unit price!",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Cost Price(optional)"
              name="cost_price"
              labelCol={{ span: 16 }}
            >
              <InputNumber type="number" />
            </Form.Item>
          </Card>
        )}

        {/* when chekbox for track inventory is checked */}
        {radioSelected === "product" && checked && (
          <Card className="nestedForm">
            <Form.Item
              label="Product"
              name="product_name"
              rules={[
                {
                  required: true,
                  message: "Please input your product name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="SKU" name="product_code">
              <Input />
            </Form.Item>

            <Form.Item
              label="Unit Price"
              name="unit_price"
              labelCol={{ span: 16 }}
              rules={[
                {
                  required: true,
                  message: "Please input your product name!",
                },
              ]}
            >
              <InputNumber />
            </Form.Item>

            <Form.Item
              label="Cost Price(optional)"
              name="cost_price"
              labelCol={{ span: 16 }}
            >
              <InputNumber />
            </Form.Item>

            <Form.Item
              label="Current Stock"
              name="in_stock"
              labelCol={{ span: 16 }}
            >
              <InputNumber />
            </Form.Item>

            <Form.Item
              label="Re-order Point"
              name="reorder_point"
              labelCol={{ span: 16 }}
            >
              <InputNumber />
            </Form.Item>

            <div className="nestedForm_warehouses">
              <span className="nestedForm_warehouses--text">Quantity</span>
              {warehouses &&
                warehouses.map((warehouse: any, index: number) => {
                  return (
                    <div className="nestedForm_warehouse">
                      <span>{warehouse.name}</span>
                      {/* <h1>{warehouse._id}</h1> */}
                      <Form.Item
                        name={`quantity${index + 1}`}
                        labelCol={{ span: 16 }}
                      >
                        <Input />
                      </Form.Item>
                    </div>
                  );
                })}
            </div>

            {/* <div className="nestedForm_warehouses">
              <span className="nestedForm_warehouses--text">Quantity</span>
              <div className="nestedForm_warehouse">
                <span>Thimi Warehouses</span>
                <Form.Item name="quantity1" labelCol={{ span: 16 }}>
                  <Input placeholder="Basic usage" />
                </Form.Item>
              </div>
              <div className="nestedForm_warehouse">
                <span>Koteshwor Warehouse</span>
                <Form.Item name="quantity2" labelCol={{ span: 16 }}>
                  <Input placeholder="Basic usage" />
                </Form.Item>
              </div>
              <div className="nestedForm_warehouse">
                <span>Default Warehouses</span>
                <Form.Item name="quantity3" labelCol={{ span: 16 }}>
                  <Input placeholder="Basic usage" />
                </Form.Item>
              </div>
            </div> */}
            {/* </Form> */}
          </Card>
        )}

        <Form.Item>
          <div className="form-btn-container">
            <Button type="primary" danger htmlType="submit">
              Add Product(s)
            </Button>

            <Button danger onClick={handleCancelAddProduct}>
              Cancel
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddProductForm;
