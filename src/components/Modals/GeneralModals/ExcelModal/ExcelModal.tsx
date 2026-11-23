import { useState } from "react";

import { CheckboxOptionType, Form, Modal } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomCheckboxGroup from "@components/CustomInputs/CustomCheckboxGroup/CustomCheckboxGroup";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";

import { ExcelModalProps } from "./@types/@excelModal";
import "./_excelModal.scss";

const checkBoxOptions: CheckboxOptionType[] = [
  { id: "1", label: "خروجی اکسل تمامی اطلاعات", value: "all" },
];

const ExcelModal = ({
  isModalOpen,
  onExcelSubmit,
  closeModalHandler,
  title = "خروجی اکسل",
  confirmBtnText = "دریافت خروجی اکسل",
  isDangerous = false,
  isConfirmButtonDisable = false,
  customClass,
  width = 500,
  htmlType = "submit",
  form,
  isConfirmButtonLoading,
  centered = true,
  titleIcon,
  inputLabel = "تعداد رکورد‌ ",
}: ExcelModalProps) => {
  const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState(true);
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  Form.useWatch(({ count, totalItems }) => {
    if (totalItems?.includes("all")) {
      setIsInputDisabled(true);
    } else {
      setIsInputDisabled(false);
    }
    if ((!count || count === "0") && !totalItems?.includes("all")) {
      setIsSubmitBtnDisabled(true);
    } else {
      setIsSubmitBtnDisabled(false);
    }
  }, form);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    isModalOpen && (
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
        className={`excel-modal-main-container ${customClass}`}
        centered={centered}
      >
        <Form className="main-content" form={form} onFinish={onExcelSubmit}>
          <CustomCheckboxGroup
            name="totalItems"
            //   defaultValue={[false]}
            options={checkBoxOptions}
            containerClassName="custom-excel-checkbox"
          />
          <CustomInput
            name="count"
            label={inputLabel}
            className="custom-input-excel"
            placeholder="تعداد داده های خروجی"
            disabled={isInputDisabled}
          />
          <CustomButton
            danger={isDangerous}
            htmlType={htmlType}
            loading={isConfirmButtonLoading || isConfirmButtonDisable}
            disabled={isSubmitBtnDisabled}
            //   onClick={onConfirmClickHandler}
            type="primary"
            className="submit-btn"
          >
            {confirmBtnText}
          </CustomButton>
        </Form>
      </Modal>
    )
  );
};

export default ExcelModal;
