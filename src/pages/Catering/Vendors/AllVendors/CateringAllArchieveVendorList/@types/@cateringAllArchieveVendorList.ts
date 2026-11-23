import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type CateringAllArchieveVendorListAdvanceFilterFormType = {
  province?: SelectType<IdTitle>[];
  city?: SelectType<IdTitle>[];
};
