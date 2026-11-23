import { useEffect } from "react";

import { Form } from "antd";
import { Dayjs } from "dayjs";

import {
  CustomDatePicker,
  CustomInput,
  CustomInputNumber,
} from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomModal from "@components/Renderers/CustomModal/CustomModal";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import {
  AdmissionStepsFinancialCalculateWithDateFormType,
  AdmissionStepsFinancialCalculateWithDateModalProps,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsFinancialContent/helper/components/AdmissionStepsFinancialCalculateWithDateModal/@types/@admissionStepsFinancialCalculateWithDateModal";
import {
  calculateDueDaysFromStayStart,
  getStayRangeAlertTitle,
  isDateOutsideStayRange,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsFinancialContent/helper/util";

const AdmissionStepsFinancialCalculateWithDateModal = ({
  open,
  isMonthly,
  installmentTitle,
  stayDateRange,
  onCancel,
  onConfirm,
}: AdmissionStepsFinancialCalculateWithDateModalProps) => {
  const [form] = Form.useForm<AdmissionStepsFinancialCalculateWithDateFormType>();
  const dueDate = Form.useWatch("dueDate", form);
  const dueDays = Form.useWatch("dueDays", form);

  //? ================================ Effects ================================
  useEffect(() => {
    if (!open) {
      return;
    }

    form.setFieldsValue({
      installmentTitle,
      dueDate: undefined,
      dueDays: undefined,
    });
  }, [form, open, installmentTitle]);

  useEffect(() => {
    if (!open || isMonthly) {
      return;
    }

    form.setFieldValue("dueDays", calculateDueDaysFromStayStart(dueDate, stayDateRange));
  }, [dueDate, form, isMonthly, open, stayDateRange]);

  //* ================================ Util Functions ================================
  const cancelHandler = () => {
    form.resetFields();
    onCancel();
  };

  const confirmHandler = async () => {
    const values = await form.validateFields();
    const calculatedDueDays = calculateDueDaysFromStayStart(
      values.dueDate,
      stayDateRange
    );

    if (calculatedDueDays == null || calculatedDueDays < 0) {
      return;
    }

    onConfirm(calculatedDueDays);
    form.resetFields();
  };

  const disabledDateHandler = (current: Dayjs) =>
    isDateOutsideStayRange(current, stayDateRange);

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomModal
      open={open}
      onCancel={cancelHandler}
      title="محاسبه با تاریخ"
      size="medium"
      variant="form"
      confirmText="اعمال در فیلد"
      cancelText="انصراف"
      onConfirm={confirmHandler}
      hideConfirm={isMonthly}
      hideCancel={isMonthly}
      confirmDisabled={!isMonthly && (dueDays == null || dueDays < 0)}
      destroyOnClose
    >
      {isMonthly ? (
        <CustomAlert
          type="warning"
          showIcon
          className="border border-dashed! font-medium"
          title="در حالت برنامه پذیرش “ماهانه” امکان محاسبه با تاریخ وجود ندارد."
        />
      ) : (
        <Form form={form} className="flex flex-col gap-5" layout="vertical">
          <CustomAlert
            type="info"
            showIcon
            className="border border-dashed! font-medium"
            title={getStayRangeAlertTitle(stayDateRange)}
          />

          <CustomInput name="installmentTitle" label="شماره قسط" disabled />

          <CustomDatePicker
            name="dueDate"
            label="تاریخ سررسید"
            placeholder="تاریخ"
            rules={[REQUIRED_RULE]}
            disabledDate={disabledDateHandler}
          />

          <CustomInputNumber
            name="dueDays"
            label="زمان سررسید ( پس از شروع بازه اسکان درخواستی)"
            suffix="روز"
            disabled
            placeholder="-"
            min={0}
          />
        </Form>
      )}
    </CustomModal>
  );
};

export default AdmissionStepsFinancialCalculateWithDateModal;
