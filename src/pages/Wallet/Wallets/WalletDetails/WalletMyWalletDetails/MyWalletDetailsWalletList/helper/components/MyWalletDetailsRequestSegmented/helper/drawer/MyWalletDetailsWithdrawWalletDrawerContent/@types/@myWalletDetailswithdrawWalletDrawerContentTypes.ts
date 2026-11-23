export type MyWalletDetailsWithdrawWalletDrawerContentProps = {
  closeDrawerHandler: () => void;
  id: number | undefined;
};

//! APIs
export type MyWalletDetailsGetWalletWithdrawalDetailResponse = {
  id: number;
  requestAmount: number;
  currentBalance: number;
  status: string;
  statusMessage: null;
  description: string;
  requestDate: string;
  approvalDate: null;
  paymentDate: null;
  adminFirstname: string;
  adminLastname: string;
  username: string;
  createdDate: string;
  studyFieldTitle: string;
  degreeTitle: string;
  requesterFirstName: string;
  requesterLastName: string;
  requesterMobile: string;
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
    // service names should be removed as it does not exist
    // serviceNames: string[];
    serviceName: string;
  };
};
