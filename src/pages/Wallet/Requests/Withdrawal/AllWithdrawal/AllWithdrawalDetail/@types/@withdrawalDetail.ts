type UserStaffDetail = {
  branchCode: number;
  businessName: string;
  serviceNames: string[];
  firstname: string;
  LastName: string;
  mobile: string;
  branchName: string;
  modifiedDate: string;
  city: string;
  province: string;
  code: string;
  bankAccount: {
    iban: string;
    cardNumber: string;
    isDefault: boolean;
    bankName: string;
    accountNumber: number;
  };
};
export type WithdrawalDetailResponse = {
  id: number;
  requestAmount: number;
  currentBalance: number;
  status: "REQUESTED" | "ACCEPTED" | "REJECTED" | string;
  statusMessage: string;
  description: string;
  requestDate: string;
  approvalDate: string;
  paymentDate: string;
  requesterMobile: string;
  adminFirstname: string;
  adminLastname: string;
  requesterFirstName: string;
  requesterLastName: string;
  username: string;
  createdDate: string;
  studyFieldTitle: string;
  degreeTitle: string;
  branchName: string;
  facultyName: string;
  userStaffDetail: UserStaffDetail;
  modifiedDate: string;
  walletId: number;
  title: string | null; // عنوان تایید
  fileUrl: string | null; // فایل تایید
};
