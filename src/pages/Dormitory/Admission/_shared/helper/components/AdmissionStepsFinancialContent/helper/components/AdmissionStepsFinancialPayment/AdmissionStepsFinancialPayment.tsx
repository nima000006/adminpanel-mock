import { Col, Form, Row } from "antd";

import {
  CustomButton,
  CustomInput,
  CustomInputNumber,
  CustomSingleCheckbox,
} from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import AdmissionRadioCard from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionRadioCard/AdmissionRadioCard";
import { AdmissionStepsFinancialPaymentProps } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsFinancialContent/helper/components/AdmissionStepsFinancialPayment/@types/@admissionStepsFinancialPayment";
import {
  PAYMENT_OPTION_OPTIONS,
  RESERVE_TYPE_OPTIONS,
  buildInstallments,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsFinancialContent/helper/util";
import AdmissionSwitchAlert from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionSwitchAlert/AdmissionSwitchAlert";

const AdmissionStepsFinancialPayment = ({
  form,
  isDaily,
  defaultHasPaymentDeadline,
  onCalculateWithDate,
}: AdmissionStepsFinancialPaymentProps) => {
  const reserveType = Form.useWatch("reserveType", form);
  const paymentOption = Form.useWatch("paymentOption", form);
  const hasPaymentDeadline = Form.useWatch("hasPaymentDeadline", form);
  const hasPrePayment = Form.useWatch("hasPrePayment", form);
  const installmentCount = Form.useWatch("installmentCount", form);

  const isRequestReserve = reserveType === "ReservationRequest"; // رزرو درخواستی
  const isUrgentReserve = reserveType === "UrgentReserve"; // رزرو فوری
  const isOncePayment = paymentOption === "OncePayment"; // پرداخت یکجا
  const isInstallmentPayment =
    paymentOption === "InstallmentPayment" || paymentOption === "AllPayment"; // پرداخت اقساطی / هر دو

  // فوری + اقساطی/هردو → همیشه پیش‌پرداخت (چک‌باکس غیرفعال و روشن)
  // درخواستی → کاربر می‌تواند پیش‌پرداخت را انتخاب کند
  const canTogglePrePayment = isRequestReserve;
  const effectiveHasPrePayment = isInstallmentPayment
    ? isUrgentReserve || !!hasPrePayment
    : false;
  const safeInstallmentCount = Math.max(1, Number(installmentCount) || 1);
  // سوییچ مهلت در یکجا: فقط رزرو درخواستی
  const showOncePaymentDeadlineSwitch = isOncePayment && isRequestReserve;
  // فیلد مهلت روز در یکجا: فقط رزرو درخواستی
  const showOncePaymentDeadlineDays = isOncePayment && isRequestReserve;
  // بالای hr اقساط: فقط درخواستی + (اقساطی/هردو) + دارای پیش‌پرداخت
  const showInstallmentPaymentDeadlineSwitch =
    isInstallmentPayment && isRequestReserve && !!hasPrePayment;
  // فیلد مهلت روز در اقساط: وقتی سوییچ مهلت نمایش و فعال باشد
  const showInstallmentDeadlineDays =
    showInstallmentPaymentDeadlineSwitch && !!hasPaymentDeadline;
  // ساختار ردیف‌ها از count/prePayment؛ useWatch("installments") بدون Form.List خالی می‌ماند
  const installmentRows = buildInstallments(safeInstallmentCount, effectiveHasPrePayment);

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <div className="flex flex-col gap-4">
        <CustomDivider text="نوع رزرو" />
        <AdmissionRadioCard
          form={form}
          name="reserveType"
          label="نوع رزرو"
          rules={[REQUIRED_RULE]}
          options={RESERVE_TYPE_OPTIONS}
        />
      </div>

      <div className="flex flex-col gap-4">
        <CustomDivider text="امکان پرداخت" />

        {isDaily ? ( // روزانه → اقساط غیرفعال
          <CustomAlert
            type="warning"
            showIcon
            className="border border-dashed! font-medium"
            title='در حالت برنامه پذیرش "روزانه" امکان اقساطی کردن پرداخت وجود ندارد.'
          />
        ) : null}

        <AdmissionRadioCard
          form={form}
          name="paymentOption"
          label="امکان پرداخت"
          rules={[REQUIRED_RULE]}
          options={PAYMENT_OPTION_OPTIONS.map((option) => ({
            ...option,
            disabled:
              isDaily &&
              (option.value === "InstallmentPayment" || option.value === "AllPayment"), // روزانه → فقط یکجا
          }))}
        />

        {isOncePayment ? ( // تنظیمات پرداخت یکجا
          <div className="flex flex-col gap-4">
            <CustomDivider text="تنظیمات" titleClassName="text-sm! font-normal!" />

            {showOncePaymentDeadlineSwitch ? (
              <AdmissionSwitchAlert
                question="آیا برای پرداخت هزینه رزرو، مهلت مشخصی در نظر گرفته شود؟"
                description="در صورت فعال بودن، مهلت پرداخت را مشخص کنید. اگر کاربر در این مهلت پیش‌پرداخت یا مبلغ یکجا را پرداخت نکند، درخواستش منقضی شده و ظرفیت رزرو‌شده دوباره در دسترس قرار می‌گیرد."
                valuePropName="hasPaymentDeadline"
                defaultChecked={defaultHasPaymentDeadline}
              />
            ) : null}

            <Row gutter={[16, 16]}>
              <Col xl={8} lg={8} md={12} sm={24} xs={24}>
                <CustomInputNumber
                  name="dailyLatePenaltyPercent"
                  label="جریمه دیرکرد روزانه"
                  tooltip="جریمه دیرکرد روزانه"
                  rules={[REQUIRED_RULE]}
                  suffix="٪"
                  min={0}
                  help="بین 0 تا X درصد"
                />
              </Col>

              {showOncePaymentDeadlineDays ? (
                <Col xl={8} lg={8} md={12} sm={24} xs={24}>
                  <CustomInputNumber
                    name="paymentDeadlineDays"
                    label="مهلت پرداخت (پس از تایید درخواست)"
                    tooltip="مهلت پرداخت (پس از تایید درخواست)"
                    rules={hasPaymentDeadline ? [REQUIRED_RULE] : undefined}
                    suffix="روز"
                    min={1}
                    disabled={!hasPaymentDeadline}
                    placeholder="بدون محدودیت"
                  />
                </Col>
              ) : null}
            </Row>
          </div>
        ) : null}

        {isInstallmentPayment ? ( // تنظیمات پرداخت اقساطی / هر دو
          <div className="flex flex-col gap-4">
            <CustomAlert
              type="warning"
              showIcon
              className="border border-dashed! font-medium"
              title="اقساط برای ودیعه محاسبه نمی‌گردد و مبلغ ودیعه بایستی به صورت کامل دریافت شود."
            />

            <CustomDivider
              text="تنظیمات"
              titleClassName="text-sm! font-normal!"
              extraContent={
                <CustomSingleCheckbox
                  name="hasPrePayment"
                  label="دارای پیش پرداخت"
                  valuePropName="checked"
                  disabled={!canTogglePrePayment}
                />
              }
            />

            {showInstallmentPaymentDeadlineSwitch ? (
              <AdmissionSwitchAlert
                question="آیا برای پرداخت هزینه رزرو، مهلت مشخصی در نظر گرفته شود؟"
                description="در صورت فعال بودن، مهلت پرداخت را مشخص کنید. اگر کاربر در این مهلت پیش‌پرداخت یا مبلغ یکجا را پرداخت نکند، درخواستش منقضی شده و ظرفیت رزرو‌شده دوباره در دسترس قرار می‌گیرد."
                valuePropName="hasPaymentDeadline"
                defaultChecked={defaultHasPaymentDeadline}
              />
            ) : null}

            <Row gutter={[16, 16]}>
              <Col xl={6} lg={6} md={12} sm={24} xs={24}>
                <CustomInputNumber
                  name="installmentCount"
                  label="تعداد اقساط"
                  rules={[REQUIRED_RULE]}
                  suffix="قسط"
                  min={1}
                />
              </Col>
              <Col xl={6} lg={6} md={12} sm={24} xs={24}>
                <CustomInputNumber
                  name="interestRatePercent"
                  label="نرخ سود از کل مبلغ"
                  tooltip="نرخ سود از کل مبلغ"
                  rules={[REQUIRED_RULE]}
                  suffix="٪"
                  min={0}
                />
              </Col>
              <Col xl={6} lg={6} md={12} sm={24} xs={24}>
                <CustomInputNumber
                  name="dailyLatePenaltyPercent"
                  label="جریمه دیرکرد روزانه"
                  tooltip="جریمه دیرکرد روزانه"
                  rules={[REQUIRED_RULE]}
                  suffix="٪"
                  min={0}
                  help="بین 0 تا X درصد"
                />
              </Col>
              {showInstallmentDeadlineDays ? (
                <Col xl={6} lg={6} md={12} sm={24} xs={24}>
                  <CustomInputNumber
                    name="paymentDeadlineDays"
                    label="مهلت پرداخت (پس از تایید درخواست)"
                    tooltip="مهلت پرداخت (پس از تایید درخواست)"
                    rules={[REQUIRED_RULE]}
                    suffix="روز"
                    min={1}
                  />
                </Col>
              ) : null}
            </Row>

            <hr className="border-neutral-4" />

            <div className="flex flex-col gap-4">
              {installmentRows.map((installment, index) => (
                <Row
                  key={`${installment.title}-${installment.isPrePayment}`}
                  gutter={[16, 16]}
                  align="top"
                >
                  <Col xl={8} lg={8} md={12} sm={24} xs={24}>
                    <CustomInput
                      name={["installments", index, "title"]}
                      label="شماره قسط"
                      disabled
                    />
                  </Col>

                  <Col xl={8} lg={8} md={12} sm={24} xs={24}>
                    <CustomInputNumber
                      name={["installments", index, "percent"]}
                      label="درصد از مبلغ کل"
                      rules={[REQUIRED_RULE]}
                      suffix="%"
                      min={0}
                      max={100}
                    />
                  </Col>

                  <Col xl={8} lg={8} md={12} sm={24} xs={24}>
                    {installment.isPrePayment ? null : ( // پیش‌پرداخت سررسید ندارد
                      <div className="flex flex-col gap-1">
                        <CustomInputNumber
                          name={["installments", index, "dueDays"]}
                          label="زمان سررسید ( پس از شروع بازه اسکان درخواستی)"
                          rules={[REQUIRED_RULE]}
                          suffix="روز"
                          min={1}
                        />
                        <CustomButton
                          type="link"
                          className="self-start px-0!"
                          onClick={() => onCalculateWithDate(index)}
                        >
                          محاسبه با تاریخ
                        </CustomButton>
                      </div>
                    )}
                  </Col>
                </Row>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default AdmissionStepsFinancialPayment;
