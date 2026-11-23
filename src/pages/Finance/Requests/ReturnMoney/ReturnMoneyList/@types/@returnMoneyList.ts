//! APIs
//count
export type GetRefundRequestCountResponse = {
  requested: null | number;
  approved: null | number;
  rejected: null | number;
  completed: null | number;
};

//list
export type GetRefundRequestListRequest = {
  pageNumber: string;
  pageSize: string;
};

export type GetRefundRequestListResponse = any;

// advance filter
export type RefundRequestListAndAdvanceFilterRequest = {
  pageNumber?: number;
  pageSize?: number;
  from?: string;
  to?: string;
  samimService?: string;
  branchId?: number;
  username?: string;
  status?: string;
};

export type RefundRequestListAndAdvanceFilterContent = {
  id: number;
  enTitle: string;
  enDescription: string;
  faTitle: string;
  faDescription: string;
  arTitle: string;
  arDescription: string;
  createdDate: string;
  modifiedDate: string;
  createdByUserStaff: string;
  modifiedByUserStaff: string;
  recordStatus: string;
  currentTRefundRequestHash: string;
  uuid: string;
  amount: {
    amount: number;
    currency: string;
    moneyType: string;
  };
  invoiceUuid: string;
  username: string;
  status: string;
  refundType: string;
  transaction: {
    id: number;
    enTitle: string;
    enDescription: string;
    faTitle: string;
    faDescription: string;
    arTitle: string;
    arDescription: string;
    createdDate: string;
    modifiedDate: string;
    createdByUserStaff: string;
    modifiedByUserStaff: string;
    recordStatus: string;
    money: {
      amount: number;
      currency: string;
      moneyType: string;
    };
    firstName: string;
    lastName: string;
    userName: string;
    userStaffId: number;
    phone: string;
    userStaffType: string;
    businessName: string; // در حال حاضر کلید را نداریم قرار شد این کلید اضافه شود
    modifiedByFirstName: string; // در حال حاضر کلید را نداریم قرار شد این کلید اضافه شود
    modifiedByLastName: string; // در حال حاضر کلید را نداریم قرار شد این کلید اضافه شود
    tenantId: string;
    branchCode: number;
    branchName: string;
    transactionUUIDWallet: string;
    paidInvoiceId: string;
    paymentPlanId: number;
    paymentGatewayInvoiceId: string;
    paymentDate: string;
    status: string;
    samimService: string;
    paymentType: string;
    paymentWay: string;
    sagaId: number;
    sagaEventType: string;
    personalCode: string;
    referenceNumber: string;
    trackNumber: string;
    refunded: boolean;
  };
  walletTransactionUuid: string;
  isFullRefund: boolean;
  rejectReason: string;
  sagaId: number;
  sagaEventType: string;
  dataTampered: boolean;
  secret_KEY: string;
};

export type RefundRequestListAndAdvanceFilterResponse = {
  totalPages: number;
  totalElements: number;
  pageable: {
    paged: boolean;
    pageNumber: number;
    offset: number;
    sort: [
      {
        direction: string;
        nullHandling: string;
        ascending: boolean;
        property: string;
        ignoreCase: boolean;
      },
    ];
    pageSize: number;
    unpaged: boolean;
  };
  first: boolean;
  last: boolean;
  size: number;
  content: RefundRequestListAndAdvanceFilterContent[];
  number: number;
  sort: [
    {
      direction: string;
      nullHandling: string;
      ascending: boolean;
      property: string;
      ignoreCase: boolean;
    },
  ];
  numberOfElements: number;
  empty: boolean;
};
