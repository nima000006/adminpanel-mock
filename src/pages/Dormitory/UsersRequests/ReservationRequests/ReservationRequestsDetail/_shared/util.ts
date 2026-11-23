import { ReservationFactorCardStatus } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/components/ReservationFactorCard/@types/@reservationFactorCardTypes";

export const paymentTypeMap = {
  completePayment: {
    label: "پرداخت یکجا",
    color: "green",
  },
  partialPayment: {
    label: "پرداخت قسطی",
    color: "orange",
  },
};

export const reservationAcceptanceProgramMap = {
  term: {
    label: "ترمیک / دوره‌ای",
    color: "blue",
  },
  monthly: {
    label: "ماهانه",
    color: "geekblue",
  },
  daily: {
    label: "روزانه",
    color: "purple",
  },
};

export const RESERVATION_FACTOR_CARD_STATUS_CONFIG: Record<
  ReservationFactorCardStatus,
  { label: string; color: string }
> = {
  paid: { label: "پرداخت‌شده", color: "green" },
  pendingPayment: { label: "در‌انتظار پرداخت", color: "orange" },
  overdue: { label: "سر رسیدشده", color: "red" },
};

export const RESERVATION_USER_GROUP_TYPE = {
  student: { label: "دانشجو", color: "blue" },
  employee: { label: "کارمند", color: "orange" },
};

export const NATIONALITY = {
  iranianNationality: "iranianNationality",
  noneIranianNationality: "noneIranianNationality",
} as const;

export const NATIONALITY_OPTIONS = [
  { value: NATIONALITY.iranianNationality, label: "ایرانی" },
  { value: NATIONALITY.noneIranianNationality, label: "غیر ایرانی" },
];
