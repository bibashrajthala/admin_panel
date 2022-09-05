import React, { useState, useEffect } from "react";
import {
  Divider,
  Button,
  Modal,
  Form,
  Card,
  Drawer,
  Space,
  Input,
  InputNumber,
  Select,
} from "antd";
import { WarningOutlined } from "@ant-design/icons";
import { IoTicketOutline } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";
import {
  selectProductById,
  selectProductsWarehouseInfo,
  selectProductsWarehouses,
  //   selectProductEditStatus,
  selectProductsWarehousesAndStocks,
} from "../../store/product/product.selector";
import {
  editProductTrackInventoryAsync,
  //   editProductFeatureByIdAsync,
  getProductByIdAsync,
  getProductsWarehouseInfoAsync,
  getProductsWarehousesAndStocksAsync,
} from "../../store/product/product.action";
import { useParams } from "react-router-dom";

type Props = {};

const EditInventoryDetailsBox = (props: Props) => {
  const { id } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false); // for edit modal
  const [isDrawerVisible, setIsDrawerVisible] = useState(false); // for drawer

  const dispatch = useDispatch();
  const product = useSelector(selectProductById);
  const warehousesAndStocks = useSelector(selectProductsWarehousesAndStocks);
  const warehouses = useSelector(selectProductsWarehouses);
  const warehouseInfo = useSelector(selectProductsWarehouseInfo);
  const { _id, product_name, track_inventory, in_stock, reorder_point } =
    product;
  const [isInventoryTracked, setisInventoryTracked] = useState(track_inventory);

  //   console.log(product_name, track_inventory, in_stock, reorder_point);

  // console.log(warehousesAndStocks);

  useEffect(() => {
    dispatch<any>(getProductsWarehousesAndStocksAsync(id));
  }, [id]);

  const [form] = Form.useForm();
  const { Option } = Select;

  // for drawer
  const showDrawer = () => {
    setIsDrawerVisible(true);
  };
  const onClose = () => {
    setIsDrawerVisible(false);
  };

  // for edit modal
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleSubmit = async (values: any) => {
    console.log("submit button clicked");
    console.log(values);

    await dispatch<any>(
      editProductTrackInventoryAsync({
        product_id: _id,
        current_stock: values.in_stock,
      })
    );
    setisInventoryTracked(true);
    await dispatch<any>(getProductByIdAsync(_id)); // so that this component rerenders after this  product is updated as product is not updated in reducer as backend didnot provided updated product
    setIsModalVisible(false);
  };
  // console.log(editedDescription);
  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const onSelectChange = (value: string) => {
    dispatch<any>(getProductsWarehouseInfoAsync(id, value));
  };

  const initialValue = {
    product_name: product_name,
    in_stock: warehouseInfo && warehouseInfo.in_stock,
    quantity_adjustment: 0,
    new_stock: warehouseInfo && warehouseInfo.in_stock,
  };

  return (
    <>
      {!isInventoryTracked ? (
        <div className="editPage__inventoryDetailsBox">
          <h3 className="inventoryDetailsBox__heading">Inventory Details</h3>
          <Divider />

          <div className="inventoryDetailsBox__enableCard">
            <span className="inventoryDetailsBox__enableCard-icon">
              <WarningOutlined />
            </span>
            <span className="inventoryDetailsBox__enableCard-text">
              Inventory Tracking is disabled for this product. You can enable it
              by clicking the button below:
            </span>
            <Button type="primary" danger onClick={showModal}>
              Enable Inventory Tracking
            </Button>
            <Modal
              title={`Start Inventory Tracking`}
              visible={isModalVisible}
              onOk={form.submit}
              onCancel={handleCancel}
            >
              <Form
                form={form}
                onFinish={handleSubmit}
                initialValues={{ in_stock: in_stock }}
              >
                <Form.Item label="Current Stock" name="in_stock">
                  <InputNumber />
                </Form.Item>
                <span>
                  This stock amount will be available on your primary warehouse.
                  i.e Default Warehouse
                </span>
              </Form>
            </Modal>
          </div>

          <h3 className="inventoryDetailsBox__heading">Other Variants</h3>
          <Divider />

          <div className="inventoryDetailsBox__info">
            <h4 className="inventoryDetailsBox__info-productName">
              {product_name}
            </h4>
            <p className="inventoryDetailsBox__info-productStock">
              Available Stock: {in_stock}
            </p>
          </div>
        </div>
      ) : (
        <div className="editPage__inventoryDetailsBox">
          <div className="inventoryDetailsBox__header">
            <h3 className="inventoryDetailsBox__heading">Inventory Details</h3>
            <Button type="primary" danger onClick={showDrawer}>
              Adjust Stock
            </Button>
            <Drawer
              title="Adjust Stock"
              width={720}
              onClose={onClose}
              visible={isDrawerVisible}
              bodyStyle={{ paddingBottom: 80 }}
              extra={
                <Space>
                  <Button onClick={onClose}>Cancel</Button>
                  <Button onClick={onClose} type="primary">
                    Submit
                  </Button>
                </Space>
              }
            >
              <Form
                layout="vertical"
                hideRequiredMark
                initialValues={initialValue}
              >
                <Form.Item name="warehouse_id" label="Warehouse">
                  <Select
                    placeholder="Select Warehouse"
                    onChange={onSelectChange}
                  >
                    {warehouses &&
                      warehouses.map((warehouse: any) => (
                        <Option value={warehouse._id} key={warehouse._id}>
                          {warehouse.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>

                <Card>
                  <Form.Item
                    name="product_name"
                    label="Product Name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter product name",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item name="in_stock" label="Current Stock">
                    <InputNumber
                      value={warehouseInfo && warehouseInfo.in_stock}
                    />
                  </Form.Item>
                  <Form.Item name="quantity_adjusted" label="Adjustment">
                    <InputNumber />
                  </Form.Item>

                  <Form.Item label="New Stock">
                    <InputNumber />
                  </Form.Item>
                </Card>

                <Form.Item
                  name="adjustment_reason"
                  label="Adjustment Reason"
                  rules={[
                    {
                      required: true,
                      message:
                        "please enter atleast 6 character long adjustment reason",
                    },
                  ]}
                >
                  <Input.TextArea rows={6} />
                </Form.Item>
              </Form>
            </Drawer>
          </div>
          <Divider />

          <div className="inventoryDetailsBox__cards">
            <div className="inventoryDetailsBox__cards-card">
              <IoTicketOutline />
              <p>Available Stock</p>
              <p>{in_stock}</p>
            </div>
            <div className="inventoryDetailsBox__cards-card">
              <IoTicketOutline />
              <p>Reorder Point</p>
              <p>{reorder_point || 0}</p>
            </div>
          </div>

          <Card size="small" style={{ width: 300 }}>
            <h3 className="inventoryDetailsBox__heading">
              Stock at Warehouses
            </h3>
            <Divider />

            {warehousesAndStocks &&
              warehousesAndStocks.map((warehouseAndStock: any) => (
                <div
                  className="inventoryBox__warehouse"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span className="inventoryBox__warehouse-name">
                    {warehouseAndStock?.warehouse_id?.name}
                  </span>
                  <span className="inventoryBox__warehouse-quantity">
                    {warehouseAndStock.in_stock}
                  </span>
                </div>
              ))}
          </Card>

          <div className="inventoryDetailsBox__info">
            <h4 className="inventoryDetailsBox__info-productName">
              {product_name}
            </h4>
            <p className="inventoryDetailsBox__info-productStock">
              Available Stock: {in_stock}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default EditInventoryDetailsBox;
