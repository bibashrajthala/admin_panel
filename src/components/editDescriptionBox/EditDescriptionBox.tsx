import React, { useState } from "react";
import { Divider, Button, Modal, Form, Input } from "antd";
import { FormOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProductById,
  selectProductEditStatus,
} from "../../store/product/product.selector";
import {
  editProductFeatureByIdAsync,
  getProductByIdAsync,
} from "../../store/product/product.action";

import "./editDescriptionBox.css";

const { TextArea } = Input;

// type TDescription = {
//   product_id: string;
//   description: string;
// };

// const initialDescription = {
//   product_id: "",
//   description: "",
// };

const EditDescriptionBox = () => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false); // for edit modal
  // const [editedDescription, setEditedDescription] =
  //   useState<TDescription>(initialDescription);
  const [form] = Form.useForm();

  const product = useSelector(selectProductById);
  // console.log(product);
  const { description, _id } = product;

  // for edit modal
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleSubmit = async (values: any) => {
    console.log("submit button clicked");
    console.log(values);
    // setEditedDescription({
    //   product_id: _id,
    //   description: values.description,
    // });
    await dispatch<any>(
      editProductFeatureByIdAsync({
        product_id: _id,
        description: values.description,
      })
    );
    await dispatch<any>(getProductByIdAsync(_id)); // so that this component rerenders after this  product is updated as product is not updated in reducer as backend didnot provided updated product
    setIsModalVisible(false);
  };
  // console.log(editedDescription);
  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  return (
    <div className="editDescriptionBox">
      <div className="editDescriptionBox__header">
        <h3 className="editDescriptionBox__heading">Description:</h3>
        <Button
          icon={<FormOutlined />}
          className="editDescriptionBox__editBtn"
          onClick={showModal}
        >
          Edit
        </Button>
        <Modal
          title={`Edit Description`}
          visible={isModalVisible}
          onOk={form.submit}
          onCancel={handleCancel}
        >
          <Form
            form={form}
            onFinish={handleSubmit}
            initialValues={{ description: description }}
          >
            <Form.Item label="Product Description" name="description">
              <TextArea rows={6} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <Divider />
      <div className="editDescriptionBox__description">
        {description || "--No Description--"}
      </div>
    </div>
  );
};

export default EditDescriptionBox;
