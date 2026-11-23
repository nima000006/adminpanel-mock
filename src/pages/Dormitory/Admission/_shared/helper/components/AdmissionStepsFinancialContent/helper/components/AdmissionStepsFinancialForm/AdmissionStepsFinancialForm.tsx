import { useEffect, useMemo, useState } from "react";

import { Form } from "antd";

import {
  AdmissionStepsFinancialFormProps,
  AdmissionStepsFinancialFormType,
  AdmissionStepsFinancialInstallmentFormItem,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsFinancialContent/@types/@admissionStepsFinancialContent";
import AdmissionStepsFinancialCalculateWithDateModal from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsFinancialContent/helper/components/AdmissionStepsFinancialCalculateWithDateModal/AdmissionStepsFinancialCalculateWithDateModal";
import AdmissionStepsFinancialCancellationPolicy from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsFinancialContent/helper/components/AdmissionStepsFinancialCancellationPolicy/AdmissionStepsFinancialCancellationPolicy";
import AdmissionStepsFinancialCheckoutRules from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsFinancialContent/helper/components/AdmissionStepsFinancialCheckoutRules/AdmissionStepsFinancialCheckoutRules";
import AdmissionStepsFinancialPayment from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsFinancialContent/helper/components/AdmissionStepsFinancialPayment/AdmissionStepsFinancialPayment";
import {
  buildFinancialEmptyValues,
  buildInstallments,
  isDailySchedule,
  isMonthlySchedule,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsFinancialContent/helper/util";

const AdmissionStepsFinancialForm = ({
  scheduleType,
  stayDateRange = "",
  initialValues: initialValuesProp,
  formClassName = "flex flex-1 flex-col gap-10",
  onFinish,
  footer,
}: AdmissionStepsFinancialFormProps) => {
  const [form] = Form.useForm<AdmissionStepsFinancialFormType>();
  const [calculateWithDateOpen, setCalculateWithDateOpen] = useState(false);
  const [calculateWithDateIndex, setCalculateWithDateIndex] = useState<number | null>(
    null
  );

  const isDaily = isDailySchedule(scheduleType);
  const isMonthly = isMonthlySchedule(scheduleType);

  // ویرایش مقادیر ذخیره‌شده را می‌فرستد؛ ایجاد برنامه از فرم خالی شروع می‌شود
  const initialValues = useMemo(
    () => initialValuesProp ?? buildFinancialEmptyValues(isDaily),
    [initialValuesProp, isDaily]
  );

  const reserveType = Form.useWatch("reserveType", form);
  const paymentOption = Form.useWatch("paymentOption", form);
  const hasPaymentDeadline = Form.useWatch("hasPaymentDeadline", form);
  const hasPrePayment = Form.useWatch("hasPrePayment", form);
  const installmentCount = Form.useWatch("installmentCount", form);
  const installments = Form.useWatch("installments", form);

  const isUrgentReserve = reserveType === "UrgentReserve"; // رزرو فوری
  const isInstallmentPayment =
    paymentOption === "InstallmentPayment" || paymentOption === "AllPayment"; // پرداخت اقساطی / هر دو
  // فوری + اقساطی/هردو → پیش‌پرداخت اجباری؛ درخواستی → طبق انتخاب کاربر؛ یکجا → بدون پیش‌پرداخت
  const effectiveHasPrePayment = isInstallmentPayment
    ? isUrgentReserve || !!hasPrePayment
    : false;
  const safeInstallmentCount = Math.max(1, Number(installmentCount) || 1);
  const calculateWithDateInstallmentTitle =
    calculateWithDateIndex != null
      ? (installments?.[calculateWithDateIndex]?.title ?? "")
      : "";

  //* ================================ Util Functions ================================
  // ردیف‌های اقساط را بازسازی می‌کند و درصد/سررسید ردیف‌های قبلی را بر اساس ایندکس حفظ می‌کند
  const syncInstallments = (count?: number, prePayment?: boolean) => {
    const previous =
      (form.getFieldValue(
        "installments"
      ) as AdmissionStepsFinancialInstallmentFormItem[]) ?? [];

    form.setFieldValue(
      "installments",
      buildInstallments(count ?? 1, !!prePayment, previous)
    );
  };

  const calculateWithDateHandler = (installmentIndex: number) => {
    setCalculateWithDateIndex(installmentIndex);
    setCalculateWithDateOpen(true);
  };

  const closeCalculateWithDateHandler = () => {
    setCalculateWithDateOpen(false);
    setCalculateWithDateIndex(null);
  };

  const confirmCalculateWithDateHandler = (dueDays: number) => {
    if (calculateWithDateIndex == null) {
      return;
    }

    form.setFieldValue(["installments", calculateWithDateIndex, "dueDays"], dueDays);
    closeCalculateWithDateHandler();
  };

  //? ================================ Effects ================================
  useEffect(() => {
    // روزانه → فقط پرداخت یکجا
    if (isDaily && paymentOption !== "OncePayment") {
      form.setFieldValue("paymentOption", "OncePayment");
    }
  }, [form, isDaily, paymentOption]);

  useEffect(() => {
    // فوری + اقساطی/هردو → پیش‌پرداخت همیشه فعال
    if (isUrgentReserve && isInstallmentPayment && !hasPrePayment) {
      form.setFieldValue("hasPrePayment", true);
    }
  }, [form, isUrgentReserve, isInstallmentPayment, hasPrePayment]);

  useEffect(() => {
    // بدون مهلت → مقدار روز خالی تا placeholder «بدون محدودیت» دیده شود
    if (!hasPaymentDeadline) {
      form.setFieldValue("paymentDeadlineDays", undefined);
    }
  }, [form, hasPaymentDeadline]);

  useEffect(() => {
    // با تغییر تعداد اقساط یا وضعیت پیش‌پرداخت، ردیف‌های Form اقساط بازسازی می‌شوند
    if (!isInstallmentPayment) {
      return;
    }

    syncInstallments(safeInstallmentCount, effectiveHasPrePayment);
  }, [
    safeInstallmentCount,
    effectiveHasPrePayment,
    isInstallmentPayment,
    syncInstallments,
  ]);

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <Form
        form={form}
        className={formClassName}
        initialValues={initialValues}
        onFinish={onFinish}
      >
        <AdmissionStepsFinancialPayment
          form={form}
          isDaily={isDaily}
          defaultHasPaymentDeadline={!!initialValues.hasPaymentDeadline}
          onCalculateWithDate={calculateWithDateHandler}
        />

        <AdmissionStepsFinancialCancellationPolicy
          form={form}
          defaultHasCancellationPolicy={!!initialValues.hasCancellationPolicy}
        />

        <AdmissionStepsFinancialCheckoutRules
          form={form}
          defaultHasEarlyCheckoutRules={!!initialValues.hasEarlyCheckoutRules}
          defaultHasLateCheckoutPenalty={!!initialValues.hasLateCheckoutPenalty}
        />

        {footer}
      </Form>

      <AdmissionStepsFinancialCalculateWithDateModal
        open={calculateWithDateOpen}
        isMonthly={isMonthly}
        installmentTitle={calculateWithDateInstallmentTitle}
        stayDateRange={stayDateRange}
        onCancel={closeCalculateWithDateHandler}
        onConfirm={confirmCalculateWithDateHandler}
      />
    </>
  );
};

export default AdmissionStepsFinancialForm;
