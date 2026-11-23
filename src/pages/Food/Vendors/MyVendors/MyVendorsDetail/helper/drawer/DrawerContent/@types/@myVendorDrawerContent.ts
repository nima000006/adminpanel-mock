import { FoodUploadFileResponse } from "@pages/Food/Vendors/AllVendors/AllVendorList/helper/drawer/AllVendorListDrawerContent/@types/@allVendorListDrawerContent";

import { VendorByIdType } from "../../../components/MyVendorDetailTabContent/@types/@myVendorDetailTabContent";

export type CustomSelectType = {
  key: string;
  value: string;
  title: string;
  name: string;
  code: number;
  item: {
    id: number;
    title: string;
  };
};
export type CustomSelectTypeCity = {
  key?: string;
  value?: string;
  title?: string;
  name?: string;
  code?: number;
  item?: {
    id?: number;
    title?: string;
  };
};
export type FormData = {
  title: string;
  vendorTitle: string;
  legalCode: string;
  economicCode: string;
  number: string;
  adminName: string;
  adminFamily: string;
  adminPersonalityCode: string;
  adminPhoneNumber: string;
  vendorDescription: string;
  province: CustomSelectType;
  city: CustomSelectType;
  postalCode: string;
  firstPhoneNumber: string;
  secondPhoneNumber: string;
  address: string;
  interfaceName: string;
  interfaceLastName: string;
  nationalCode: number;
  phoneNumber: string;
  desc: string;
  phonOne: string;
  phoneTwo: string;
};
export type MyVendorDetailDrawerContentProps = {
  detailFirstTabData: VendorByIdType | undefined;
  isDrawerOpen: boolean;
  closeDrawerHandler: () => void;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getDataHandler: () => void;
};

export type onUploadFileSuccess = {
  imageSetter: React.Dispatch<React.SetStateAction<string>>;
  response: FoodUploadFileResponse;
};

export type FormDataTypes = {
  title: string;
  vendorTitle: string;
  legalCode: string;
  economicCode: string;
  number: string;
  adminName: string;
  adminFamily: string;
  adminPersonalityCode: string;
  adminPhoneNumber: string;
  vendorDescription: string;
  province: CustomSelectType;
  city: CustomSelectType;
  postalCode: string;
  firstPhoneNumber: string;
  secondPhoneNumber: string;
  address: string;
  interfaceLastName: string;
  interfaceName: string;
  phoneNumber: string;
  nationalCode: string;
  universityUnit: CustomSelectType[];
  desc: string;
  phonOne: string;
  phoneTwo: string;
  activeMode: boolean;
};
