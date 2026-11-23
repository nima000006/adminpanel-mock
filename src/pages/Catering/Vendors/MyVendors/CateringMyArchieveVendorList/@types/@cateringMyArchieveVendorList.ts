import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type CateringMyArchieveVendorListAdvanceFilterFormType = {
  province?: SelectType<IdTitle>[];
  city?: SelectType<IdTitle>[];
};
