import React from "react";
import { Select, Form } from "antd";
import { useSelector } from "react-redux";

const { Option } = Select;

const BrandSelect = () => {
  const brandList = useSelector((state: any) => state.product?.brandList);

  return (
    <Form.Item label="Brand" name="brand">
      <Select>
        <Option value="disabled" disabled>
          Select Brand
        </Option>
        {brandList.map((brand: any, index: number) => (
          <Option key={index} value={brand}>
            {brand}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default BrandSelect;
