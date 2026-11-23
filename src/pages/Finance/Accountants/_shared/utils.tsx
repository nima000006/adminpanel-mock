//! IMPORTANT COMMENT

import { IconType } from "react-icons";
import { LuDna } from "react-icons/lu";
import {
  PiArrowLineUpRight,
  PiBriefcase,
  PiBuildingApartmentFill,
  PiCoins,
  PiForkKnifeFill,
  PiHeartbeat,
  PiHourglassSimpleMedium,
  PiIdentificationCardLight,
  PiProhibit,
  PiReceiptLight,
  PiUmbrellaFill,
} from "react-icons/pi";

import AuthIcon from "../../../../../public/images/auth.svg";
import ShopIcon from "../../../../../public/images/bookMarketPlace.svg";
import CommitteeIcon from "../../../../../public/images/committee.svg";
import InternationalIcon from "../../../../../public/images/International.svg";
import JobIcon from "../../../../../public/images/job.svg";
import SurveyIcon from "../../../../../public/images/survey.svg";
import TicketIcon from "../../../../../public/images/ticket.svg";
import WalletIcon from "../../../../../public/images/wallet.svg";

/* Do not change the id and order of items
 use the order in AllWalletsListBusinessAndBranchesTab components*/

export const MY_DOCTOR_SERVICE_ID = 10;
export const DORM_SERVICE_ID = 3;
export const FOOD_SERVICE_ID = 4;

export const serviceOptions = [
  {
    id: 1,
    title: "مشاور",
    value: "CONSULTANT",
    name: "CONSULTANT",
    color: "red",
    icon: PiHeartbeat,
    bgGradient: "bg-consultant-gradient",
  },
  {
    id: 2,
    title: "اطلاع رسانی و استعلام هویتی",
    value: "STUDENT_CARD",
    name: "STUDENT_CARD",
    color: "blue",
    icon: PiIdentificationCardLight,
    bgGradient: "bg-student-card-gradient",
  },
  {
    id: 3,
    title: "خوابگاه",
    value: "ROOM",
    name: "ROOM",
    color: "purple",
    icon: PiBuildingApartmentFill,
    bgGradient: "bg-dormitory-gradient",
  },
  {
    id: 4,
    title: "تغذيه",
    color: "lime",
    value: "FOOD",
    name: "FOOD",
    icon: PiForkKnifeFill,
    bgGradient: "bg-food-gradient",
  },
  {
    id: 5,
    title: "بيمه",
    value: "INSURANCE",
    name: "INSURANCE",
    color: "green",
    icon: PiUmbrellaFill,
    bgGradient: "bg-insurance-gradient",
  },
  // {
  //   id: 6,
  //   title: "پشتيباني",
  //   value: "SUPPORT",
  //   name: "SUPPORT",
  //   color: "",
  //   icon: "",
  //   bgGradient: "bg-support-gradient",
  // },
  {
    id: 6,
    title: "کميته انضباطی",
    value: "MORAL_COMMITTEE",
    name: "MORAL_COMMITTEE",
    color: "#E98B45",
    icon: CommitteeIcon,
    isSvg: true,
    bgGradient: "bg-moral-gradient",
  },
  {
    id: 7,
    title: "دانشجويار",
    value: "DANESHJOUYAR",
    name: "DANESHJOUYAR",
    color: "",
    icon: "",
    bgGradient: "bg-daneshjouyar-gradient",
  },
  {
    id: 8,
    title: "کاريابي",
    value: "JOB",
    name: "JOB",
    color: "blue",
    icon: JobIcon,
    isSvg: true,
    bgGradient: "bg-job-gradient",
  },
  {
    id: 9,
    title: "کیف پول",
    value: "WALLET",
    name: "WALLET",
    color: "orange",
    icon: WalletIcon,
    isSvg: true,
    bgGradient: "bg-wallet-gradient",
  },
  // {
  //   id: MY_DOCTOR_SERVICE_ID,
  //   title: "دکتر من",
  //   value: "MY_DOCTOR",
  //   name: "MY_DOCTOR",
  //   color: "cyan",
  //   icon: PiHeartbeat,
  //   bgGradient: "bg-doctor-gradient",
  // },
  {
    id: 10,
    title: "پرسشنامه",
    value: "SURVEY",
    name: "SURVEY",
    color: "cyan",
    icon: SurveyIcon,
    isSvg: true,
    bgGradient: "bg-survey-gradient",
  },
  {
    id: 11,
    title: "تیکت",
    value: "TICKET",
    name: "TICKET",
    color: "blue",
    icon: TicketIcon,
    isSvg: true,
    bgGradient: "bg-ticket-gradient",
  },
  {
    id: 12,
    title: "مالی",
    value: "ACCOUNTING",
    name: "ACCOUNTING",
    color: "blue",
    icon: WalletIcon,
    isSvg: true,
    bgGradient: "bg-accounting-gradient",
  },
  {
    id: 13,
    title: "بیزنس",
    value: "BUSINESS",
    name: "BUSINESS",
    color: "",
    icon: "",
    bgGradient: "",
  },
  {
    id: 14,
    title: "اطلاعات پایه",
    value: "BASIC_INFORMATION",
    name: "BASIC_INFORMATION",
    color: "",
    icon: "",
    isSvg: "",
    bgGradient: "",
  },
  {
    id: 15,
    title: "احراز هویت",
    value: "AUTHENTICATION",
    name: "AUTHENTICATION",
    color: "blue",
    icon: AuthIcon,
    isSvg: true,
    bgGradient: "bg-auth-gradient",
  },
  {
    id: 16,
    title: "بین الملل",
    value: "FOREIGN_STUDENT",
    name: "FOREIGN_STUDENT",
    color: "#FFD591",
    icon: InternationalIcon,
    isSvg: true,
    bgGradient: "",
  },
  {
    id: 17,
    title: "مدیریت پیکربندی",
    value: "APP_VERSION",
    name: "APP_VERSION",
    color: "",
    icon: "",
    bgGradient: "",
  },
  {
    id: 18,
    title: "فاکتور",
    value: "INVOICE",
    name: "INVOICE",
    color: "",
    icon: "",
    bgGradient: "",
  },
  {
    id: 19,
    title: "ژنتیک",
    value: "GENETIC",
    name: "GENETIC",
    icon: LuDna,
    bgGradient: "bg-genetic-gradient",
    color: "teal",
  },
  {
    id: 20,
    title: "فروشگاه کتاب",
    value: "BOOK_MARKET_PLACE",
    name: "BOOK_MARKET_PLACE",
    color: "volcano",
    icon: ShopIcon,
    isSvg: true,
    bgGradient: "bg-shop-gradient",
  },
];
export const statusOptions = [
  { id: 1, title: "در انتظار پرداخت", value: "TO_BE_SETTLED" },
  { id: 2, title: "پرداخت شده", value: "SETTLED" },
];

