export type EvacuationBalanceStatus = "debtor" | "creditor" | "settled";

export type EvacuationLedgerVariant = "deposit" | "debtor" | "creditor" | "settled";

export type EvacuationLedgerLineSide = "debtor" | "creditor";

export type EvacuationLedgerLineItem = {
  id: string;
  title: string;
  side: EvacuationLedgerLineSide;
  /** مبلغ به ریال */
  amountRial: number;
};

export type EvacuationSettlementLedgerCardData = {
  variant: EvacuationLedgerVariant;
  title: string;
  amountRial?: number;
  items: EvacuationLedgerLineItem[];
  showViewAll?: boolean;
};

export type EvacuationSettlementResultSection = {
  label: string;
  value: string;
  description: string;
  extraValues?: string[];
};

export type EvacuationSettlementResultCardData = {
  userToResidence: EvacuationSettlementResultSection;
  residenceToUser: EvacuationSettlementResultSection;
  infoNote: string;
};

/** شکل تقریبی پاسخ API استپ ۲ */
export type EvacuationSettlementMock = {
  hasDeposit: boolean;
  balanceStatus: EvacuationBalanceStatus;
  depositLedger: EvacuationSettlementLedgerCardData | null;
  balanceLedger: EvacuationSettlementLedgerCardData;
  result: EvacuationSettlementResultCardData;
};
