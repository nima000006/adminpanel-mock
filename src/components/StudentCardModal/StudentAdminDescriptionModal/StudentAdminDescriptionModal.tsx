import { Button, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";

import { StudentAdminDescriptionModalProps } from "./@types/@studentAdminDescriptionModal";
import CustomDivider from "../../Renderers/CustomDivider/CustomDivider";
import "./_studentAdminDescriptionModal.scss";

const StudentAdminDescriptionModal = ({
  adminActionModal,
  setAdminActionModal,
  isUpdateStudentCardStatusLoading,
  onAdminModalConfirmHandler,
  onTextAreaChangeHandler,
}: StudentAdminDescriptionModalProps) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {adminActionModal?.isModalOpen && (
        <Modal
          title={adminActionModal?.title}
          centered
          open={adminActionModal.isModalOpen}
          onOk={() => setAdminActionModal({ isModalOpen: false })}
          onCancel={() => setAdminActionModal({ isModalOpen: false })}
          footer={null}
          className="admin-confirm-modal-container"
        >
          <div>
            <CustomDivider text="" />
            <p className="admin-confirm-label">توضیحات</p>
            <TextArea
              rows={4}
              placeholder="دلیل وضعیت را کامل شرح دهید
"
              className="text-area"
              maxLength={120}
              onChange={onTextAreaChangeHandler}
            />
            <div className="actions-btns-container">
              <Button
                type="primary"
                onClick={() => onAdminModalConfirmHandler({ isClosingRequest: false })}
                loading={isUpdateStudentCardStatusLoading}
              >
                {adminActionModal.title}
              </Button>
              <Button
                type="default"
                onClick={() => setAdminActionModal({ isModalOpen: false })}
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

export default StudentAdminDescriptionModal;
