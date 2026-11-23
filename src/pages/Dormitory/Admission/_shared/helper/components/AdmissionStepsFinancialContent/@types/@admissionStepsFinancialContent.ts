import { ReactNode } from "react";

import {
  AdmissionPaymentOption,
  AdmissionReserveType,
  ScheduleType,
} from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";
import { AdmissionStepsSchedulingFormType } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSchedulingContent/@types/@admissionStepsSchedulingContent";

export const CHECKOUT_MODE = {
  fixed: "fixed",
  range: "range",
} as const;

export type CheckoutMode = (typeof CHECKOUT_MODE)[keyof typeof CHECKOUT_MODE];

export type AdmissionStepsFinancialInstallmentFormItem = {
  title: string;
  isPrePayment: boolean;
  percent?: number;
  dueDays?: number | null;
};

export type AdmissionStepsFinancialCancellationRuleFormItem = {
  remainingDays?: number;
  refundPercent?: number;
};

export type AdmissionStepsFinancialFormType = {
  reserveType: AdmissionReserveType;
  paymentOption: AdmissionPaymentOption;
  hasPaymentDeadline?: boolean;
  paymentDeadlineDays?: number;
  dailyLatePenaltyPercent?: number;
  hasPrePayment?: boolean;
  installmentCount?: number;
  interestRatePercent?: number;
  installments?: AdmissionStepsFinancialInstallmentFormItem[];
  hasCancellationPolicy?: boolean;
  cancellationRules?: AdmissionStepsFinancialCancellationRuleFormItem[];
  hasEarlyCheckoutRules?: boolean;
  earlyCheckoutMode?: CheckoutMode;
  earlyCheckoutDefaultRefundPercent?: number;
  earlyCheckoutMinRefundPercent?: number;
  earlyCheckoutMaxRefundPercent?: number;
  hasLateCheckoutPenalty?: boolean;
  lateCheckoutMode?: CheckoutMode;
  lateCheckoutDefaultPenaltyPercent?: number;
  lateCheckoutMinPenaltyPercent?: number;
  lateCheckoutMaxPenaltyPercent?: number;
};

export type AdmissionStepsFinancialContentProps = {
  scheduling?: AdmissionStepsSchedulingFormType | null;
  onBack: () => void;
  onSaveDraft: () => void;
  onSubmitAndContinue: (values: AdmissionStepsFinancialFormType) => void;
};

export type AdmissionStepsFinancialFormProps = {
  scheduleType?: ScheduleType;
  stayDateRange?: string;
  initialValues?: Partial<AdmissionStepsFinancialFormType>;
  formClassName?: string;
  onFinish: (values: AdmissionStepsFinancialFormType) => void;
  footer: ReactNode;
};
