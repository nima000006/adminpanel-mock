import { Button, Modal } from "antd";
import { AiOutlineExclamationCircle } from "react-icons/ai";

import { GOLD_6 } from "@infra/VARS/globalColors/globalColors";
import "./confirmModal.scss";

type ConfirmModalProps = {
  children: React.ReactNode;
  isModalOpen: boolean;
  closeModalHandler: () => void;
  title?: string;
  hasConfirmBtn?: boolean;
  onConfirmClickHandler?: any;
  onCancelClickHandler?: React.MouseEventHandler<HTMLElement>;
  service: string;
  from: number;
};
const ConfirmModal = ({
  children,
  isModalOpen,
  closeModalHandler,
  title,
  hasConfirmBtn,
  service,
  from,
  onConfirmClickHandler,
  onCancelClickHandler,
}: ConfirmModalProps) => {
  return (
    <>
      {isModalOpen && (
        <Modal
          title={title}
          centered
          open={isModalOpen}
          onOk={() => closeModalHandler()}
          onCancel={() => closeModalHandler()}
          //   width={1000}
          //   className="student-card-modal"
          footer={null}
        >
          <>
            <div className="confirm-main-text-container">
              <div className="confirm-main-text">{children}</div>
              <div>
                <AiOutlineExclamationCircle style={{ color: GOLD_6 }} />
              </div>
            </div>
            {hasConfirmBtn && (
              <div className="confirm-btns-container">
                <Button
                  type="primary"
                  onClick={() => onConfirmClickHandler?.(service, from)}
                >
                  تایید
                </Button>
                <Button onClick={onCancelClickHandler}>بازگشت</Button>
              </div>
            )}
          </>
        </Modal>
      )}
    </>
  );
};

export default ConfirmModal;
