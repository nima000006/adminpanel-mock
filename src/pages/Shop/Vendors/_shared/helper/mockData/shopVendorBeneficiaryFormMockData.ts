import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export const SHOP_VENDOR_BENEFICIARY_BUSINESS_OPTIONS: IdTitle[] = [
  { id: 1, title: "دانشگاه آزاد اسلامی" },
  { id: 2, title: "صمیم" },
];

export const SHOP_VENDOR_BENEFICIARY_BRANCH_OPTIONS_BY_BUSINESS: Record<
  number,
  IdTitle[]
> = {
  1: [
    { id: 1, title: "شعبه مرکزی" },
    { id: 2, title: "تهران جنوب" },
  ],
  2: [{ id: 1, title: "شعبه مرکزی" }],
};
