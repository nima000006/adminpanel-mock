import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type CateringAllFoodArchieveListAdvanceFilterFormType = {
  baseProduct?: SelectType<IdTitle>[];
  contract?: SelectType<IdTitle>[];
  restaurant?: SelectType<IdTitle>[];
  vendor?: SelectType<IdTitle>[];
};
