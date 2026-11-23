export type FinanceBusinessOwnerDetailsMockDataType = {
  id: number;
  province?: string;
  city?: string;
  business?: string;
  branch?: string;
  grossInCome: number;
  sharePartnersAmount: number;
  turnOverAmount: number;
  netIncome: number;
};

export type FinanceBusinessOwnerDetailsTabKey =
  | "province"
  | "city"
  | "business"
  | "branch";
