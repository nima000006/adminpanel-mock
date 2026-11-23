import { Button, Modal } from "antd";

import { AdvancedFilterProps } from "./@types/@advancedFilter";
import "./_advancedFilter.scss";
const AdvancedFilter = ({
  isModalOpen,
  onConfirmClickHandler,
  closeModalHandler,
  title = "جستجوی پیشرفته",
  confirmBtnText = "تائید",
  backBtnText = "بازگشت",
  isDangerous = false,
  isConfirmButtonDisable,
  content,
  customClass,
  width = 1000,
  htmlType = "submit",
  isConfirmButtonLoading,
  centered = true,
  titleIcon,
}: AdvancedFilterProps) => {
  if (!isModalOpen) return;
  return (
    <Modal
      title={
        titleIcon ? (
          <div className="title-with-icon">
            {titleIcon}
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
      className={`advanced-filter-modal-content-container ${customClass}`}
      centered={centered}
    >
      <div className="modal-body-container">{content}</div>
      <div className="modal-btn-container">
        <Button
          type="primary"
          className="modal-btn"
          danger={isDangerous}
          onClick={() => onConfirmClickHandler()}
          loading={isConfirmButtonLoading}
          htmlType={htmlType}
          disabled={isConfirmButtonDisable}
        >
          {confirmBtnText}
        </Button>
        <Button className="modal-btn" onClick={() => closeModalHandler()}>
          {backBtnText}
        </Button>
      </div>
    </Modal>
  );
};
export default AdvancedFilter;
