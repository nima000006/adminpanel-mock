import dayjs, { Dayjs } from "dayjs";
import moment from "jalali-moment";

import { farsiNumberToEnglish } from "@infra/helpers/utils";
import {
  AdmissionStepsFinancialFormType,
  AdmissionStepsFinancialInstallmentFormItem,
  CHECKOUT_MODE,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsFinancialContent/@types/@admissionStepsFinancialContent";
import { AdmissionStepsSchedulingFormType } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSchedulingContent/@types/@admissionStepsSchedulingContent";
import { getEffectiveScheduleType } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSchedulingContent/helper/util";
import { ADMISSION_DETAIL_MOCK_DATA } from "@pages/Dormitory/Admission/_shared/helper/mock/admissionDetailMockData";
import { SCHEDULE_TYPE } from "@pages/Dormitory/Admission/_shared/util";

export const financialContentData = ADMISSION_DETAIL_MOCK_DATA;

export const isDailySchedule = (
  scheduleType?: (typeof SCHEDULE_TYPE)[keyof typeof SCHEDULE_TYPE]
) =>
  scheduleType === SCHEDULE_TYPE.dailyFree || scheduleType === SCHEDULE_TYPE.dailyPackage;

export const isMonthlySchedule = (
  scheduleType?: (typeof SCHEDULE_TYPE)[keyof typeof SCHEDULE_TYPE]
) => scheduleType === SCHEDULE_TYPE.monthly;

export const resolveFinancialScheduleContext = (
  scheduling?: AdmissionStepsSchedulingFormType | null
) => ({
  scheduleType: scheduling ? getEffectiveScheduleType(scheduling) : undefined,
  stayDateRange: formatStayDateRangeLabel(scheduling?.stayDateRange),
});

const formatJalaliDateLabel = (value: unknown) => {
  if (value == null || value === "") {
    return "";
  }

  if (dayjs.isDayjs(value)) {
    return moment(value.toDate()).locale("fa").format("YYYY/MM/DD");
  }

  if (value instanceof Date) {
    return moment(value).locale("fa").format("YYYY/MM/DD");
  }

  return String(value);
};

// بازه اقامت مرحله زمان‌بندی (dayjs/Date) را به برچسب شمسی «YYYY/MM/DD — YYYY/MM/DD» تبدیل می‌کند؛
// این برچسب بعداً توسط parseStayDateRangeMoments دوباره به تاریخ تبدیل می‌شود، پس قالب آن باید ثابت بماند
export const formatStayDateRangeLabel = (
  stayDateRange?: AdmissionStepsSchedulingFormType["stayDateRange"]
) => {
  if (!stayDateRange?.length) {
    return "";
  }

  const [from, to] = stayDateRange;
  const fromLabel = formatJalaliDateLabel(from);
  const toLabel = formatJalaliDateLabel(to);

  if (!fromLabel || !toLabel) {
    return "";
  }

  return `${fromLabel} — ${toLabel}`;
};

// جداکننده برچسب ممکن است em dash (—)، en dash (–) یا خط تیره (-) باشد؛ همه با فاصله‌های اطرافشان حذف می‌شوند
export const parseStayDateRangeLabels = (stayDateRange: string) => {
  const [fromLabel = "", toLabel = ""] = stayDateRange
    .split(/\s*[—–-]\s*/)
    .map((part) => part.trim());

  return { fromLabel, toLabel };
};

// برچسب‌ها شمسی و ممکن است با ارقام فارسی باشند؛ ابتدا ارقام انگلیسی و سپس با تقویم fa خوانده می‌شوند
export const parseStayDateRangeMoments = (stayDateRange: string) => {
  const { fromLabel, toLabel } = parseStayDateRangeLabels(stayDateRange);
  const fromMoment = moment.from(farsiNumberToEnglish(fromLabel), "fa", "YYYY/MM/DD");
  const toMoment = moment.from(farsiNumberToEnglish(toLabel), "fa", "YYYY/MM/DD");

  return {
    fromMoment: fromMoment.isValid() ? fromMoment.startOf("day") : null,
    toMoment: toMoment.isValid() ? toMoment.startOf("day") : null,
  };
};

export const getStayRangeAlertTitle = (stayDateRange: string) => {
  const { fromLabel, toLabel } = parseStayDateRangeLabels(stayDateRange);
  return `بازه مجاز اسکان از تاریخ “${fromLabel}” تا تاریخ “${toLabel}”`;
};

export const isDateOutsideStayRange = (current: Dayjs, stayDateRange: string) => {
  const { fromMoment, toMoment } = parseStayDateRangeMoments(stayDateRange);

  if (!fromMoment || !toMoment) {
    return false;
  }

  const currentDay = dayjs(current.toDate()).startOf("day");
  const fromDay = dayjs(fromMoment.toDate()).startOf("day");
  const toDay = dayjs(toMoment.toDate()).startOf("day");

  return currentDay.isBefore(fromDay, "day") || currentDay.isAfter(toDay, "day");
};

export const calculateDueDaysFromStayStart = (
  dueDateValue: string | undefined,
  stayDateRange: string
) => {
  if (!dueDateValue) {
    return undefined;
  }

  const { fromMoment } = parseStayDateRangeMoments(stayDateRange);
  const dueMoment = moment(dueDateValue);

  if (!fromMoment || !dueMoment.isValid()) {
    return undefined;
  }

  return dueMoment.startOf("day").diff(fromMoment, "days");
};

export const RESERVE_TYPE_OPTIONS: {
  value: "ReservationRequest" | "UrgentReserve";
  title: string;
  description: string;
}[] = [
  {
    value: "ReservationRequest",
    title: "رزرو درخواستی",
    description:
      "کاربران تنها می‌توانند اقامتگاه موردنظر خود را انتخاب کنند و تخصیص ظرفیت پس از بررسی درخواست، توسط مدیران اقامتگاه در پنل مدیریت دانشجویار انجام خواهد شد.",
  },
  {
    value: "UrgentReserve",
    title: "رزرو فوری (بدون نیاز به تایید)",
    description:
      "کاربران می‌توانند پس از انتخاب ظرفیت مد نظر خود بدون نیاز به تأیید درخواست، رزرو خود را نهایی کنند. رزرو تنها پس از پرداخت موفق هزینه قطعی خواهد شد.",
  },
];

export const PAYMENT_OPTION_OPTIONS: {
  value: "OncePayment" | "InstallmentPayment" | "AllPayment";
  title: string;
}[] = [
  {
    value: "OncePayment",
    title: "یکجا",
  },
  {
    value: "InstallmentPayment",
    title: "اقساطی",
  },
  {
    value: "AllPayment",
    title: "هر دو (یکجا و اقساطی)",
  },
];

export const EARLY_CHECKOUT_MODE_OPTIONS = [
  {
    value: CHECKOUT_MODE.fixed,
    title: "درصد ثابت پیش‌فرض",
    description: "یک درصد ثابت برای بازپرداخت وجه روزهای استفاده‌نشده تعیین می‌شود.",
  },
  {
    value: CHECKOUT_MODE.range,
    title: "بازه درصد بازپرداخت",
    description:
      "حداقل و حداکثر درصد بازپرداخت تعیین می‌شود و مسئول تخلیه می‌تواند در این بازه مقدار را انتخاب کند.",
  },
];

export const LATE_CHECKOUT_MODE_OPTIONS = [
  {
    value: CHECKOUT_MODE.fixed,
    title: "درصد ثابت پیش‌فرض",
    description:
      "یک درصد ثابت از مبلغ اسکان روزانه به‌عنوان جریمه تأخیر در نظر گرفته می‌شود.",
  },
  {
    value: CHECKOUT_MODE.range,
    title: "بازه درصد جریمه",
    description:
      "حداقل و حداکثر درصد جریمه تعیین می‌شود و مسئول تخلیه می‌تواند در این بازه مقدار را انتخاب کند.",
  },
];

export const buildInstallments = (
  count: number,
  hasPrePayment: boolean,
  previous: AdmissionStepsFinancialInstallmentFormItem[] = []
): AdmissionStepsFinancialInstallmentFormItem[] => {
  const safeCount = Math.max(1, count || 1);
  // تعداد اقساط + یک ردیف پیش‌پرداخت (در صورت فعال بودن)
  const totalRows = hasPrePayment ? safeCount + 1 : safeCount;

  return Array.from({ length: totalRows }, (_, index) => {
    const isPrePayment = hasPrePayment && index === 0;
    const previousItem = previous[index];
    const installmentNumber = hasPrePayment ? index : index + 1;

    return {
      title: isPrePayment ? "پیش پرداخت" : `قسط ${installmentNumber}`,
      isPrePayment,
      percent: previousItem?.percent,
      dueDays: isPrePayment ? null : (previousItem?.dueDays ?? undefined),
    };
  });
};

const toOptionalNumber = (value?: string | null) => (value ? Number(value) : undefined);

// مقادیر شروع فرم مالی در ایجاد برنامه: همه سوییچ‌ها خاموش و روزانه فقط پرداخت یکجا
export const buildFinancialEmptyValues = (
  isDaily: boolean
): Partial<AdmissionStepsFinancialFormType> => ({
  paymentOption: isDaily ? "OncePayment" : undefined,
  hasPaymentDeadline: false,
  hasPrePayment: false,
  hasCancellationPolicy: false,
  hasEarlyCheckoutRules: false,
  earlyCheckoutMode: CHECKOUT_MODE.fixed,
  hasLateCheckoutPenalty: false,
  lateCheckoutMode: CHECKOUT_MODE.fixed,
});

export const buildFinancialInitialValues = (
  data: typeof financialContentData,
  isDaily: boolean
): AdmissionStepsFinancialFormType => {
  const hasPrePayment =
    data.reserveType === "UrgentReserve" ||
    data.installments.some((item) => item.isPrePayment);
  const installmentCount = data.installmentCount
    ? Number(data.installmentCount)
    : data.installments.length;

  return {
    reserveType: data.reserveType,
    paymentOption: isDaily ? "OncePayment" : data.paymentOption,
    hasPaymentDeadline: data.hasPaymentDeadline,
    paymentDeadlineDays:
      data.hasPaymentDeadline && data.paymentDeadlineDays
        ? Number(data.paymentDeadlineDays)
        : undefined,
    dailyLatePenaltyPercent: toOptionalNumber(data.dailyLatePenaltyPercent) ?? 0,
    hasPrePayment,
    installmentCount,
    interestRatePercent: toOptionalNumber(data.interestRatePercent) ?? 0,
    installments: buildInstallments(
      installmentCount,
      hasPrePayment,
      data.installments.map((item) => ({
        title: item.title,
        isPrePayment: item.isPrePayment,
        percent: toOptionalNumber(item.percent),
        dueDays: item.dueDays ? Number(item.dueDays) : null,
      }))
    ),
    hasCancellationPolicy: data.hasCancellationPolicy,
    cancellationRules: data.cancellationRules.map((rule) => ({
      remainingDays: toOptionalNumber(rule.remainingDays),
      refundPercent: toOptionalNumber(rule.refundPercent),
    })),
    hasEarlyCheckoutRules: data.hasEarlyCheckoutRules,
    earlyCheckoutMode: data.earlyCheckoutDefaultRefundPercent
      ? CHECKOUT_MODE.fixed
      : CHECKOUT_MODE.range,
    earlyCheckoutDefaultRefundPercent: toOptionalNumber(
      data.earlyCheckoutDefaultRefundPercent
    ),
    earlyCheckoutMinRefundPercent: toOptionalNumber(data.earlyCheckoutMinRefundPercent),
    earlyCheckoutMaxRefundPercent: toOptionalNumber(data.earlyCheckoutMaxRefundPercent),
    hasLateCheckoutPenalty: data.hasLateCheckoutPenalty,
    lateCheckoutMode: data.lateCheckoutDefaultPenaltyPercent
      ? CHECKOUT_MODE.fixed
      : CHECKOUT_MODE.range,
    lateCheckoutDefaultPenaltyPercent: toOptionalNumber(
      data.lateCheckoutDefaultPenaltyPercent
    ),
    lateCheckoutMinPenaltyPercent: toOptionalNumber(data.lateCheckoutMinPenaltyPercent),
    lateCheckoutMaxPenaltyPercent: toOptionalNumber(data.lateCheckoutMaxPenaltyPercent),
  };
};
