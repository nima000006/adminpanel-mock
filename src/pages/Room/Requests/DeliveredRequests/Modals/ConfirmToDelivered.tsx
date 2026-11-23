import React from "react";

import { Button, Modal } from "antd";

import CustomDivider from "../../../../../components/Renderers/CustomDivider/CustomDivider";
import "./confirmToDelivered.scss";

type RoomAssignConfirmModalProps = {
  confirmModal: {
    isOpen: boolean;
    key: number;
  };
  setConfirmModal: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      key: number;
    }>
  >;
  onClickDelivered: (id: number) => void;
};
const ConfirmToDeliveredModal = ({
  confirmModal,
  setConfirmModal,
  onClickDelivered,
}: RoomAssignConfirmModalProps) => {
  return (
    <>
      {confirmModal?.isOpen && (
        <Modal
          title="تحویل درخواست"
          open={confirmModal?.isOpen}
          footer={null}
          onCancel={() => setConfirmModal({ isOpen: false, key: 0 })}
          className="room-delivered-modal-container-request"
        >
          <CustomDivider text="" />
          <p className="content-text">آیا از تحویل این درخواست مطمئن هستید؟</p>
          <div className="btn-container">
            <Button
              type="primary"
              className="primary-danger"
              onClick={() => onClickDelivered(confirmModal?.key)}
            >
              تحویل داده شد
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

export default ConfirmToDeliveredModal;
