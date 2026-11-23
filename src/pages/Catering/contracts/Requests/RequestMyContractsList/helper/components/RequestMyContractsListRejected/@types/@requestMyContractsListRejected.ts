import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type RequestMyContractsListRejectedAdvanceFilterFormType = {
  vendorProvince: SelectType<IdTitle>[];
  vendorCity: SelectType<IdTitle>[];
  restaurantProvince: SelectType<IdTitle>[];
  restaurantCity: SelectType<IdTitle>[];
  branch: SelectType<IdTitle>[];
  self: SelectType<IdTitle>[];
  supplier: SelectType<IdTitle>[];
  requestType: SelectType<IdTitle>[];
  date: [string, string];
};
