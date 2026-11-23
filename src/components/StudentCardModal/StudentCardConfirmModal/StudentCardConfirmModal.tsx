import { Button, Modal } from "antd";
import { AiOutlineExclamationCircle } from "react-icons/ai";

import { GOLD_6 } from "@infra/VARS/globalColors/globalColors";

import { StudentCardConfirmModalProps } from "./@types/@studentCardConfirmModal";
import "./_studentCardConfirmModal.scss";

const StudentCardConfirmModal = ({
  isCloseRequestModalOpen,
  setIsCloseRequestModalOpen,
  onAdminModalConfirmHandler,
  isUpdateStudentCardStatusLoading,
  setAdminActionModal,
}: StudentCardConfirmModalProps) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isCloseRequestModalOpen && (
        <Modal
          centered
          open={isCloseRequestModalOpen}
          onOk={() => setIsCloseRequestModalOpen(false)}
          onCancel={() => setIsCloseRequestModalOpen(false)}
          // width={1000}
          className="close-request-card-modal"
          footer={null}
        >
          <div className="close-request-btn-modal-container">
            <div className="modal-text-container">
              <span className="modal-text-label">
                آیا از بستن این درخواست مطمئن هستید؟
              </span>
              <span className="modal-text-icon">
                <AiOutlineExclamationCircle style={{ color: GOLD_6 }} />
              </span>
            </div>
            <div className="btn-container">
              <Button
                type="primary"
                onClick={() => {
                  onAdminModalConfirmHandler({ isClosingRequest: true });
                  setIsCloseRequestModalOpen(false);
                }}
                loading={isUpdateStudentCardStatusLoading}
                danger
              >
                بستن درخواست
              </Button>
              <Button
                type="default"
                onClick={() => {
                  setAdminActionModal({ isModalOpen: false });
                  setIsCloseRequestModalOpen(false);
                }}
              >
                بازگشت
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default StudentCardConfirmModal;
