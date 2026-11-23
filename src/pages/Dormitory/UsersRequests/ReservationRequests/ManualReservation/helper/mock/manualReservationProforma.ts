import { ProformaInvoiceData } from "../components/ProformaInvoiceStep/@types/@proformaInvoiceStep";

export const MANUAL_RESERVATION_PAYMENT_METHOD = {
  full: "full",
  installments: "installments",
} as const;

export const MANUAL_RESERVATION_MOCK_PROFORMA: ProformaInvoiceData = {
  user: {
    firstName: "سینا",
    lastName: "سوجه",
    userGroup: "دانشجو",
    nationalCode: "000554548451",
    unit: "تهران شمال",
    phoneNumber: "09124487968",
    degree: "کارشناسی ارشد",
    major: "مدیریت بازرگانی",
  },
  stay: {
    residence: "شهید چمران",
    building: "نور ۱",
    floor: "همکف،لابی",
    unit: "۰۰۱،نور۵،اتاق مستقل",
    bed: "۰۰۲،کویین",
    bedDetails: "۲طبقه تخت بالا",
    admissionProgramTitle: "کارشناسی ارشد ورودی ۱۴۰۵",
    admissionProgramTag: "ترمیک / دوره‌ای",
    stayRangeLabel: "از ۰۵ مهر ۱۴۰۵ تا ۰۵ خرداد ۱۴۰۵",
  },
  payableAmount: 1500000,
  depositAmount: 11500000,
  installments: [
    {
      id: "prepayment",
      label: "پیش پرداخت",
      dueDate: "1403/02/02",
      amount: 10050000,
    },
    {
      id: "installment-1",
      label: "قسط اول",
      dueDate: "1403/02/02",
      amount: 10050000,
    },
    {
      id: "installment-2",
      label: "قسط دوم",
      dueDate: "1403/02/02",
      amount: 10050000,
    },
    {
      id: "installment-3",
      label: "قسط سوم",
      dueDate: "1403/02/02",
      amount: 10050000,
    },
    {
      id: "installment-4",
      label: "قسط چهارم",
      dueDate: "1403/02/02",
      amount: 10050000,
    },
  ],
};
