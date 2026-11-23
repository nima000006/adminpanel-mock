import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

// Request type
export type AccountingAdvanceSearchRequest = {
  page?: number;
  size?: number;
  sort?: string[];
  isPaid?: boolean;
  samimService?: string;
  from?: number | string;
  to?: number | string;
  branchId?: number;
  businessId?: number;
  isParent?: boolean;
  documentType?: string;
};

// Response type
export type AccountingAdvanceSearchItem = {
  id: number;
  uuid: string;
  amount: number;
  paymentType: string;
  status: string;
  invoiceId: string;
  referenceNumber: string;
  trackNumber: string;
  paymentDate: string;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  personalCode: string;
  businessName: string;
  businessId: string;
  businessCode: string;
  businessBranchId: number;
  serviceName: string;
  samimService: string;
  provinceName: string;
  cityName: string;
  documentReason: IdTitleName;
};
export type AccountingAdvanceSearchResponse = {
  content: AccountingAdvanceSearchItem[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type ProductResponse = {
  id: number;
  productCode: string;
  productName: string;
  productDescription: string;
  productUnit: string;
  percentDiscount: number;
  fixDiscount: number;
  totalDiscount: number;
  itemTaxAndDuty: number;
  taxRate: number;
  dutyRate: number;
  quantity: number;
  price: number | null;
  itemTotalAmount: number;
};

export type GetInvoiceDetailsResponse = {
  status: number;
  msg: string;
  data: {
    totalRow: number;
    finalAmount: number;
    productResponses: ProductResponse[];
  };
};

export type UseCustomListAdvanceFilterFormTypes = {
  businessId: SelectType<IdTitle>;
  branchId: SelectType<IdTitle>;
  saminService: SelectType<IdTitle>;
};

export type AccountingDebtDocumentRequest = {
  settlementStatuses?: string;
  from?: string;
  to?: string;
  samimServices?: string;
  branchIds?: string;
  businessIds?: string;
  documentType?: string;
  cityIds?: string;
  provinceIds?: string;
  accountingInvoiceSettleStatus?: string;
  sortBy?: string;
  sortDirection?: string;
  documentReason?: string;
  id?: string;
  pageNumber: number;
  pageSize: number;
  documentReasons?: string[] | string;
};

export type AccountingDebtDocumentContent = {
  uuid: string;
  amount: number;
  paymentType: string;
  settlementAggregationStatus: IdTitleName;
  accountingInvoiceSettleStatus: IdTitleName;
  invoiceId: string;
  referenceNumber: string;
  trackNumber: string;
  paymentDate: string;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  personalCode: string;
  businessName: string;
  businessId: number;
  branchName: string;
  businessBranchId: number;
  samimService: IdTitleName;
  documentType: IdTitleName;
  provinceName: string;
  cityName: string;
  documentReason: IdTitleName;
  cityId: number;
  provinceId: number;
  createdDate: string;
  serviceName: string;
};

export type AccountingDebtDocumentResponse = {
  content: AccountingDebtDocumentContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type FactorsAndDocsDebtDocumentsFormType = {
  province: SelectType<IdTitleName>[];
  city: SelectType<IdTitleName>[];
  business: SelectType<IdTitleName>[];
  branch: SelectType<IdTitleName>[];
  possibilitySettlement: IdTitle[];
  status: SelectType<IdTitleName>[];
  debtReason: IdTitle[];
  services: SelectType<IdTitleName>[];
};
