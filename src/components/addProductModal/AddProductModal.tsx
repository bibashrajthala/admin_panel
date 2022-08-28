import { Modal } from "antd";

type TAddProductModalProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddProductModal = ({ visible, setVisible }: TAddProductModalProps) => {
  return (
    <>
      <Modal
        title="Form to add product will be here"
        centered
        visible={visible}
        onOk={() => {
          // add product when ok button is clicked
          setVisible(false);
        }}
        onCancel={() => setVisible(false)}
        width={800}
        okType="danger"
        okText="Add Product"
      >
        <h3>Form to add product will be here</h3>
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  );
};

export default AddProductModal;
