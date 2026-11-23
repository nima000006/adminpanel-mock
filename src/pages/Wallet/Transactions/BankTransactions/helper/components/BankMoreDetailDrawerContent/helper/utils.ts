export const statusOption = [
  { id: 1, title: "مغایرت بانکی", name: "VERIFIED", color: "volcano" },
  { id: 2, title: "ناموفق (بازگشت به حساب)", name: "REVERTED", color: "red" },
  { id: 3, title: "موفق", name: "COMPLETED", color: "green" },
  { id: 4, title: "ناموفق (پرداخت ناموفق)", name: "REQUESTED", color: "red" },
  {
    id: 5,
    title: "موفق (خرید ناموفق ، عدم شروع فرایند)",
    name: "AVAILABLE_IN_WALLET",
    color: "green",
  },
  {
    id: 6,
    title: "موفق (خرید ناموفق ، بازگشت به کیف پول)",
    name: "REVERT_TO_WALLET",
    color: "green",
  },
];

export const staffTypeOptions = [
  { id: 1, title: "دانشجو", name: "STUDENT" },
  { id: 2, title: "کارمند", name: "EMPLOYEE" },
  { id: 4, title: "پیشفرض", name: "DEFAULT" },
];

export const staffTypeConfig = {
  STUDENT: {
    label: "دانشجو",
    color: "blue",
  },
  EMPLOYEE: {
    label: "کارمند",
    color: "volcano",
  },
  DEFAULT: {
    label: "نامشخص",
    color: "default",
  },
};

export const gateWayPaymentOptions = [
  { id: 1, title: "بانک ملی", name: "MELLI" },
  { id: 2, title: "بانک پاسارگاد", name: "PASARGAD" },
];
