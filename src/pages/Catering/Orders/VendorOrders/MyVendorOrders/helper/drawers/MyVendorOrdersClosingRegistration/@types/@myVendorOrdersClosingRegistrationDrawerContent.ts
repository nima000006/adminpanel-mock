import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type MyVendorOrdersClosingRegistrationDrawerContentProps = {
  onCloseDrawer: () => void;
  onSuccess: () => void;
};

export type MyVendorOrdersClosingRegistrationFormType = {
  unit: SelectType<IdTitle>;
  closingDate: string;
  reason: SelectType<IdTitle>;
  self: SelectType<IdTitle> | null;
  meal: SelectType<IdTitle> | null;
  foods: SelectType<IdTitle>[] | null;
};
