import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

//! LAYOUTs
export type MyWalletDetailsBankAccountDrawerContentProps = {
  closeDrawerHandler: () => void;
  accountId: number;
};

//! APIs
export type MyWalletDetailsGetBankAccountDetailResponse = {
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
  rejectReason: IdTitleName;
  rejectDescription: string;
};
