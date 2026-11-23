import { useEffect } from "react";

import { Form } from "antd";

import { CustomInputNumber } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomModal from "@components/Renderers/CustomModal/CustomModal";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { RENEWAL_FINANCIAL_SETTING } from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";
import AdmissionRadioCard from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionRadioCard/AdmissionRadioCard";
import {
  AdmissionStepsSettingsFinancialFormType,
  AdmissionStepsSettingsFinancialModalProps,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSettingsContent/@types/@admissionStepsSettingsContent";
import {
  getFinancialModalAlertMessage,
  RENEWAL_FINANCIAL_SETTING_OPTIONS,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSettingsContent/helper/util";

const AdmissionStepsSettingsFinancialModal = ({
  open,
  record,
  currentProgramTitle,
  onCancel,
  onConfirm,
}: AdmissionStepsSettingsFinancialModalProps) => {
  const [form] = Form.useForm<AdmissionStepsSettingsFinancialFormType>();

  //? ================================ Effects ================================
  useEffect(() => {
    if (!open || !record) {
      return;
    }

    form.setFieldsValue({
      financialSettingType: record.financialSettingType,
      warehousingFee: record.warehousingFee,
      extraStayDailyPercent: record.extraStayDailyPercent,
    });
  }, [form, open, record]);

  //* ================================ Util Functions ================================
  const cancelHandler = () => {
    form.resetFields();
    onCancel();
  };

  const confirmHandler = async () => {
    const values = await form.validateFields();
    onConfirm(values);
    form.resetFields();
  };

  const renderAfterOption = (option: { value: string | number }, selected: boolean) => {
    if (!selected) {
      return null;
    }

    if (option.value === RENEWAL_FINANCIAL_SETTING.warehousing) {
      return (
        <CustomInputNumber
          name="warehousingFee"
          label="هزینه انبارداری"
          isPrice
          suffix="ریال"
          placeholder="مثلا 4,000,000"
          rules={[REQUIRED_RULE]}
          min={0}
        />
      );
    }

    if (option.value === RENEWAL_FINANCIAL_SETTING.extraStay) {
      return (
        <CustomInputNumber
          name="extraStayDailyPercent"
          label="هزینه روزانه اقامت مازاد"
          tooltip="درصد هزینه روزانه اقامت مازاد نسبت به مبلغ اسکان روزانه"
          suffix="٪"
          placeholder="مثلا 100"
          rules={[REQUIRED_RULE]}
          min={0}
          max={100}
        />
      );
    }

    return null;
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomModal
      open={open}
      onCancel={cancelHandler}
      title="ویرایش تنظیمات مالی"
      size="medium"
      variant="form"
      confirmText="ثبت تنظیمات مالی"
      cancelText="انصراف"
      onConfirm={confirmHandler}
      destroyOnClose
    >
      {record ? (
        <Form form={form} className="flex flex-col gap-5" layout="vertical">
          <CustomAlert
            showIcon
            className="border border-dashed! font-medium"
            title={getFinancialModalAlertMessage(record, currentProgramTitle)}
          />

          <AdmissionRadioCard
            form={form}
            name="financialSettingType"
            rules={[REQUIRED_RULE]}
            direction="vertical"
            options={RENEWAL_FINANCIAL_SETTING_OPTIONS}
            renderAfterOption={renderAfterOption}
          />
        </Form>
      ) : null}
    </CustomModal>
  );
};

export default AdmissionStepsSettingsFinancialModal;
