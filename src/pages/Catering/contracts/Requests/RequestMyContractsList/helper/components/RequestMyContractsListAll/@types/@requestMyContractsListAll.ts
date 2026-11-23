import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type RequestMyContractsListAllAdvanceFilterFormType = {
  vendorProvince: SelectType<IdTitle>[];
  vendorCity: SelectType<IdTitle>[];
  restaurantProvince: SelectType<IdTitle>[];
  restaurantCity: SelectType<IdTitle>[];
  branch: SelectType<IdTitle>[];
  self: SelectType<IdTitle>[];
  supplier: SelectType<IdTitle>[];
  requestType: SelectType<IdTitle>[];
  requestStatus: SelectType<IdTitle>[];
  date: [string, string];
};
