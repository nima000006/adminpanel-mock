export type DormitorySettlementMethodProps = {
  createBodyParams: () => Record<number, string | number> | null | undefined;
  triggerItems: Record<string, string | string[]>;
  isFormValid: boolean;
  validateData: (data: unknown, reportTypeTitle: string) => boolean | null;
};

export type SettlementMethodItem = {
  id: number;
  amount: number;
  title: string;
};

export type ChartDataItem = {
  id: number;
  value: number;
  label: string;
};
