import { useEffect } from "react";

import { Form } from "antd";

import { CustomInputNumber } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomModal from "@components/Renderers/CustomModal/CustomModal";
import { RENEWAL_FINANCIAL_SETTING } from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";
import { AdmissionDetailSettingsFinancialModalProps } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailSettingsContent/@types/@admissionDetailSettingsContent";
import { ViewFinancialFormType } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailSettingsContent/helper/components/AdmissionDetailSettingsFinancialModal/@types/@admissionDetailSettingsFinancialModal";
import { getViewFinancialModalAlertMessage } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailSettingsContent/helper/util";
import AdmissionRadioCard from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionRadioCard/AdmissionRadioCard";
import { RENEWAL_FINANCIAL_SETTING_OPTIONS } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSettingsContent/helper/util";

const AdmissionDetailSettingsFinancialModal = ({
  open,
  record,
  currentProgramTitle,
  onCancel,
}: AdmissionDetailSettingsFinancialModalProps) => {
  const [form] = Form.useForm<ViewFinancialFormType>();

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

  // Readonly view: keep only the selected financial setting enabled so other options cannot be chosen.
  const readonlyOptions = RENEWAL_FINANCIAL_SETTING_OPTIONS.map((option) => {
    const isSelected = option.value === record?.financialSettingType;

    return {
      ...option,
      disabled: !isSelected,
      description: (
        <span className={isSelected ? "text-neutral-8" : "text-neutral-5"}>
          {option.description}
        </span>
      ),
    };
  });

  const renderAfterOption = (option: { value: string | number }, selected: boolean) => {
    if (!selected || !record) {
      return null;
    }

    if (option.value === RENEWAL_FINANCIAL_SETTING.warehousing) {
      return (
        <CustomInputNumber
          name="warehousingFee"
          label="هزینه انبارداری"
          isPrice
          suffix="ریال"
          disabled
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
          disabled
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
      title="مشاهده تنظیمات مالی"
      size="medium"
      footer={null}
      destroyOnClose
    >
      {record ? (
        <Form form={form} className="flex flex-col gap-5" layout="vertical">
          <CustomAlert
            showIcon
            className="border border-dashed! font-medium"
            title={getViewFinancialModalAlertMessage(record, currentProgramTitle)}
          />

          <AdmissionRadioCard
            form={form}
            name="financialSettingType"
            direction="vertical"
            options={readonlyOptions}
            renderAfterOption={renderAfterOption}
          />
        </Form>
      ) : null}
    </CustomModal>
  );
};

export default AdmissionDetailSettingsFinancialModal;
