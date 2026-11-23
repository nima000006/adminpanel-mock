import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type ShopAllVendorsListAddDrawerContentProps = {
  onCloseDrawer: () => void;
  getAllVendorsListHandler: () => void;
};

export type ShopAllVendorsListAddDrawerBasicInfoFormType = {
  vendorName: string;
  business: SelectType<IdTitle>;
  branch: SelectType<IdTitle>;
  tehranShippingCost?: number | null;
  tehranMinShippingDays?: number | null;
  tehranMaxShippingDays?: number | null;
  otherCitiesShippingCost?: number | null;
  otherCitiesMinShippingDays?: number | null;
  otherCitiesMaxShippingDays?: number | null;
};

export type ShopAllVendorsListAddDrawerContractFormType = {
  contractDateRange: [string, string | null];
  templateId: string;
  serviceIds: string[];
  category?: {
    value?: string | number;
    label?: string;
    item?: {
      id?: string | number;
      title?: string;
    };
  };
};

//! APIs
export type CreateVendorBasicInfoStepRequest = {
  tehranEnabled: boolean;
  tehranCost: number;
  tehranMinDeliveryDays: number;
  tehranMaxDeliveryDays: number;
  otherCitiesEnabled: boolean;
  otherCitiesCost: number;
  otherCitiesMinDeliveryDays: number;
  otherCitiesMaxDeliveryDays: number;
  faTitle: string;
  businessId: number;
  branchId: number;
};

export type CreateVendorBasicInfoStepResponse = {
  uuid: string;
  title: string;
  businessId: number;
  branchId: number;
  contractStartDate: string;
  contractEndDate: string;
  contractTemplate: {
    id: number;
    name: string;
    title: string;
  };
  ruleBeneficiaryId: number;
};