export const statusEnumConfig = {
  settled: "SETTLED", //  تسویه شده
  toBeSettled: "TO_BE_SETTLED", // قابل تسویه
  documented: "DOCUMENTED", // در انتظار عملیات
};

export const paymentStatusOptions = [
  { id: 1, title: "پرداخت شده" },
  { id: 2, title: " در انتظار پرداخت" },
];

export const settlementAggregationStatusMap: Record<
  string,
  { text: string; color: string; icon?: React.ReactNode }
> = {
  NOT_PAYABLE: {
    text: "غیر قابل پرداخت",
    color: "default",
  },
  PAYABLE: {
    text: "قابل پرداخت",
    color: "geekblue",
  },
  PENDING_FOR_PAYMENT: {
    text: "در صف پرداخت",
    color: "gold",
  },
  PAID: {
    text: "پرداخت شده",
    color: "green",
  },
  DEFAULT: {
    text: "نامشخص",
    color: "default",
  },
};

export const accountingInvoiceSettleStatusMap = {
  SETTLED: {
    text: "قابل تسویه",
    color: "gold",
    icon: <PiHourglassSimpleMedium />,
  },
  UN_SETTLED: {
    text: "غیر قابل تسویه",
    color: "red",
    icon: <PiProhibit color="red" />,
  },
  DEFAULT: {
    text: "نامشخص",
    color: "default",
    icon: undefined,
  },
} as const;

export const serviceConfig: Record<
  string,
  { color: string; icon: React.ReactNode | null }
