export const INSURED_STATUS = {
  pendingPayment: "3", // در انتظار پرداخت
  issuing: "4", // در حال صدور
  issued: "5", // صادر شده
  expired: "6", // منقضی شده
  cancelled: "7", // ابطال شده
  suspended: "8", // تعلیق شده
};

export const PAYMENT_TYPE = {
  cash: 0, //نقدی
  installments: 1, // اقساطی
};
