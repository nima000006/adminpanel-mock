//! LAYOUT
export type SelectItemType = {
  label: string;
  title: string;
  value: string;
  key: number;
  item: {
    title: string;
    id: number;
  };
  code: number;
};

export type TempDataType = {
  serviceTypeId: number;
  serviceTypeTitle: string;
  cost: number;
  tax: number | undefined;
  duty: number | undefined;
  discount: number | null;
  unit: SelectItemType | undefined;
};

//! APIs
type IdTitleType = { title: string; id: number };

export type GetInternationalAllCurrenciesResponse = IdTitleType[];

export type GetInternationalAllServiceTypesResponse = IdTitleType[];

export type GetInternationalAllPrServiceResponse = {
  prServiceId: number;
  prServiceTitle: string;
}[];

export type CreateInternationalAdmissionFeesInformationRequest = {
  ruleId: number;
  currencyId: number;
  serviceRequests: {
    dutyRate: number;
    financialRuleId: number;
    fixedDiscount: number;
    measureUnit: string;
    percentDiscount: number;
    serviceId: number;
    taxRate: number;
    unitPrice: number;
  }[];
};
