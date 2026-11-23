export type GetMyBranchAccountingDetailSystemDocRequest = {
  settlementId: string;
  params: {
    pageNumber: number;
    pageSize: number;
  };
};
export type GetMyBranchAccountingDetailSystemDocContent = {
  id: number;
  createdTime: string;
  amount: number;
  walletTransactionUuid: string;
  isPaid: boolean;
};
export type GetMyBranchAccountingDetailSystemDocResponse = {
  totalPages: number;
  totalElements: number;
  pageable: {
    paged: boolean;
    pageNumber: number;
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
  first: boolean;
  last: boolean;
  size: number;
  content: GetMyBranchAccountingDetailSystemDocContent[];
  number: number;
  sort: {
    direction: string;
    nullHandling: string;
    ascending: boolean;
    property: string;
    ignoreCase: boolean;
  }[];
  numberOfElements: number;
  empty: boolean;
};
