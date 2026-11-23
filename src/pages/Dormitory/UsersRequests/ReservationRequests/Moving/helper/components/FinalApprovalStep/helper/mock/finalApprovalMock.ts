import { FinalApprovalMock } from "@pages/Dormitory/UsersRequests/ReservationRequests/Moving/helper/components/FinalApprovalStep/@types/@finalApprovalStepTypes";

/** ماک ساده استپ تایید نهایی جابه‌جایی */
export const FINAL_APPROVAL_MOCK: FinalApprovalMock = {
  current: {
    sectionTitle: "نتیجه صورت حساب اقامت فعلی :",
    isAlternative: false,
    residence: {
      label: "اقامت فعلی",
      building: "شهید بهشتی",
      floor: "طبقه ۵",
      unit: "VIP ۰۰۲ اتاق مستقل",
      bed: "۰۰۲ اتاق مستقل",
    },
    payment: {
      title: "پرداختی اقامتگاه به کاربر:",
      amounts: ["۱۵ میلیون تومان", "۹ میلیون تومان"],
    },
    amountCards: [
      {
        title: "بستانکاری کاربر",
        amountRial: 90000000,
        variant: "creditor",
      },
      {
        title: "ودیعه پرداخت شده کاربر",
        amountRial: 150000000,
        variant: "deposit",
      },
    ],
  },
  alternative: {
    sectionTitle: "نتیجه صورت حساب اقامت جایگزین :",
    isAlternative: true,
    residence: {
      label: "اقامت جایگزین",
      building: "شهید بهشتی",
      floor: "طبقه ۵",
      unit: "VIP ۰۰۲ اتاق مستقل",
      bed: "۰۰۲ اتاق مستقل",
    },
    payment: {
      title: "پرداختی کاربر به اقامتگاه:",
      amounts: ["۱۰ میلیون تومان", "۴۰ میلیون تومان"],
    },
    amountCards: [
      {
        title: "بدهکاری کاربر بابت هزینه های اقامتی",
        amountRial: 100000000,
        variant: "debtor",
      },
      {
        title: "ودیعه اقامت جدید",
        amountRial: 150000000,
        variant: "deposit",
      },
    ],
  },
};
