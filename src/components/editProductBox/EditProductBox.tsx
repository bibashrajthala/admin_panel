import React, { useState } from "react";
import { Divider, Modal, Form, Input, Breadcrumb } from "antd";
import { FormOutlined } from "@ant-design/icons";

import "./editProductBox.css";

import CategoryTreeSelect from "../categoryTreeSelect/CategoryTreeSelect";
import BrandSelect from "../brandSelect/BrandSelect";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProductById,
  selectProductEditStatus,
} from "../../store/product/product.selector";
import {
  editProductFeatureByIdAsync,
  getProductByIdAsync,
} from "../../store/product/product.action";

type TProductItem = {
  key: string;
  feature: string;
  value: any;
};

type TProductFeatures = {
  id: string;
} & TProductItem;

const initialProductFeatures = {
  id: "",
  key: "",
  feature: "",
  value: "",
};
// const initialProductFeatureToEdit = {
//   id: "",
//  [feature]:any
// };

const EditProductBox = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false); // for edit modal
  const [productFeatures, setProductFeatures] = useState<TProductFeatures>(
    initialProductFeatures
  );
  // const [productFeatureToEdit, setProductFeatureToEdit] = useState({});
  const product = useSelector(selectProductById);
  // console.log(product);

  // for edit modal
  const showModal = (item: any) => {
    setProductFeatures({ ...item, id: _id });
    setIsModalVisible(true);
  };
  const handleSubmit = async (values: any) => {
    console.log("submit button clicked");
    // console.log(values);
    if (values.group && values.group.length) {
      values.group = values.group.split(",");
    }

    await dispatch<any>(
      editProductFeatureByIdAsync({
        ...values,
        product_id: _id,
      })
    );
    // setProductFeatureToEdit({
    //   ...values,
    //   product_id: _id,
    // }); // so that this component rerenders after this  product is updated as product is not updated in reducer as backend didnot provided updated product
    setIsModalVisible(false);
    await dispatch<any>(getProductByIdAsync(_id)); // so that this component rerenders after this  product is updated as product is not updated in reducer as backend didnot provided updated product
  };
  // console.log(productFeatureToEdit);

  const handleCancel = () => {
    // setproductFeaturetoEdit(initialProductFeatureToEdit);
    setIsModalVisible(false);
  };

  const {
    _id,
    product_name,
    product_code,
    group,
    reorder_point,
    unit,
    unit_price,
    cost_price,
    brand,
    tax_rate,
    tax_type,
  } = product;

  const productItem: TProductItem[] = [
    { key: "Product Name", feature: "product_name", value: product_name },
    { key: "SKU(Product Code)", feature: "product_code", value: product_code },
    { key: "Category", feature: "group", value: group },
    { key: "Reorder Point", feature: "reorder_point", value: reorder_point },
    { key: "Unit", feature: "unit", value: unit },
    { key: "Unit Price", feature: "unit_price", value: unit_price },
    { key: "Cost Price", feature: "cost_price", value: cost_price },
    { key: "Brand", feature: "brand", value: brand },
    { key: "Tax", feature: "tax_rate", value: tax_rate },
    { key: "Tax Type", feature: "tax_type", value: tax_type },
  ];

  const renderModalInput = (productFeatures: TProductFeatures) => {
    switch (productFeatures.key) {
      case "Category":
        return <CategoryTreeSelect />;
      case "Brand":
        return <BrandSelect />;
      default:
        return (
          <Form.Item label={productFeatures.key} name={productFeatures.feature}>
            <Input />
          </Form.Item>
        );
    }
  };

  return (
    <div className="editProductBox">
      <h3 className="editProductBox__heading">Primary Details</h3>
      <Divider />
      <div className="editProductBox__editBoxes">
        {productItem &&
          productItem.map((item, index) => {
            // console.log(item.value);
            return (
              <div className="editProductBox__editBox" key={index}>
                <div className="editBox__field">
                  <span className="editbox__label">{item.key}</span>
                  {item.key === "Category" ? (
                    <Breadcrumb separator=">" style={{ fontSize: "1.1rem" }}>
                      {item.value.map((category: any, index: number) => (
                        <Breadcrumb.Item key={index}>
                          {category.name}
                        </Breadcrumb.Item>
                      ))}
                    </Breadcrumb>
                  ) : (
                    <span className="editbox__value">
                      {item.value || "N/A"}
                    </span>
                  )}
                </div>
                <div
                  className="editbox__editIcon"
                  onClick={() => showModal(item)}
                >
                  <FormOutlined />
                </div>
              </div>
            );
          })}

        <Modal
          title={`Edit ${productFeatures.key}`}
          visible={isModalVisible}
          onOk={form.submit}
          onCancel={handleCancel}
        >
          <Form
            form={form}
            onFinish={handleSubmit}
            initialValues={{
              [productFeatures?.feature]: productFeatures?.value,
            }}
          >
            {renderModalInput(productFeatures)}
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default EditProductBox;
