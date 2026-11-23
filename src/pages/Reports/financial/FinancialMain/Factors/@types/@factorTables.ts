//! LAYOUT
export type FactorUserType = {
  key: number;
  firstName: string;
  lastName: string;
  nationalCode: string;
  mobileNo: string;
  unitName: string;
  serviceName: string;
  factorNo: string;
  factorCreateDate: string;
  amount: number;
  universityPercentage: number;
  universityReceive: number;
  paymentStatus: number;
  referenceNo: string;
  documentNumber: null;
};

export type FactorTablesProp = {
  type: number;
};

export type FinancialAdvancedFilterParams = {
  pageNumber: number;
  pageSize: number;
  // Other parameters...
};
