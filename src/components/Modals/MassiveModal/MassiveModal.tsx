import { Modal } from "antd";

import { MassiveModalProps } from "./@types/@massiveModal";

const MassiveModal = ({
  children,
  isModalOpen,
  closeModalHandler,
  title,
}: MassiveModalProps) => {
  return (
    <Modal
      title={title}
      centered
      open={isModalOpen}
      onOk={() => closeModalHandler()}
      onCancel={() => closeModalHandler()}
      width={1000}
      //   className="student-card-modal"
      footer={null}
    >
      <>{children}</>
    </Modal>
  );
};

export default MassiveModal;
