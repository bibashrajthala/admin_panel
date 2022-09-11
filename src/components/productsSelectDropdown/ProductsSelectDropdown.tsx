import React from "react";
import { Form, Select } from "antd";
import { useSelector } from "react-redux";
import { selectAllProductsList } from "../../store/product/product.selector";

const { Option } = Select;

const ProductsSelectDropdown = () => {
  const productsList = useSelector(selectAllProductsList);
  return (
    <Form.Item name="product_name">
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option!.children as unknown as string).includes(input)
        }
        filterSort={(optionA, optionB) =>
          (optionA!.children as unknown as string)
            .toLowerCase()
            .localeCompare(
              (optionB!.children as unknown as string).toLowerCase()
            )
        }
      >
        {productsList.map((product: any) => (
          <Option key={product._id} value={product.product_name}>
            {product.product_name}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default ProductsSelectDropdown;
