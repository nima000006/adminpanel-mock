type SelectTypes = {
  label: string;
  value: string;
  key: number;
  code: number;
  children: string;
  item: {
    id: number;
    title: string;
  };
};

export type reasonRejectModalFormType = {
  reasonReject: SelectTypes;
};

// APIS
export type GetBankAccountDetailResponse = {
  id: number;
  name: string;
  iban: string;
  status: string;
  description: string;
  cardNumber: string;
  isDefault: boolean;
  username: string;
  bankId: number;
  bankName: string;
  businessId: number;
  businessFaTitle: string;
  branchId: number;
  branchFaTitle: string;
  services: [string];
  modifierFirstname: string;
  modifierLastname: string;
  createdDate: string;
  modifiedDate: string;
  rejectReason: {
    id: number;
    name: string;
    title: string;
  };
  rejectDescription: string;
  bankAccountNumber: string;
  cityName: string;
  provinceName: string;
  createdByFirstname: string;
  createdByLastname: string;
  mobileNumber: string;
};

export type SendSingleConfirmAndRejectRequest = {
  id: number;
  status: string;
  reason?: string;
};
