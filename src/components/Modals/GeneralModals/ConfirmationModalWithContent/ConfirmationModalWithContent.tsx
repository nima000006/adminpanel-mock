import React from "react";

import { Modal } from "antd";
import { AiOutlineExclamationCircle } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import SubmitButton from "@components/CustomInputs/SubmitButton/SubmitButton";

import { ConfirmationModalWithContentProps } from "./@type/@confirmationModalWithContent";
import "./_confirmationModalWithContent.scss";

const ConfirmationModalWithContent: React.FC<ConfirmationModalWithContentProps> = ({
  isModalOpen,
  onConfirmClickHandler,
  closeModalHandler,
  title,
  confirmBtnText = "تایید",
  backBtnText = "بازگشت",
  isDangerous = false,
  backBtnDanger = false,
  isConfirmButtonDisable,
  content,
  customClass,
  width = 500,
  htmlType = "submit",
  isConfirmButtonLoading,
  centered = true,
  titleIcon,
  showIcon = true,
  hasNavigatorButton = true,
  iconType = "alert",
  isFormSensitive = false,
  hasCustomActionBar = false,
  customActionBar,
  form,

  onBackBtnHandler,
}: ConfirmationModalWithContentProps) => {
  if (!isModalOpen) return;
  return (
    <Modal
      title={
        showIcon ? (
          <div className="title-with-icon">
            {iconType === "alert" ? (
              <AiOutlineExclamationCircle className="title-icon" />
            ) : (
              titleIcon
            )}
            <span>{title}</span>
          </div>
        ) : (
          title
        )
      }
      open={isModalOpen}
      onCancel={() => closeModalHandler()}
      footer={null}
      width={width}
      className={`confirmation-modal-with-content-container ${customClass}`}
      centered={centered}
    >
      {content && <div className="modal-body-container">{content}</div>}
      {hasCustomActionBar && customActionBar && <>{customActionBar}</>}
      {hasNavigatorButton && (
        <div className="modal-btn-container">
          {backBtnText?.length > 0 ? (
            <CustomButton
              className="modal-btn"
              danger={backBtnDanger}
              onClick={() => {
                if (onBackBtnHandler) {
                  onBackBtnHandler();
                } else {
                  closeModalHandler();
                }
              }}
            >
              {backBtnText}
            </CustomButton>
          ) : null}
          {isFormSensitive && form ? (
            <SubmitButton
              label={confirmBtnText}
              form={form}
              danger={isDangerous}
              onClick={() => onConfirmClickHandler?.()}
              loading={isConfirmButtonLoading}
              type="primary"
              className="modal-btn"
            />
          ) : (
            <CustomButton
              type="primary"
              className="modal-btn"
              danger={isDangerous}
              onClick={() => onConfirmClickHandler?.()}
              loading={isConfirmButtonLoading}
              htmlType={htmlType}
              disabled={isConfirmButtonDisable}
            >
              {confirmBtnText}
            </CustomButton>
          )}
        </div>
      )}
    </Modal>
  );
};
export default ConfirmationModalWithContent;
