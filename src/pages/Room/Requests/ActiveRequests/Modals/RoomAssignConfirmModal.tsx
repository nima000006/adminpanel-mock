import { Button, Modal } from "antd";

import { RoomAssignConfirmModalProps } from "./@types/roomAssignConfirmModal";
import CustomDivider from "../../../../../components/Renderers/CustomDivider/CustomDivider";
import "./_roomAssignConfirm.scss";

const RoomAssignConfirmModal = ({
  confirmModal,
  setConfirmModal,
  onClickRejectUser,
}: RoomAssignConfirmModalProps) => {
  return (
    <>
      {confirmModal?.isOpen && (
        <Modal
          title="رد درخواست"
          open={confirmModal?.isOpen}
          footer={null}
          onCancel={() => setConfirmModal({ isOpen: false, key: 0 })}
          className="room-assign-confirm-modal-container"
          centered
        >
          <CustomDivider text="" />
          <p className="content-text">آیا از رد این درخواست مطمئن هستید؟</p>
          <div className="btn-container">
            <Button
              type="primary"
              danger
              className="primary-danger"
              onClick={() => onClickRejectUser(confirmModal?.key)}
            >
              رد
            </Button>
            <Button
              className="primary-cancel"
              onClick={() => setConfirmModal({ isOpen: false, key: 0 })}
            >
              بازگشت
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default RoomAssignConfirmModal;
