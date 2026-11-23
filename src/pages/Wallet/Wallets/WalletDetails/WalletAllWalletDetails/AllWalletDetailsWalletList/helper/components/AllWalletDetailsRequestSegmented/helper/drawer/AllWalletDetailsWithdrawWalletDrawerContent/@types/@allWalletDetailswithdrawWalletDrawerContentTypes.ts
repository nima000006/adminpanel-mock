export type AllWalletDetailsWithdrawWalletDrawerContentProps = {
  closeDrawerHandler: () => void;
  id: number | undefined;
};

//! APIs
export type AllWalletDetailsGetWalletWithdrawalDetailResponse = {
  id: number;
  requestAmount: number;
  currentBalance: number;
  status: string;
  statusMessage: null;
  description: string;
  requestDate: string;
  approvalDate: null;
  paymentDate: null;
  requesterMobile: string;
  adminFirstname: string;
  adminLastname: string;
  username: string;
  createdDate: string;
  studyFieldTitle: string;
  degreeTitle: string;
  branchName: string;
  facultyName: string;
  userStaffDetail: {
    branchCode: number;
    businessName: string;
    city: string;
    province: string;
    firstname: string;
    LastName: string;
    mobile: string;
    branchName: string;
    code: null;
    modifiedDate: string;
    bankAccount: {
      iban: string;
      cardNumber: string;
      isDefault: boolean;
      bankName: string;
      accountNumber: string;
    };
    serviceName: string;
  };
};
