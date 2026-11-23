import dayjs from "dayjs";

import { GetAccountingOperationPayableListItems } from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/@types/@accountingOperationPayable";

export type getSettlementBeneficiariesDetailRequest = {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: string;
  toDate?: string | number | Date | dayjs.Dayjs | null;
  samimService?: string;
  branchId: number;
};

export type getSettlementBeneficiariesDetailContent = {
  createdAt: string;
  documentCount: number;
  payableAmount: number;
  uuid: string;
};
export type getSettlementBeneficiariesDetailResponse = {
  totalElements: number;
  totalPages: number;
  pageable: {
    pageNumber: number;
    paged: boolean;
    offset: number;
    sort: {
      direction: string;
      nullHandling: string;
      ascending: boolean;
      property: string;
      ignoreCase: boolean;
    }[];
    unpaged: boolean;
    pageSize: number;
  };
  last: boolean;
  size: number;
  content: getSettlementBeneficiariesDetailContent[];
  number: number;
  sort: {
    direction: string;
    nullHandling: string;
    ascending: boolean;
    property: string;
    ignoreCase: boolean;
  }[];
  first: boolean;
  numberOfElements: number;
  empty: boolean;
};
export type AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContentProps = {
  onClose: () => void;
  record: GetAccountingOperationPayableListItems;
  date?: string | number | Date | dayjs.Dayjs | null | undefined;
  openDocumentDrawer?: (uuid: string) => void;
};
