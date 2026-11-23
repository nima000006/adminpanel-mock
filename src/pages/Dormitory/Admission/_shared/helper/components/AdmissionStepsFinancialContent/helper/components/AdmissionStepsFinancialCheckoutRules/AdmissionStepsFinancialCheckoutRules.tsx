import { Col, Form, Row } from "antd";

import { CustomInputNumber } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import AdmissionRadioCard from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionRadioCard/AdmissionRadioCard";
import { CHECKOUT_MODE } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsFinancialContent/@types/@admissionStepsFinancialContent";
import { AdmissionStepsFinancialCheckoutRulesProps } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsFinancialContent/helper/components/AdmissionStepsFinancialCheckoutRules/@types/@admissionStepsFinancialCheckoutRules";
import {
  EARLY_CHECKOUT_MODE_OPTIONS,
  LATE_CHECKOUT_MODE_OPTIONS,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsFinancialContent/helper/util";
import AdmissionSwitchAlert from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionSwitchAlert/AdmissionSwitchAlert";

const AdmissionStepsFinancialCheckoutRules = ({
  form,
  defaultHasEarlyCheckoutRules,
  defaultHasLateCheckoutPenalty,
}: AdmissionStepsFinancialCheckoutRulesProps) => {
  const hasEarlyCheckoutRules = Form.useWatch("hasEarlyCheckoutRules", form);
  const earlyCheckoutMode = Form.useWatch("earlyCheckoutMode", form);
  const hasLateCheckoutPenalty = Form.useWatch("hasLateCheckoutPenalty", form);
  const lateCheckoutMode = Form.useWatch("lateCheckoutMode", form);

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-4">
      <CustomDivider text="قوانین مالی تخلیه" />

      <p className="text-neutral-10 text-sm">
        این تنظیمات نحوه محاسبه بازپرداخت وجه بابت روزهای اسکان استفاده‌نشده و جریمه تخلیه
        دیرهنگام (اسکان مازاد) را مشخص می‌کند.
      </p>

      <div className="flex flex-col gap-4">
        <AdmissionSwitchAlert
          question="آیا قوانین مالی برای تخلیه زودهنگام اعمال شود؟"
          description="در صورت فعال بودن، هنگام تخلیه زودتر از موعد، بازپرداخت وجه بابت روزهای استفاده‌نشده بر اساس تنظیمات زیر محاسبه خواهد شد."
          valuePropName="hasEarlyCheckoutRules"
          defaultChecked={defaultHasEarlyCheckoutRules}
        />

        {hasEarlyCheckoutRules ? (
          <div className="flex flex-col gap-4">
            <AdmissionRadioCard
              form={form}
              name="earlyCheckoutMode"
              options={EARLY_CHECKOUT_MODE_OPTIONS}
            />

            <Row gutter={[16, 16]}>
              {earlyCheckoutMode === CHECKOUT_MODE.fixed ? (
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <CustomInputNumber
                    name="earlyCheckoutDefaultRefundPercent"
                    label="درصد پیش‌فرض بازپرداخت وجه"
                    rules={[REQUIRED_RULE]}
                    suffix="٪"
                    min={0}
                    max={100}
                  />
                </Col>
              ) : (
                <>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <CustomInputNumber
                      name="earlyCheckoutMinRefundPercent"
                      label="حداقل درصد بازپرداخت وجه"
                      rules={[REQUIRED_RULE]}
                      suffix="٪"
                      min={0}
                      max={100}
                    />
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <CustomInputNumber
                      name="earlyCheckoutMaxRefundPercent"
                      label="حداکثر درصد بازپرداخت وجه"
                      rules={[REQUIRED_RULE]}
                      suffix="٪"
                      min={0}
                      max={100}
                    />
                  </Col>
                </>
              )}
            </Row>
          </div>
        ) : null}
      </div>

      <hr className="border-neutral-4" />

      <div className="flex flex-col gap-4">
        <AdmissionSwitchAlert
          question="آیا جریمه‌ای برای تخلیه دیرهنگام اعمال شود؟"
          description="در صورت فعال بودن، به ازای هر روز تأخیر در تخلیه پس از پایان بازه اسکان، جریمه‌ای بر اساس درصدی از مبلغ اقامت روزانه محاسبه خواهد شد."
          valuePropName="hasLateCheckoutPenalty"
          defaultChecked={defaultHasLateCheckoutPenalty}
        />

        {hasLateCheckoutPenalty ? (
          <div className="flex flex-col gap-4">
            <AdmissionRadioCard
              form={form}
              name="lateCheckoutMode"
              options={LATE_CHECKOUT_MODE_OPTIONS}
            />

            <Row gutter={[16, 16]}>
              {lateCheckoutMode === CHECKOUT_MODE.fixed ? (
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <CustomInputNumber
                    name="lateCheckoutDefaultPenaltyPercent"
                    label="درصد جریمه روزانه تخلیه دیرهنگام (اسکان مازاد)"
                    rules={[REQUIRED_RULE]}
                    suffix="٪"
                    min={0}
                  />
                </Col>
              ) : (
                <>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <CustomInputNumber
                      name="lateCheckoutMinPenaltyPercent"
                      label="حداقل درصد جریمه روزانه تخلیه دیرهنگام (اسکان مازاد)"
                      rules={[REQUIRED_RULE]}
                      suffix="٪"
                      min={0}
                    />
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <CustomInputNumber
                      name="lateCheckoutMaxPenaltyPercent"
                      label="حداکثر درصد جریمه روزانه تخلیه دیرهنگام (اسکان مازاد)"
                      rules={[REQUIRED_RULE]}
                      suffix="٪"
                      min={0}
                    />
                  </Col>
                </>
              )}
            </Row>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AdmissionStepsFinancialCheckoutRules;
