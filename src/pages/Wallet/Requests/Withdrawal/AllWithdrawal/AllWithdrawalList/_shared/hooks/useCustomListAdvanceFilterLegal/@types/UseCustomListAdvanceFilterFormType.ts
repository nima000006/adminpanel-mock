import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type UseCustomListAdvanceFilterFormType = {
  businessId: SelectType<IdTitle>;
  branchId: SelectType<IdTitle>;
  saminService: SelectType<IdTitle>;
};
