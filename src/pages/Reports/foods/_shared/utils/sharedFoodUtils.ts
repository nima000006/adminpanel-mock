import { nonNullValues } from "@infra/helpers/utils";

export const foodRequestType = [
  { id: 0, title: "یارانه‌ای" },
  { id: 1, title: "اضافی" },
  { id: 2, title: "روز فروش" },
];

export const foodStatusType = [
  { id: 1, title: "فعال" },
  { id: 2, title: "غیر فعال" },
];

export const foodNotFoundContent = "در حال دریافت اطلاعات...";

export const PLEASE_SELECT_A_SELF_FIRST = "لطفا اول یک سلف انتخاب کنید";
export const PLEASE_SELECT_A_CONTRACT_FIRST = "لطفا اول یک قرارداد انتخاب کنید";

export const MAX_FOOD_PRICE = 999999999;

export const valueCounter = (params: object) => {
  return nonNullValues(params).length;
};
