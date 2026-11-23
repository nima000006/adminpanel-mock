import { Button, Modal } from "antd";
import { AiOutlineExclamationCircle } from "react-icons/ai";

import { ConfirmationModalProps } from "./@types/@confirmationModal";

import "./_confirmationModal.scss";
import { GOLD_6 } from "@infra/VARS/globalColors/globalColors";
import { FONTSIZE_25 } from "@infra/VARS/globalStyles/globalStyles";

const ConfirmationModal = ({
  msg,
  title,
  isModalOpen,
  closeModalHandler,
  onConfirmClickHandler,
}: ConfirmationModalProps) => {
  return (
    <>
      {isModalOpen && (
        <Modal
          title={title}
          centered
          open={isModalOpen}
          onCancel={() => closeModalHandler()}
          footer={null}
          className="confirmation-modal-container"
        >
          <>
            <div className="confirm-main-text-container">
              <div className="confirm-main-text">{msg}</div>
              <div>
                <AiOutlineExclamationCircle
                  style={{ color: GOLD_6, fontSize: FONTSIZE_25 }}
                />
              </div>
            </div>
            <div className="confirm-btns-container">
              <Button type="primary" onClick={() => onConfirmClickHandler()}>
                تایید
              </Button>
              <Button onClick={() => closeModalHandler()}>بازگشت</Button>
            </div>
          </>
        </Modal>
      )}
    </>
  );
};

export default ConfirmationModal;
