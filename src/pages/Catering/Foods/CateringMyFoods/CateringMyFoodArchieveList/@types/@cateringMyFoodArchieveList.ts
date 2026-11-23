import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type CateringMyFoodArchieveListAdvanceFilterFormType = {
  baseProduct?: SelectType<IdTitle>[];
  contract?: SelectType<IdTitle>[];
  restaurant?: SelectType<IdTitle>[];
  vendor?: SelectType<IdTitle>[];
};
