import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type CateringMyVendorListCreateAndEditDrawerContentFormType = {
  title: string;
  nationalNom: string;
  economicNom: string;
  iban: string;
  managerFirstName?: string;
  managerLastName?: string;
  managerUserName?: string;
  managerMobile?: string;
  branches: SelectType<IdTitle>[];
  description?: string;
  province: SelectType<IdTitle>;
  city: SelectType<IdTitle>;
  postalCode: string;
  phone1: string;
  phone2?: string;
  address: string;
};

export type CateringMyVendorListCreateAndEditDrawerContentProps = {
  onCloseDrawer: () => void;
  onSuccess: () => void;
  mode?: "create" | "edit";
  vendorId?: number | null;
};