> = {
  ROOM: {
    color: "purple",
    icon: (
      <div className="icon-wrapper dorm-color">
        <PiBuildingApartmentFill color="#FFFFFF" size={14} />
      </div>
    ),
  },
  MY_DOCTOR: {
    color: "cyan",
    icon: (
      <div className="icon-wrapper my-doctor-color">
        <PiHeartbeat color="#FFFFFF" size={14} />
      </div>
    ),
  },
  INSURANCE: {
    color: "green",
    icon: (
      <div className="icon-wrapper insurance-color">
        <PiUmbrellaFill color="#FFFFFF" size={14} />
      </div>
    ),
  },
  FOOD: {
    color: "lime",
    icon: (
      <div className="icon-wrapper food-color">
        <PiForkKnifeFill color="#FFFFFF" size={14} />
      </div>
    ),
  },
  STUDENT_CARD: {
    color: "blue",
    icon: (
      <div className="icon-wrapper card-color">
        <PiIdentificationCardLight color="#FFFFFF" size={14} />
      </div>
    ),
  },
};

export const reasonDebtConfig = {
  refund: 1, // عودت وجه
  paymentOnAccount: 2, // پرداخت علی‌الحساب
};
export const statusConfig = {
  settled: "SETTLED", //  تسویه شده
  documented: "DOCUMENTED", // قابل تسویه
};

export const statusDocumentsConfig = {
  awaiting: 1, //در انتظار عملیات حسابداری
  walletQueue: 2, //صف انتقال به کیف پول
  settled: 3, //  تسویه شده
  sendAccounting: 4, // ارسال شده به حسابداری ذینفع
};
export const documentTypeConfig = {
  credit: "CREDIT",
  debit: "DEBIT",
};
export const personalityTypeConfig = {
  natural: "NATURAL",
  legal: "LEGAL",
};
export const factorTypeConfig = {
  saleCancelled: 1,
  mainSale: 2,
  returnFromSale: 3,
};
export const documentTypeOptions = [
  { id: 1, title: "بستانکار", value: "CREDIT" },
  { id: 2, title: "بدهکار", value: "DEBIT" },
];
export const isPaidOptions = [
  { id: 1, title: "پرداخت شده", value: true },
  { id: 2, title: "پرداخت نشده", value: false },
];

export const documentReasonNameConfig = {
  advancePayment: "ADVANCE_PAYMENT",
  refund: "REFUND",
  invoicePayment: "INVOICE_PAYMENT",
  reversal: "REVERSAL",
  adjustment: "ADJUSTMENT",
  manualEntry: "MANUAL_ENTRY",
};

export const documentReasonConfig: Record<string, { title: string; color: string }> = {
  ADVANCE_PAYMENT: { title: "علی‌الحساب", color: "gold" },
  REFUND: { title: "عودت وجه", color: "volcano" },
  INVOICE_PAYMENT: { title: "پرداخت فاکتور", color: "default" },
  REVERSAL: { title: "سند برگشتی", color: "default" },
  ADJUSTMENT: { title: "اصلاح حساب", color: "default" },
  MANUAL_ENTRY: { title: "ثبت دستی", color: "default" },
};

export const beneficiary_payment_status_debit_credit = [
  {
    id: 2,
    name: "PENDING_FOR_PAYMENT",
    title: "در صف پرداخت",
  },
  {
    id: 3,
    name: "PAID",
    title: "پرداخت‌شده",
  },
];

export const accountingDebitReasonStatusMap = {
  PARTNERSHIP_COMMISSION: {
    text: "کارمزد شراکت",
    color: "blue",
    icon: <PiReceiptLight />,
  },
  REFUND: {
    text: "عودت وجه",
    color: "volcano",
    icon: <PiArrowLineUpRight color="red" />,
  },
  DEFAULT: {
    text: "نامشخص",
    color: "default",
    icon: undefined,
  },
} as const;
export const myAccountingDocumentReasonConfig: Record<
  string,
  { title: string; name: string; icon: IconType }
> = {
  REFUND: { title: "عودت وجه", name: "REFUND", icon: PiArrowLineUpRight },
  PARTNERSHIP_COMMISSION: {
    title: "کارمزد شراکت",
    name: "PARTNERSHIP_COMMISSION",
    icon: PiBriefcase,
  },
  SALES_INVOICE: { title: "فروش خدمات", name: "SALES_INVOICE", icon: PiCoins },
  PAYMENT_VOUCHER: { title: "تسویه", name: "PAYMENT_VOUCHER", icon: PiBriefcase },
};
