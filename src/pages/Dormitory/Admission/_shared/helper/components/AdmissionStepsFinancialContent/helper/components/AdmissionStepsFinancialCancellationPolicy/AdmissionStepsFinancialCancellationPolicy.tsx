import { Col, Form, Row } from "antd";
import { AiOutlineMinus } from "react-icons/ai";

import { CustomButton, CustomInputNumber } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import DynamicFormRows from "@components/Renderers/CustomForm/CustomDynamicFormRows/CustomDynamicFormRows";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { AdmissionStepsFinancialCancellationPolicyProps } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsFinancialContent/helper/components/AdmissionStepsFinancialCancellationPolicy/@types/@admissionStepsFinancialCancellationPolicy";
import AdmissionSwitchAlert from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionSwitchAlert/AdmissionSwitchAlert";

const AdmissionStepsFinancialCancellationPolicy = ({
  form,
  defaultHasCancellationPolicy,
}: AdmissionStepsFinancialCancellationPolicyProps) => {
  const hasCancellationPolicy = Form.useWatch("hasCancellationPolicy", form);

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-4">
      <CustomDivider text="سیاست انصراف از رزرو" />

      <AdmissionSwitchAlert
        question="آیا کاربران امکان انصراف از رزرو پس از تایید درخواست و دریافت وجه را قبل از شروع دوره مجاز اسکان دارند؟"
        valuePropName="hasCancellationPolicy"
        defaultChecked={defaultHasCancellationPolicy}
      />

      {hasCancellationPolicy ? (
        <div className="flex flex-col gap-4">
          <CustomAlert
            type="warning"
            showIcon
            className="border border-dashed! font-medium"
            title="درصد عودت وجه شامل ودیعه نمی‌شود و مبلغ ودیعه به‌صورت کامل به کاربر عودت داده خواهد شد."
          />

          <DynamicFormRows
            name="cancellationRules"
            form={form}
            minRows={1}
            addButtonText="افزودن قانون کنسلی دیگر"
          >
            {(field, remove, canRemove) => (
              <div key={field.key} className="flex items-start gap-4">
                <Row gutter={[16, 16]} className="flex-1">
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <CustomInputNumber
                      name={[field.name, "remainingDays"]}
                      label="مانده به شروع بازه اسکان درخواستی"
                      rules={[REQUIRED_RULE]}
                      suffix="روز"
                      min={0}
                    />
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <CustomInputNumber
                      name={[field.name, "refundPercent"]}
                      label="درصد عودت وجه مبلغ پرداختی"
                      rules={[REQUIRED_RULE]}
                      suffix="٪"
                      min={0}
                      max={100}
                    />
                  </Col>
                </Row>

                {canRemove ? (
                  <CustomButton danger shape="circle" className="mt-8" onClick={remove}>
                    <AiOutlineMinus />
                  </CustomButton>
                ) : null}
              </div>
            )}
          </DynamicFormRows>
        </div>
      ) : null}
    </div>
  );
};

export default AdmissionStepsFinancialCancellationPolicy;
