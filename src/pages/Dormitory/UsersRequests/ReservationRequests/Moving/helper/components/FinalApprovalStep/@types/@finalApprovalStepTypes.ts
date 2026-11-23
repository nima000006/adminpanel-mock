export type FinalApprovalResidenceInfo = {
  label: string;
  building: string;
  floor: string;
  unit: string;
  bed: string;
};

export type FinalApprovalPaymentBlock = {
  title: string;
  amounts: string[];
};

export type FinalApprovalAmountCard = {
  title: string;
  amountRial: number;
  variant: "creditor" | "debtor" | "deposit";
};

export type FinalApprovalColumn = {
  sectionTitle: string;
  residence: FinalApprovalResidenceInfo;
  isAlternative: boolean;
  payment: FinalApprovalPaymentBlock;
  amountCards: FinalApprovalAmountCard[];
};

export type FinalApprovalMock = {
  current: FinalApprovalColumn;
  alternative: FinalApprovalColumn;
};

export type FinalApprovalStepProps = {
  data: FinalApprovalMock;
};
