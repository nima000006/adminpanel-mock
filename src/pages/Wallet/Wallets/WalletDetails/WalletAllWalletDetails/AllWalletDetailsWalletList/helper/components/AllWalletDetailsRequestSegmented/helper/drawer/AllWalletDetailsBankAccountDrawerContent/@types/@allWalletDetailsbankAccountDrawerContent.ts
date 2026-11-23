//! LAYOUTs
export type AllWalletDetailsBankAccountDrawerContentProps = {
  closeDrawerHandler: () => void;
  accountId: number;
};

//! APIs
export type AllWalletDetailsGetBankAccountDetailResponse = {
  id: number;
  name: string;
  iban: string;
  status: string;
  description: null;
  cardNumber: string;
  isDefault: boolean;
  username: string;
  bankId: number;
  bankName: string;
  businessId: null;
  businessFaTitle: null;
  branchId: number;
  branchFaTitle: string;
  services: string[];
  modifierFirstname: string;
  modifierLastname: string;
  createdDate: string;
  modifiedDate: string;
};
