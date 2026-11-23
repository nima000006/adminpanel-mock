import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";

import { serviceOptions } from "../Accountants/_shared/utils";

export const rangePresets: RangePickerProps["presets"] = [
  {
    label: "امروز",
    value: () => [dayjs().startOf("day"), dayjs()],
  },
  {
    label: "دیروز",
    value: () => [
      dayjs().subtract(1, "day").startOf("day"),
      dayjs().subtract(1, "day").endOf("day"),
    ],
  },
  {
    label: "هفته گذشته",
    value: () => [dayjs().subtract(7, "day").startOf("day"), dayjs()],
  },
  {
    label: "ماه گذشته",
    value: () => [
      dayjs().subtract(1, "month").startOf("month"),
      dayjs().subtract(1, "month").endOf("month"),
    ],
  },
  {
    label: "سال گذشته",
    value: () => [
      dayjs().subtract(1, "year").startOf("year"),
      dayjs().subtract(1, "year").endOf("year"),
    ],
  },
  {
    label: "از ابتدای سال",
    value: () => [dayjs().startOf("year"), dayjs()],
  },
  {
    label: "از ابتدا تا کنون",
    value: () => [dayjs(0), dayjs()],
  },
];

export const samimServiceNameConvertor = (service: string | undefined) => {
  if (service) {
    const matched = serviceOptions.find(
      (opt) => opt?.value?.toLocaleLowerCase() === service?.toLowerCase()
    );

    return matched?.title;
  } else {
    return "-";
  }
};

export const FINANCE_ACCOUNTING_BENEFICIARY_STATUS = {
  DOCUMENTED: "DOCUMENTED",
  SETTLED: "SETTLED",
};

export const FINANCE_ACCOUNTING_BENEFICIARY_COLOR = {
  [FINANCE_ACCOUNTING_BENEFICIARY_STATUS.DOCUMENTED]: "warning",
  [FINANCE_ACCOUNTING_BENEFICIARY_STATUS.SETTLED]: "success",
};

export const FINANCE_ACCOUNTING_BENEFICIARY_TEXT = {
  [FINANCE_ACCOUNTING_BENEFICIARY_STATUS.DOCUMENTED]: "در انتظار عملیات حسابداری",
  [FINANCE_ACCOUNTING_BENEFICIARY_STATUS.SETTLED]: "تسویه شده",
};

export const FINANCE_ACCOUNTING_FACTOR_STATUS = {
  SALE_CANCELLED: "SALE_CANCELLED",
  MAIN_SALE: "MAIN_SALE",
  RETURN_FROM_SALE: "RETURN_FROM_SALE",
};

export const FINANCE_ACCOUNTING_FACTOR_STATUS_TEXT = {
  [FINANCE_ACCOUNTING_FACTOR_STATUS.SALE_CANCELLED]: "اصلی فروش ابطال شده",
  [FINANCE_ACCOUNTING_FACTOR_STATUS.MAIN_SALE]: "اصلی فروش",
  [FINANCE_ACCOUNTING_FACTOR_STATUS.RETURN_FROM_SALE]: "برگشت از فروش",
};

export const FINANCE_ACCOUNTING_FACTOR_STATUS_COLOR = {
  [FINANCE_ACCOUNTING_FACTOR_STATUS.SALE_CANCELLED]: "error",
  [FINANCE_ACCOUNTING_FACTOR_STATUS.MAIN_SALE]: "processing",
  [FINANCE_ACCOUNTING_FACTOR_STATUS.RETURN_FROM_SALE]: "warning",
};
//factor status configs
export enum InvoiceStatus {
  NEW = 0,
  REFUNDED = 1,
  CANCELLED = 3,
}

// Mapping from string status to enum value
export const InvoiceStatusStringToEnum: Record<string, InvoiceStatus> = {
  NEW: InvoiceStatus.NEW,
  REFUNDED: InvoiceStatus.REFUNDED,
  CANCELLED: InvoiceStatus.CANCELLED,
};

export const InvoiceStatusColorConfig: Record<number, { color: string; text: string }> = {
  [InvoiceStatus.NEW]: {
    color: "blue",
    text: "اصلی فروش",
  },
  [InvoiceStatus.REFUNDED]: {
    color: "red",
    text: "برگشت از فروش ابطال شده",
  },
  [InvoiceStatus.CANCELLED]: {
    color: "warning",
    text: "برگشت از فروش",
  },
};

//payment type configs
export enum PaymentType {
  LUMP_SUM = 0,
  INSTALLMENT = 1,
}

// Mapping from string status to enum value
export const PaymentTypeStringToEnum: Record<string, PaymentType> = {
  LUMP_SUM: PaymentType.LUMP_SUM,
  INSTALLMENT: PaymentType.INSTALLMENT,
  "lump.sum": PaymentType.LUMP_SUM,
  installment: PaymentType.INSTALLMENT,
};

export const PaymentTypeTextConfig: Record<PaymentType, string> = {
  [PaymentType.LUMP_SUM]: "یکجا",
  [PaymentType.INSTALLMENT]: "قسطی",
};

// payment supplier status
export enum PaymentSupplierStatus {
  PAID = 0,
  PENDING_FOR_PAYMENT = 1,
}

export const PaymentSupplierStatusToEnum: Record<string, PaymentSupplierStatus> = {
  PAID: PaymentSupplierStatus.PAID,
  PENDING_FOR_PAYMENT: PaymentSupplierStatus.PENDING_FOR_PAYMENT,
};

export const PaymentSupplierStatusColorConfig = {
  [PaymentSupplierStatus.PAID]: {
    color: "green",
    text: "پرداخت شده",
  },
  [PaymentSupplierStatus.PENDING_FOR_PAYMENT]: {
    color: "warning",
    text: "در صف پرداخت",
  },
};

export const calculateTotalPercentage = (amount?: number, total?: number): number => {
  if (!amount || !total || total === 0) {
    return 0;
  }
  // 0.00478582363
  return parseFloat(((amount / total) * 100).toFixed(2));
};

export const NatureAccounting: Record<string, { title: string; color: string }> = {
  CREDIT: { title: "بستانکاری", color: "green" },
  DEBIT: { title: "بدهکاری", color: "volcano" },
};
