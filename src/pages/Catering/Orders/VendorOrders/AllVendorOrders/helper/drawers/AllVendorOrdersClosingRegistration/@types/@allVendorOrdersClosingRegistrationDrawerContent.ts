import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type AllVendorOrdersClosingRegistrationDrawerContentProps = {
  onCloseDrawer: () => void;
  onSuccess: () => void;
};

export type AllVendorOrdersClosingRegistrationFormType = {
  unit: SelectType<IdTitle>;
  closingDate: string;
  reason: SelectType<IdTitle>;
  self: SelectType<IdTitle> | null;
  meal: SelectType<IdTitle> | null;
  foods: SelectType<IdTitle>[] | null;
};
