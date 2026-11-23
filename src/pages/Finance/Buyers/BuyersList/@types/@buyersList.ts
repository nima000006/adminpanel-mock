export type FilterModalProps = {
  isOpen: boolean;
  setOpen: (state: { isOpen: boolean; id: number }) => void;
};

type Option = {
  id: number;
  title: string;
  value: string;
};

export type SelectOptions = {
  customerType: Option[];
  location: Option[];
  levelOfEducation: Option[];
  fieldOfEducation: Option[];
  usedServices: Option[];
};

//! APIs
export type BuyersListDataTypes = {
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  paymentDate: string;
};

export type GetFinanceBuyersListResponse = {
  content: BuyersListDataTypes[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: [];
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: [];
  numberOfElements: number;
  empty: boolean;
};

export type GetFinanceBuyersListRequest = { pageNumber: number; pageSize: number };
