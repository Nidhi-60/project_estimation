import { Modal } from "antd";

const CustomModel = (props) => {
  const { visible, handleOk, handleCancel, children } = props;

  return (
    <Modal
      title="Basic Modal"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {children}
    </Modal>
  );
};

export default CustomModel;
