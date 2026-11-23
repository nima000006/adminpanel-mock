import { PiCoins, PiCardholder, PiArrowUpRight, PiBriefcaseBold } from "react-icons/pi";

export const TYPE_TURN_OVER = {
  SALE_OF_SERVICES: {
    id: 1,
    title: "فروش خدمات",
    icon: PiCoins,
    color: "default",
  },
  SETTLEMENT: {
    id: 2,
    title: "تسویه",
    icon: PiCardholder,
    color: "default",
  },
  REFUND: {
    id: 3,
    title: "عودت وجه",
    icon: PiArrowUpRight,
    color: "default",
  },
  COMMISSION: {
    id: 4,
    title: "کارمزد شرکت",
    icon: PiBriefcaseBold,
    color: "default",
  },
} as const;

export const getFinancialTurnoverType = (type?: keyof typeof TYPE_TURN_OVER) => {
  return type ? TYPE_TURN_OVER[type] : undefined;
};

export const ACCOUNTING = {
  IN_DEBT: { id: 1, title: "بدهکاری", color: "red" },
  CREDITOR: { id: 2, title: "بستانکاری", color: "green" },
};

export const getAccountingType = (type?: keyof typeof ACCOUNTING) => {
  return type ? ACCOUNTING[type] : undefined;
};
